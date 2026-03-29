import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.forge/commands/prompter/enhance.md',
    'prd-generator': '.forge/commands/prompter/prd-generator.md',
    'prd-agent-generator': '.forge/commands/prompter/prd-agent-generator.md',
    'product-brief': '.forge/commands/prompter/product-brief.md',
    'epic-single': '.forge/commands/prompter/epic-single.md',
    'epic-generator': '.forge/commands/prompter/epic-generator.md',
    'story-single': '.forge/commands/prompter/story-single.md',
    'story-generator': '.forge/commands/prompter/story-generator.md',
    'qa-test-scenario': '.forge/commands/prompter/qa-test-scenario.md',
    'skill-creator': '.forge/commands/prompter/skill-creator.md',
    'ai-humanizer': '.forge/commands/prompter/ai-humanizer.md',
    'api-contract-generator': '.forge/commands/prompter/api-contract-generator.md',
    'apply': '.forge/commands/prompter/apply.md',
    'archive': '.forge/commands/prompter/archive.md',
    'design-system': '.forge/commands/prompter/design-system.md',
    'erd-generator': '.forge/commands/prompter/erd-generator.md',
    'fsd-generator': '.forge/commands/prompter/fsd-generator.md',
    'proposal': '.forge/commands/prompter/proposal.md',
    'tdd-generator': '.forge/commands/prompter/tdd-generator.md',
    'tdd-lite-generator': '.forge/commands/prompter/tdd-lite-generator.md',
    'wireframe-generator': '.forge/commands/prompter/wireframe-generator.md',
    'document-explainer': '.forge/commands/prompter/document-explainer.md'
};

export class ForgeConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'forge';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        return undefined;
    }
}
