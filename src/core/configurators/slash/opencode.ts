import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.opencode/prompts/prompter-enhance.md',
    'prd-generator': '.opencode/prompts/prd-generator.md',
    'prd-agent-generator': '.opencode/prompts/prd-agent-generator.md',
    'product-brief': '.opencode/prompts/product-brief.md',
    'epic-single': '.opencode/prompts/epic-single.md',
    'story-single': '.opencode/prompts/story-single.md',
    'qa-test-scenario': '.opencode/prompts/qa-test-scenario.md',
    'skill-creator': '.opencode/prompts/skill-creator.md',
    'ai-humanizer': '.opencode/prompts/ai-humanizer.md',
    'api-contract-generator': '.opencode/prompts/api-contract-generator.md',
    'erd-generator': '.opencode/prompts/erd-generator.md',
    'fsd-generator': '.opencode/prompts/fsd-generator.md',
    'tdd-generator': '.opencode/prompts/tdd-generator.md',
    'tdd-lite-generator': '.opencode/prompts/tdd-lite-generator.md',
    'wireframe-generator': '.opencode/prompts/wireframe-generator.md'
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
    'ai-humanizer': 'Humanize and proofread AI-generated content for natural, publication-ready output',
    'api-contract-generator': 'Generate OpenAPI specification from FSD and ERD',
    'erd-generator': 'Generate Entity Relationship Diagram from FSD',
    'fsd-generator': 'Generate Functional Specification Document from PRD',
    'tdd-generator': 'Generate comprehensive Technical Design Document',
    'tdd-lite-generator': 'Generate lean Technical Design Document (TDD-Lite)',
    'wireframe-generator': 'Generate UI/UX wireframes from technical specs'
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
