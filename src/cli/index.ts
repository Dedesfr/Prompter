import { Command } from 'commander';
import { InitCommand } from '../commands/init.js';
import { UpdateCommand } from '../commands/update.js';
import { ListCommand } from '../commands/list.js';
import { GuideCommand } from '../commands/guide.js';
import { UpgradeCommand } from '../commands/upgrade.js';
import { ApiContractGeneratorCommand } from '../commands/api-contract-generator.js';
import { ErdGeneratorCommand } from '../commands/erd-generator.js';
import { FsdGeneratorCommand } from '../commands/fsd-generator.js';
import { TddGeneratorCommand } from '../commands/tdd-generator.js';
import { TddLiteGeneratorCommand } from '../commands/tdd-lite-generator.js';
import { WireframeGeneratorCommand } from '../commands/wireframe-generator.js';

const program = new Command();

program
    .name('prompter')
    .description('Enhance prompts directly in your AI coding workflow')
    .version('0.6.1');

program
    .command('init')
    .description('Initialize Prompter in your project')
    .option('--tools <tools...>', 'Specify AI tools to configure (antigravity, claude, codex, github-copilot, opencode, kilocode)')
    .option('--prompts <prompts...>', 'Specify prompts to install (ai-humanizer, api-contract-generator, epic-single, erd-generator, fsd-generator, prd-agent-generator, prd-generator, product-brief, qa-test-scenario, skill-creator, story-single, tdd-generator, tdd-lite-generator, wireframe-generator)')
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

program
    .command('api-contract-generator')
    .description('Generate API Contract workflow files')
    .action(async () => {
        const command = new ApiContractGeneratorCommand();
        await command.execute();
    });

program
    .command('erd-generator')
    .description('Generate ERD workflow files')
    .action(async () => {
        const command = new ErdGeneratorCommand();
        await command.execute();
    });

program
    .command('fsd-generator')
    .description('Generate FSD workflow files')
    .action(async () => {
        const command = new FsdGeneratorCommand();
        await command.execute();
    });

program
    .command('tdd-generator')
    .description('Generate TDD workflow files')
    .action(async () => {
        const command = new TddGeneratorCommand();
        await command.execute();
    });

program
    .command('tdd-lite-generator')
    .description('Generate TDD-Lite workflow files')
    .action(async () => {
        const command = new TddLiteGeneratorCommand();
        await command.execute();
    });

program
    .command('wireframe-generator')
    .description('Generate Wireframe workflow files')
    .action(async () => {
        const command = new WireframeGeneratorCommand();
        await command.execute();
    });

program.parse();
