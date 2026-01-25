import { Command } from 'commander';
import { InitCommand } from '../commands/init.js';
import { UpdateCommand } from '../commands/update.js';
import { ListCommand } from '../commands/list.js';
import { GuideCommand } from '../commands/guide.js';
import { UpgradeCommand } from '../commands/upgrade.js';

const program = new Command();

program
    .name('prompter')
    .description('Enhance prompts directly in your AI coding workflow')
    .version('0.6.11');

program
    .command('init')
    .description('Initialize Prompter in your project')
    .option('--tools <tools...>', 'Specify AI tools to configure (antigravity, claude, codex, github-copilot, opencode, kilocode)')
    .option('--prompts <prompts...>', 'Specify prompts to install (ai-humanizer, api-contract-generator, document-explainer, epic-single, epic-generator, erd-generator, fsd-generator, prd-agent-generator, prd-generator, product-brief, qa-test-scenario, skill-creator, story-single, story-generator, tdd-generator, tdd-lite-generator, wireframe-generator)')
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

program
    .command('upgrade')
    .description('Upgrade Prompter to the latest version')
    .action(async () => {
        const upgradeCommand = new UpgradeCommand();
        await upgradeCommand.execute();
    });

program.parse();
