import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.codex/prompts/prompter-enhance.md',
    'prd-generator': '.codex/prompts/prd-generator.md',
    'product-brief': '.codex/prompts/product-brief.md',
    'epic-single': '.codex/prompts/epic-single.md',
    'story-single': '.codex/prompts/story-single.md',
    'qa-test-scenario': '.codex/prompts/qa-test-scenario.md',
    'skill-creator': '.codex/prompts/skill-creator.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'product-brief': 'Generate an executive-level product brief (1-page summary)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'story-single': 'Generate a single Jira User Story from requirements',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD',
    'skill-creator': 'Create a modular skill package that extends AI agent capabilities'
};

export class CodexConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'codex';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        const description = DESCRIPTIONS[id];
        return `---\ndescription: ${description}\n---`;
    }
}
