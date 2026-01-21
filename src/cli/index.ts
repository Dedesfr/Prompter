import { Command } from 'commander';
import { InitCommand } from '../commands/init.js';
import { UpdateCommand } from '../commands/update.js';
import { ListCommand } from '../commands/list.js';
import { GuideCommand } from '../commands/guide.js';

const program = new Command();

program
    .name('prompter')
    .description('Enhance prompts directly in your AI coding workflow')
    .version('0.4.1');

program
    .command('init')
    .description('Initialize Prompter in your project')
    .option('--tools <tools...>', 'Specify AI tools to configure (antigravity, claude, codex, github-copilot, opencode, kilocode)')
    .option('--no-interactive', 'Run without interactive prompts')
    .action(async (options) => {
        const initCommand = new InitCommand();
        await initCommand.execute(options);
    });

program
    .command('update')
    .description('Update Prompter workflow files to latest version')
    .action(async () => {
        const updateCommand = new UpdateCommand();
        await updateCommand.execute();
    });

program
    .command('list')
    .description('List all enhanced prompts')
    .option('--json', 'Output as JSON')
    .action(async (options) => {
        const listCommand = new ListCommand();
        await listCommand.execute(options);
    });

program
    .command('guide')
    .description('Show setup guide for Prompter')
    .action(async () => {
        const guideCommand = new GuideCommand();
        await guideCommand.execute();
    });

program.parse();
