import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.opencode/prompts/prompter-enhance.md',
    'prd-generator': '.opencode/prompts/prd-generator.md',
    'product-brief': '.opencode/prompts/product-brief.md',
    'epic-single': '.opencode/prompts/epic-single.md',
    'story-single': '.opencode/prompts/story-single.md',
    'qa-test-scenario': '.opencode/prompts/qa-test-scenario.md',
    'skill-creator': '.opencode/prompts/skill-creator.md',
    'ai-humanizer': '.opencode/prompts/ai-humanizer.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'product-brief': 'Generate an executive-level product brief (1-page summary)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'story-single': 'Generate a single Jira User Story from requirements',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD',
    'skill-creator': 'Create a modular skill package that extends AI agent capabilities',
    'ai-humanizer': 'Humanize and proofread AI-generated content for natural, publication-ready output'
};

export class OpenCodeConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'opencode';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        const description = DESCRIPTIONS[id];
        return `---\ndescription: ${description}\n---`;
    }
}
