import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { checkbox } from '@inquirer/prompts';
import { PROMPTER_DIR, SUPPORTED_TOOLS, PrompterConfig } from '../core/config.js';
import { projectTemplate, agentsTemplate } from '../core/templates/index.js';
import { registry } from '../core/configurators/slash/index.js';

interface InitOptions {
    tools?: string[];
    noInteractive?: boolean;
}

export class InitCommand {
    async execute(options: InitOptions = {}): Promise<void> {
        const projectPath = process.cwd();

        console.log(chalk.blue('\n🚀 Initializing Prompter...\n'));

        // Check if already initialized
        if (await PrompterConfig.prompterDirExists(projectPath)) {
            console.log(chalk.yellow('⚠️  Prompter is already initialized in this project.'));
            console.log(chalk.gray('   Use `prompter update` to refresh workflow files.\n'));
            return;
        }

        // Select tools
        let selectedTools: string[] = [];

        if (options.tools && options.tools.length > 0) {
            selectedTools = options.tools;
        } else if (!options.noInteractive) {
            try {
                selectedTools = await checkbox({
                    message: 'Select AI tools to configure:',
                    choices: SUPPORTED_TOOLS.map(tool => ({
                        name: tool.name,
                        value: tool.value,
                        checked: tool.value === 'antigravity' // Default check Antigravity
                    }))
                });
            } catch (error) {
                // User cancelled
                console.log(chalk.yellow('\nInitialization cancelled.'));
                return;
            }
        }

        // Create prompter directory
        const prompterPath = await PrompterConfig.ensurePrompterDir(projectPath);
        console.log(chalk.green('✓') + ` Created ${chalk.cyan(PROMPTER_DIR + '/')}`);

        // Create project.md
        const projectMdPath = path.join(prompterPath, 'project.md');
        await fs.writeFile(projectMdPath, projectTemplate, 'utf-8');
        console.log(chalk.green('✓') + ` Created ${chalk.cyan(PROMPTER_DIR + '/project.md')}`);

        // Create AGENTS.md for universal support
        const agentsMdPath = path.join(projectPath, 'AGENTS.md');
        const agentsExists = await this.fileExists(agentsMdPath);
        if (!agentsExists) {
            await fs.writeFile(agentsMdPath, agentsTemplate, 'utf-8');
            console.log(chalk.green('✓') + ` Created ${chalk.cyan('AGENTS.md')}`);
        } else {
            console.log(chalk.gray('  AGENTS.md already exists, skipping'));
        }

        // Generate workflow files for selected tools
        if (selectedTools.length > 0) {
            console.log(chalk.blue('\n📝 Creating workflow files...\n'));

            for (const toolId of selectedTools) {
                const configurator = registry.get(toolId);
                if (configurator) {
                    try {
                        const files = await configurator.generateAll(projectPath);
                        for (const file of files) {
                            console.log(chalk.green('✓') + ` Created ${chalk.cyan(file)}`);
                        }
                    } catch (error) {
                        console.log(chalk.red('✗') + ` Failed to create files for ${toolId}: ${error}`);
                    }
                }
            }
        }

        // Success message
        console.log(chalk.green('\n✅ Prompter initialized successfully!\n'));
        console.log(chalk.blue('Next steps:'));
        console.log(chalk.gray('  1. Edit prompter/project.md to describe your project'));
        console.log(chalk.gray('  2. Use /prompter-enhance to transform prompts'));
        console.log(chalk.gray('  3. Run `prompter list` to see enhanced prompts\n'));
    }

    private async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}
