import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.kilocode/workflows/prompter-enhance.md',
    'prd-generator': '.kilocode/workflows/prd-generator.md',
    'epic-single': '.kilocode/workflows/epic-single.md',
    'story-single': '.kilocode/workflows/story-single.md',
    'qa-test-scenario': '.kilocode/workflows/qa-test-scenario.md',
    'skill-creator': '.kilocode/workflows/skill-creator.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'story-single': 'Generate a single Jira User Story from requirements',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD',
    'skill-creator': 'Create a modular skill package that extends AI agent capabilities'
};

export class KiloCodeConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'kilocode';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        const description = DESCRIPTIONS[id];
        return `---\ndescription: ${description}\n---`;
    }
}
