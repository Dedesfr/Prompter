import { spawn } from 'child_process';
import chalk from 'chalk';

export class UpgradeCommand {
    async execute(): Promise<void> {
        console.log(chalk.cyan('\n🔄 Upgrading Prompter to the latest version...\n'));

        const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        
        const upgrade = spawn(npmCommand, ['install', '-g', '@dedesfr/prompter@latest'], {
            stdio: 'inherit',
            shell: true
        });

        upgrade.on('close', (code) => {
            if (code === 0) {
                console.log(chalk.green('\n✓ Prompter has been upgraded successfully!\n'));
            } else {
                console.error(chalk.red(`\n✗ Upgrade failed with exit code ${code}\n`));
                process.exit(code || 1);
            }
        });

        upgrade.on('error', (error) => {
            console.error(chalk.red('\n✗ Failed to run upgrade command:'), error.message);
            console.log(chalk.yellow('\nPlease run manually: npm install -g @dedesfr/prompter@latest\n'));
            process.exit(1);
        });
    }
}
