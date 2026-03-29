import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.factory/commands/prompter/enhance.md',
    'prd-generator': '.factory/commands/prompter/prd-generator.md',
    'prd-agent-generator': '.factory/commands/prompter/prd-agent-generator.md',
    'product-brief': '.factory/commands/prompter/product-brief.md',
    'epic-single': '.factory/commands/prompter/epic-single.md',
    'epic-generator': '.factory/commands/prompter/epic-generator.md',
    'story-single': '.factory/commands/prompter/story-single.md',
    'story-generator': '.factory/commands/prompter/story-generator.md',
    'qa-test-scenario': '.factory/commands/prompter/qa-test-scenario.md',
    'skill-creator': '.factory/commands/prompter/skill-creator.md',
    'ai-humanizer': '.factory/commands/prompter/ai-humanizer.md',
    'api-contract-generator': '.factory/commands/prompter/api-contract-generator.md',
    'apply': '.factory/commands/prompter/apply.md',
    'archive': '.factory/commands/prompter/archive.md',
    'design-system': '.factory/commands/prompter/design-system.md',
    'erd-generator': '.factory/commands/prompter/erd-generator.md',
    'fsd-generator': '.factory/commands/prompter/fsd-generator.md',
    'proposal': '.factory/commands/prompter/proposal.md',
    'tdd-generator': '.factory/commands/prompter/tdd-generator.md',
    'tdd-lite-generator': '.factory/commands/prompter/tdd-lite-generator.md',
    'wireframe-generator': '.factory/commands/prompter/wireframe-generator.md',
    'document-explainer': '.factory/commands/prompter/document-explainer.md'
};

export class DroidConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'droid';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        return undefined;
    }

    protected getSkillTargetDir(skillName: string): string {
        return `.factory/skills/${skillName}`;
    }
}
