import chalk from 'chalk';
import { promises as fs } from 'fs';
import path from 'path';
import { PrompterConfig, AVAILABLE_PROMPTS, PROMPTER_DIR } from '../core/config.js';
import { registry } from '../core/configurators/slash/index.js';
import { PROMPT_TEMPLATES } from '../core/prompt-templates.js';

export class UpdateCommand {
    async execute(): Promise<void> {
        const projectPath = process.cwd();

        console.log(chalk.blue('\n🔄 Updating Prompter workflow files...\n'));

        // Check if initialized
        if (!await PrompterConfig.prompterDirExists(projectPath)) {
            console.log(chalk.red('❌ Prompter is not initialized in this project.'));
            console.log(chalk.gray('   Run `prompter init` first.\n'));
            process.exitCode = 1;
            return;
        }

        // Detect configured tools
        const configuredTools = await this.detectConfiguredTools(projectPath);

        if (configuredTools.length === 0) {
            console.log(chalk.yellow('⚠️  No configured tools found.'));
            console.log(chalk.gray('   Run `prompter init` to configure tools.\n'));
            process.exitCode = 1;
            return;
        }

        let updatedCount = 0;

        // Update existing workflow files for configured tools only
        for (const toolId of configuredTools) {
            const configurator = registry.get(toolId);
            if (!configurator) continue;

            try {
                // Only update existing files, don't create new ones
                const updatedFiles = await configurator.updateExisting(projectPath);
                for (const file of updatedFiles) {
                    console.log(chalk.green('✓') + ` Updated ${chalk.cyan(file)}`);
                    updatedCount++;
                }
            } catch (error) {
                console.log(chalk.red('✗') + ` Failed to update ${configurator.toolId}: ${error}`);
            }
        }

        // Update existing prompts in prompter/core/
        const prompterPath = path.join(projectPath, PROMPTER_DIR);
        const updatedCorePrompts = await this.updateCorePrompts(prompterPath);
        for (const promptName of updatedCorePrompts) {
            console.log(chalk.green('✓') + ` Updated ${chalk.cyan(`${PROMPTER_DIR}/core/${promptName}`)}`);
            updatedCount++;
        }

        if (updatedCount === 0) {
            console.log(chalk.yellow('⚠️  No workflow files found to update.'));
            console.log(chalk.gray('   Run `prompter init` to create them.\n'));
        } else {
            console.log(chalk.green(`\n✅ ${updatedCount} file(s) updated.\n`));
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

    private async updateCorePrompts(prompterPath: string): Promise<string[]> {
        const updatedPrompts: string[] = [];
        const corePath = path.join(prompterPath, 'core');

        // Check if core directory exists
        if (!await this.fileExists(corePath)) {
            return updatedPrompts;
        }

        // Update each existing prompt file
        for (const prompt of AVAILABLE_PROMPTS) {
            const promptFilePath = path.join(corePath, prompt.sourceFile);
            
            // Only update if file exists
            if (await this.fileExists(promptFilePath)) {
                try {
                    const content = PROMPT_TEMPLATES[prompt.value];
                    
                    if (!content) {
                        console.log(chalk.yellow(`  Warning: Template not found for ${prompt.name}`));
                        continue;
                    }
                    
                    // Update the prompt file
                    await fs.writeFile(promptFilePath, content, 'utf-8');
                    updatedPrompts.push(prompt.sourceFile);
                } catch (error) {
                    console.log(chalk.red(`  Error updating ${prompt.name}: ${error}`));
                }
            }
        }

        return updatedPrompts;
    }
}
