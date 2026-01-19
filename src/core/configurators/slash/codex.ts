import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.codex/prompts/prompter-enhance.md',
    'prd-generator': '.codex/prompts/prd-generator.md',
    'epic-single': '.codex/prompts/epic-single.md',
    'story-single': '.codex/prompts/story-single.md',
    'qa-test-scenario': '.codex/prompts/qa-test-scenario.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'story-single': 'Generate a single Jira User Story from requirements',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD'
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
