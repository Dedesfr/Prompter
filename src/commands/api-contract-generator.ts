import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { PrompterConfig, PROMPTER_DIR, PROMPTER_MARKERS } from '../core/config.js';
import { registry } from '../core/configurators/slash/index.js';

interface ApiContractGeneratorOptions {
    tools?: string[];
    noInteractive?: boolean;
}

export class ApiContractGeneratorCommand {
    async execute(options: ApiContractGeneratorOptions = {}): Promise<void> {
        const projectPath = process.cwd();

        // Check if initialized
        if (!await PrompterConfig.prompterDirExists(projectPath)) {
            console.log(chalk.red('\n❌ Prompter is not initialized in this project.\n'));
            console.log(chalk.gray('   Run `prompter init` first.\n'));
            process.exitCode = 1;
            return;
        }

        console.log(chalk.blue('\n📝 Generating API Contract Generator workflow files...\n'));

        // Detect currently configured tools
        const configuredTools = await this.detectConfiguredTools(projectPath);
        
        if (configuredTools.length === 0) {
            console.log(chalk.yellow('⚠️  No tools configured yet.\n'));
            console.log(chalk.gray('   Run `prompter init` to configure AI tools first.\n'));
            process.exitCode = 1;
            return;
        }

        // Generate api-contract-generator workflow files for all configured tools
        let successCount = 0;
        let failCount = 0;

        for (const toolId of configuredTools) {
            const configurator = registry.get(toolId);
            if (configurator) {
                try {
                    // Generate only the api-contract-generator workflow file
                    const body = configurator['getBody']('api-contract-generator');
                    const relativePath = configurator['getRelativePath']('api-contract-generator');
                    const filePath = path.join(projectPath, relativePath);
                    
                    // Ensure directory exists
                    await fs.mkdir(path.dirname(filePath), { recursive: true });
                    
                    // Check if file exists
                    const fileExists = await this.fileExists(filePath);
                    
                    if (fileExists) {
                        console.log(chalk.yellow('⚠️') + ` ${chalk.cyan(relativePath)} already exists, skipping`);
                        continue;
                    }
                    
                    // Get frontmatter if needed
                    const frontmatter = configurator['getFrontmatter']('api-contract-generator');
                    const sections: string[] = [];
                    if (frontmatter) {
                        sections.push(frontmatter.trim());
                    }
                    sections.push(`${PROMPTER_MARKERS.start}\n${body}\n${PROMPTER_MARKERS.end}`);
                    const content = sections.join('\n') + '\n';
                    
                    await fs.writeFile(filePath, content, 'utf-8');
                    console.log(chalk.green('✓') + ` Created ${chalk.cyan(relativePath)}`);
                    successCount++;
                } catch (error) {
                    console.log(chalk.red('✗') + ` Failed to create files for ${toolId}: ${error}`);
                    failCount++;
                }
            }
        }

        // Success message
        console.log(chalk.green(`\n✅ API Contract Generator workflow files created successfully!\n`));
        console.log(chalk.blue('Next steps:'));
        console.log(chalk.gray('  1. Use /api-contract-generator in your AI tool to create API contracts'));
        console.log(chalk.gray('  2. API contracts will be saved to prompter/<slug>/api-contract.md\n'));
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
}
