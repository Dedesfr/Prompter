import chalk from 'chalk';
import { promises as fs } from 'fs';
import path from 'path';
import { PrompterConfig } from '../core/config.js';
import { registry } from '../core/configurators/slash/index.js';

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
        let createdCount = 0;

        // Update and add missing workflow files for configured tools only
        for (const toolId of configuredTools) {
            const configurator = registry.get(toolId);
            if (!configurator) continue;

            try {
                // Update existing files
                const updatedFiles = await configurator.updateExisting(projectPath);
                for (const file of updatedFiles) {
                    console.log(chalk.green('✓') + ` Updated ${chalk.cyan(file)}`);
                    updatedCount++;
                }

                // Generate all workflow files (including missing ones)
                const allFiles = await configurator.generateAll(projectPath);
                const newFiles = allFiles.filter(f => !updatedFiles.includes(f));
                for (const file of newFiles) {
                    console.log(chalk.green('✓') + ` Created ${chalk.cyan(file)}`);
                    createdCount++;
                }
            } catch (error) {
                console.log(chalk.red('✗') + ` Failed to update ${configurator.toolId}: ${error}`);
            }
        }

        if (updatedCount === 0 && createdCount === 0) {
            console.log(chalk.yellow('⚠️  No workflow files found to update.'));
            console.log(chalk.gray('   Run `prompter init` to create them.\n'));
        } else {
            const summary: string[] = [];
            if (updatedCount > 0) summary.push(`${updatedCount} updated`);
            if (createdCount > 0) summary.push(`${createdCount} created`);
            console.log(chalk.green(`\n✅ ${summary.join(', ')}.\n`));
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
}
