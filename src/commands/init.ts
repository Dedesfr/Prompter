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
        const isReInitialization = await PrompterConfig.prompterDirExists(projectPath);

        if (isReInitialization) {
            console.log(chalk.blue('\n🔄 Re-configuring Prompter tools...\n'));
        } else {
            console.log(chalk.blue('\n🚀 Initializing Prompter...\n'));
        }

        // Detect currently configured tools if re-initializing
        let currentTools: string[] = [];
        if (isReInitialization) {
            currentTools = await this.detectConfiguredTools(projectPath);
            if (currentTools.length > 0) {
                console.log(chalk.gray('Currently configured tools: ') + chalk.cyan(currentTools.map(t => {
                    const tool = SUPPORTED_TOOLS.find(st => st.value === t);
                    return tool ? tool.name : t;
                }).join(', ')));
                console.log();
            }
        }

        // Select tools
        let selectedTools: string[] = [];

        if (options.tools && options.tools.length > 0) {
            selectedTools = options.tools;
        } else if (!options.noInteractive) {
            try {
                const message = isReInitialization 
                    ? 'Select AI tools to configure (check/uncheck to add/remove):'
                    : 'Select AI tools to configure:';
                
                selectedTools = await checkbox({
                    message,
                    choices: SUPPORTED_TOOLS.map(tool => ({
                        name: tool.name,
                        value: tool.value,
                        checked: isReInitialization 
                            ? currentTools.includes(tool.value) 
                            : tool.value === 'antigravity' // Default check Antigravity for new init
                    }))
                });
            } catch (error) {
                // User cancelled
                console.log(chalk.yellow(isReInitialization ? '\nRe-configuration cancelled.' : '\nInitialization cancelled.'));
                return;
            }
        } else if (isReInitialization && selectedTools.length === 0) {
            // In non-interactive re-init without tools specified, keep current tools
            selectedTools = currentTools;
        }

        // Create or ensure prompter directory
        const prompterPath = await PrompterConfig.ensurePrompterDir(projectPath);
        if (!isReInitialization) {
            console.log(chalk.green('✓') + ` Created ${chalk.cyan(PROMPTER_DIR + '/')}`);
        }

        // Create project.md if not exists
        const projectMdPath = path.join(prompterPath, 'project.md');
        const projectMdExists = await this.fileExists(projectMdPath);
        if (!projectMdExists) {
            await fs.writeFile(projectMdPath, projectTemplate, 'utf-8');
            console.log(chalk.green('✓') + ` Created ${chalk.cyan(PROMPTER_DIR + '/project.md')}`);
        } else if (isReInitialization) {
            console.log(chalk.gray('  project.md already exists, keeping it'));
        }

        // Create AGENTS.md for universal support
        const agentsMdPath = path.join(projectPath, 'AGENTS.md');
        const agentsExists = await this.fileExists(agentsMdPath);
        if (!agentsExists) {
            await fs.writeFile(agentsMdPath, agentsTemplate, 'utf-8');
            console.log(chalk.green('✓') + ` Created ${chalk.cyan('AGENTS.md')}`);
        } else {
            console.log(chalk.gray('  AGENTS.md already exists, skipping'));
        }

        // Handle tool changes
        const toolsToAdd = selectedTools.filter(t => !currentTools.includes(t));
        const toolsToRemove = currentTools.filter(t => !selectedTools.includes(t));
        const toolsToKeep = selectedTools.filter(t => currentTools.includes(t));

        // Remove old tool files
        if (toolsToRemove.length > 0) {
            console.log(chalk.blue('\n🗑️  Removing workflow files...\n'));
            for (const toolId of toolsToRemove) {
                const configurator = registry.get(toolId);
                if (configurator) {
                    try {
                        const files = await this.removeToolFiles(projectPath, configurator);
                        for (const file of files) {
                            console.log(chalk.yellow('✓') + ` Removed ${chalk.cyan(file)}`);
                        }
                    } catch (error) {
                        console.log(chalk.red('✗') + ` Failed to remove files for ${toolId}: ${error}`);
                    }
                }
            }
        }

        // Generate workflow files for new tools
        if (toolsToAdd.length > 0) {
            console.log(chalk.blue('\n📝 Creating workflow files...\n'));

            for (const toolId of toolsToAdd) {
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

        // Show kept tools
        if (isReInitialization && toolsToKeep.length > 0 && (toolsToAdd.length > 0 || toolsToRemove.length > 0)) {
            console.log(chalk.blue('\n✨ Keeping existing tools:\n'));
            for (const toolId of toolsToKeep) {
                const tool = SUPPORTED_TOOLS.find(t => t.value === toolId);
                if (tool) {
                    console.log(chalk.gray('  • ') + chalk.cyan(tool.name));
                }
            }
        }

        // Success message
        if (isReInitialization) {
            console.log(chalk.green('\n✅ Prompter tools updated successfully!\n'));
            if (toolsToAdd.length > 0 || toolsToRemove.length > 0) {
                console.log(chalk.blue('Summary:'));
                if (toolsToAdd.length > 0) {
                    console.log(chalk.green('  Added: ') + toolsToAdd.map(t => {
                        const tool = SUPPORTED_TOOLS.find(st => st.value === t);
                        return tool ? tool.name : t;
                    }).join(', '));
                }
                if (toolsToRemove.length > 0) {
                    console.log(chalk.yellow('  Removed: ') + toolsToRemove.map(t => {
                        const tool = SUPPORTED_TOOLS.find(st => st.value === t);
                        return tool ? tool.name : t;
                    }).join(', '));
                }
                console.log();
            } else {
                console.log(chalk.gray('  No changes made.\n'));
            }
        } else {
            console.log(chalk.green('\n✅ Prompter initialized successfully!\n'));
            console.log(chalk.blue('Next steps:'));
            console.log(chalk.gray('  1. Edit prompter/project.md to describe your project'));
            console.log(chalk.gray('  2. Use /prompter-enhance to transform prompts'));
            console.log(chalk.gray('  3. Run `prompter list` to see enhanced prompts\n'));
        }
    }

    private async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    private async detectConfiguredTools(projectPath: string): Promise<string[]> {
        const configuredTools: string[] = [];
        const allConfigurators = registry.getAll();

        for (const configurator of allConfigurators) {
            const targets = configurator.getTargets();
            let hasFiles = false;

            for (const target of targets) {
                const filePath = path.join(projectPath, target.path);
                if (await this.fileExists(filePath)) {
                    hasFiles = true;
                    break;
                }
            }

            if (hasFiles) {
                configuredTools.push(configurator.toolId);
            }
        }

        return configuredTools;
    }

    private async removeToolFiles(projectPath: string, configurator: any): Promise<string[]> {
        const removedFiles: string[] = [];
        const targets = configurator.getTargets();

        for (const target of targets) {
            const filePath = path.join(projectPath, target.path);
            if (await this.fileExists(filePath)) {
                await fs.unlink(filePath);
                removedFiles.push(target.path);

                // Remove empty parent directories
                await this.removeEmptyDirs(path.dirname(filePath), projectPath);
            }
        }

        return removedFiles;
    }

    private async removeEmptyDirs(dirPath: string, projectPath: string): Promise<void> {
        // Don't remove the project directory itself
        if (dirPath === projectPath || dirPath === path.dirname(projectPath)) {
            return;
        }

        try {
            const files = await fs.readdir(dirPath);
            if (files.length === 0) {
                await fs.rmdir(dirPath);
                // Recursively check parent
                await this.removeEmptyDirs(path.dirname(dirPath), projectPath);
            }
        } catch {
            // Directory doesn't exist or can't be removed, ignore
        }
    }
}
