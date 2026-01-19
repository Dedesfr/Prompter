import { Command } from 'commander';
import { InitCommand } from '../commands/init.js';
import { UpdateCommand } from '../commands/update.js';
import { ListCommand } from '../commands/list.js';
import { PrdGeneratorCommand } from '../commands/prd-generator.js';

const program = new Command();

program
    .name('prompter')
    .description('Enhance prompts directly in your AI coding workflow')
    .version('0.1.0');

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
    .command('prd-generator')
    .description('Generate PRD workflow files for configured AI tools')
    .action(async (options) => {
        const prdGeneratorCommand = new PrdGeneratorCommand();
        await prdGeneratorCommand.execute(options);
    });

program.parse();
