import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.kilocode/workflows/prompter-enhance.md',
    'prd-generator': '.kilocode/workflows/prd-generator.md',
    'prd-agent-generator': '.kilocode/workflows/prd-agent-generator.md',
    'product-brief': '.kilocode/workflows/product-brief.md',
    'epic-single': '.kilocode/workflows/epic-single.md',
    'epic-generator': '.kilocode/workflows/epic-generator.md',
    'story-single': '.kilocode/workflows/story-single.md',
    'story-generator': '.kilocode/workflows/story-generator.md',
    'qa-test-scenario': '.kilocode/workflows/qa-test-scenario.md',
    'skill-creator': '.kilocode/workflows/skill-creator.md',
    'ai-humanizer': '.kilocode/workflows/ai-humanizer.md',
    'api-contract-generator': '.kilocode/workflows/api-contract-generator.md',
    'apply': '.kilocode/workflows/apply.md',
    'archive': '.kilocode/workflows/archive.md',
    'design-system': '.kilocode/workflows/design-system.md',
    'erd-generator': '.kilocode/workflows/erd-generator.md',
    'fsd-generator': '.kilocode/workflows/fsd-generator.md',
    'proposal': '.kilocode/workflows/proposal.md',
    'tdd-generator': '.kilocode/workflows/tdd-generator.md',
    'tdd-lite-generator': '.kilocode/workflows/tdd-lite-generator.md',
    'wireframe-generator': '.kilocode/workflows/wireframe-generator.md',
    'document-explainer': '.kilocode/workflows/document-explainer.md'
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
