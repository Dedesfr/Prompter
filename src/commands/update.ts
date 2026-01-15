import chalk from 'chalk';
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

        let updatedCount = 0;

        // Update workflow files for all tools
        for (const configurator of registry.getAvailable()) {
            try {
                const files = await configurator.updateExisting(projectPath);
                for (const file of files) {
                    console.log(chalk.green('✓') + ` Updated ${chalk.cyan(file)}`);
                    updatedCount++;
                }
            } catch (error) {
                console.log(chalk.red('✗') + ` Failed to update ${configurator.toolId}: ${error}`);
            }
        }

        if (updatedCount === 0) {
            console.log(chalk.yellow('⚠️  No workflow files found to update.'));
            console.log(chalk.gray('   Run `prompter init` to create them.\n'));
        } else {
            console.log(chalk.green(`\n✅ Updated ${updatedCount} file(s).\n`));
        }
    }
}
