import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.codex/prompts/prompter-enhance.md',
    'prd-generator': '.codex/prompts/prd-generator.md',
    'prd-agent-generator': '.codex/prompts/prd-agent-generator.md',
    'product-brief': '.codex/prompts/product-brief.md',
    'epic-single': '.codex/prompts/epic-single.md',
    'epic-generator': '.codex/prompts/epic-generator.md',
    'story-single': '.codex/prompts/story-single.md',
    'story-generator': '.codex/prompts/story-generator.md',
    'qa-test-scenario': '.codex/prompts/qa-test-scenario.md',
    'skill-creator': '.codex/prompts/skill-creator.md',
    'ai-humanizer': '.codex/prompts/ai-humanizer.md',
    'api-contract-generator': '.codex/prompts/api-contract-generator.md',
    'apply': '.codex/prompts/apply.md',
    'archive': '.codex/prompts/archive.md',
    'design-system': '.codex/prompts/design-system.md',
    'erd-generator': '.codex/prompts/erd-generator.md',
    'fsd-generator': '.codex/prompts/fsd-generator.md',
    'proposal': '.codex/prompts/proposal.md',
    'tdd-generator': '.codex/prompts/tdd-generator.md',
    'tdd-lite-generator': '.codex/prompts/tdd-lite-generator.md',
    'wireframe-generator': '.codex/prompts/wireframe-generator.md',
    'document-explainer': '.codex/prompts/document-explainer.md'
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
