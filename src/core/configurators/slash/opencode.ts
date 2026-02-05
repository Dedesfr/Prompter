import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.opencode/command/prompter-enhance.md',
    'prd-generator': '.opencode/command/prd-generator.md',
    'prd-agent-generator': '.opencode/command/prd-agent-generator.md',
    'product-brief': '.opencode/command/product-brief.md',
    'epic-single': '.opencode/command/epic-single.md',
    'epic-generator': '.opencode/command/epic-generator.md',
    'story-single': '.opencode/command/story-single.md',
    'story-generator': '.opencode/command/story-generator.md',
    'qa-test-scenario': '.opencode/command/qa-test-scenario.md',
    'skill-creator': '.opencode/command/skill-creator.md',
    'ai-humanizer': '.opencode/command/ai-humanizer.md',
    'api-contract-generator': '.opencode/command/api-contract-generator.md',
    'apply': '.opencode/command/apply.md',
    'archive': '.opencode/command/archive.md',
    'design-system': '.opencode/command/design-system.md',
    'erd-generator': '.opencode/command/erd-generator.md',
    'fsd-generator': '.opencode/command/fsd-generator.md',
    'proposal': '.opencode/command/proposal.md',
    'tdd-generator': '.opencode/command/tdd-generator.md',
    'tdd-lite-generator': '.opencode/command/tdd-lite-generator.md',
    'wireframe-generator': '.opencode/command/wireframe-generator.md',
    'document-explainer': '.opencode/command/document-explainer.md'
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
    'apply': 'Implement and apply an approved change proposal',
    'archive': 'Archive a completed change and update specs',
    'design-system': 'Generate comprehensive design system documentation for components and tokens',
    'erd-generator': 'Generate Entity Relationship Diagram from FSD',
    'fsd-generator': 'Generate Functional Specification Document from PRD',
    'proposal': 'Create a new change proposal with spec deltas',
    'tdd-generator': 'Generate comprehensive Technical Design Document',
    'tdd-lite-generator': 'Generate lean Technical Design Document (TDD-Lite)',
    'wireframe-generator': 'Generate UI/UX wireframes from technical specs',
    'document-explainer': 'Analyze and explain complex documents into clear, actionable insights'
};

export class OpenCodeConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'opencode';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        const description = DESCRIPTIONS[id];
        return `---\nagent: build\ndescription: ${description}\n---`;
    }
}
