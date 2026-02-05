import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';
import { promises as fs } from 'fs';
import path from 'path';
import { PROMPTER_MARKERS } from '../../config.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.github/prompts/prompter-enhance.prompt.md',
    'prd-generator': '.github/prompts/prd-generator.prompt.md',
    'prd-agent-generator': '.github/prompts/prd-agent-generator.prompt.md',
    'product-brief': '.github/prompts/product-brief.prompt.md',
    'epic-single': '.github/prompts/epic-single.prompt.md',
    'epic-generator': '.github/prompts/epic-generator.prompt.md',
    'story-single': '.github/prompts/story-single.prompt.md',
    'story-generator': '.github/prompts/story-generator.prompt.md',
    'qa-test-scenario': '.github/prompts/qa-test-scenario.prompt.md',
    'skill-creator': '.github/prompts/skill-creator.prompt.md',
    'ai-humanizer': '.github/prompts/ai-humanizer.prompt.md',
    'api-contract-generator': '.github/prompts/api-contract-generator.prompt.md',
    'apply': '.github/prompts/apply.prompt.md',
    'archive': '.github/prompts/archive.prompt.md',
    'design-system': '.github/prompts/design-system.prompt.md',
    'erd-generator': '.github/prompts/erd-generator.prompt.md',
    'fsd-generator': '.github/prompts/fsd-generator.prompt.md',
    'proposal': '.github/prompts/proposal.prompt.md',
    'tdd-generator': '.github/prompts/tdd-generator.prompt.md',
    'tdd-lite-generator': '.github/prompts/tdd-lite-generator.prompt.md',
    'wireframe-generator': '.github/prompts/wireframe-generator.prompt.md',
    'document-explainer': '.github/prompts/document-explainer.prompt.md'
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

export class GithubCopilotConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'github-copilot';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        const description = DESCRIPTIONS[id];
        return `---\ndescription: ${description}\n---`;
    }

    async generateAll(projectPath: string, filterIds?: SlashCommandId[]): Promise<string[]> {
        const createdOrUpdated: string[] = [];

        for (const target of this.getTargets(filterIds)) {
            const body = this.getBody(target.id);
            const filePath = path.join(projectPath, target.path);

            // Ensure directory exists
            await fs.mkdir(path.dirname(filePath), { recursive: true });

            const exists = await this.checkFileExists(filePath);
            if (exists) {
                await this.updateBody(filePath, body);
            } else {
                const frontmatter = this.getFrontmatter(target.id);
                const sections: string[] = [];
                if (frontmatter) {
                    sections.push(frontmatter.trim());
                }
                // Add $ARGUMENTS after frontmatter
                sections.push('$ARGUMENTS');
                sections.push(`${PROMPTER_MARKERS.start}\n${body}\n${PROMPTER_MARKERS.end}`);
                const content = sections.join('\n') + '\n';
                await fs.writeFile(filePath, content, 'utf-8');
            }

            createdOrUpdated.push(target.path);
        }

        return createdOrUpdated;
    }

    private async checkFileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}
