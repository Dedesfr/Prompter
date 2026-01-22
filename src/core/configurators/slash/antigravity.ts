import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.agent/workflows/prompter-enhance.md',
    'prd-generator': '.agent/workflows/prd-generator.md',
    'prd-agent-generator': '.agent/workflows/prd-agent-generator.md',
    'product-brief': '.agent/workflows/product-brief.md',
    'epic-single': '.agent/workflows/epic-single.md',
    'story-single': '.agent/workflows/story-single.md',
    'qa-test-scenario': '.agent/workflows/qa-test-scenario.md',
    'skill-creator': '.agent/workflows/skill-creator.md',
    'ai-humanizer': '.agent/workflows/ai-humanizer.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'prd-agent-generator': 'Generate a PRD with autonomous assumptions (non-interactive mode)',
    'product-brief': 'Generate an executive-level product brief (1-page summary)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'story-single': 'Generate a single Jira User Story from requirements',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD',
    'skill-creator': 'Create a modular skill package that extends AI agent capabilities',
    'ai-humanizer': 'Humanize and proofread AI-generated content for natural, publication-ready output'
};

export class AntigravityConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'antigravity';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        const description = DESCRIPTIONS[id];
        return `---\ndescription: ${description}\n---`;
    }
}
