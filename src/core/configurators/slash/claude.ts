import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.claude/commands/prompter/enhance.md',
    'prd-generator': '.claude/commands/prompter/prd-generator.md',
    'prd-agent-generator': '.claude/commands/prompter/prd-agent-generator.md',
    'product-brief': '.claude/commands/prompter/product-brief.md',
    'epic-single': '.claude/commands/prompter/epic-single.md',
    'epic-generator': '.claude/commands/prompter/epic-generator.md',
    'story-single': '.claude/commands/prompter/story-single.md',
    'story-generator': '.claude/commands/prompter/story-generator.md',
    'qa-test-scenario': '.claude/commands/prompter/qa-test-scenario.md',
    'skill-creator': '.claude/commands/prompter/skill-creator.md',
    'ai-humanizer': '.claude/commands/prompter/ai-humanizer.md',
    'api-contract-generator': '.claude/commands/prompter/api-contract-generator.md',
    'erd-generator': '.claude/commands/prompter/erd-generator.md',
    'fsd-generator': '.claude/commands/prompter/fsd-generator.md',
    'tdd-generator': '.claude/commands/prompter/tdd-generator.md',
    'tdd-lite-generator': '.claude/commands/prompter/tdd-lite-generator.md',
    'wireframe-generator': '.claude/commands/prompter/wireframe-generator.md',
    'document-explainer': '.claude/commands/prompter/document-explainer.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'prd-agent-generator': 'Generate a PRD with autonomous assumptions (non-interactive mode)',
    'product-brief': 'Generate an executive-level product brief (1-page summary)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'epic-generator': 'Generate a comprehensive set of EPICs from documentation',
    'story-single': 'Generate a single Jira User Story from requirements',
    'story-generator': 'Generate comprehensive user stories from EPICs and FSD',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD',
    'skill-creator': 'Create a modular skill package that extends AI agent capabilities',
    'ai-humanizer': 'Humanize and proofread AI-generated content for natural, publication-ready output',
    'api-contract-generator': 'Generate OpenAPI specification from FSD and ERD',
    'erd-generator': 'Generate Entity Relationship Diagram from FSD',
    'fsd-generator': 'Generate Functional Specification Document from PRD',
    'tdd-generator': 'Generate comprehensive Technical Design Document',
    'tdd-lite-generator': 'Generate lean Technical Design Document (TDD-Lite)',
    'wireframe-generator': 'Generate UI/UX wireframes from technical specs',
    'document-explainer': 'Analyze and explain complex documents into clear, actionable insights'
};

export class ClaudeConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'claude';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        // Claude Code uses the filename as the command name
        return undefined;
    }
}
