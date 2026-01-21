import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';
import { promises as fs } from 'fs';
import path from 'path';
import { PROMPTER_MARKERS } from '../../config.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.github/prompts/prompter-enhance.prompt.md',
    'prd-generator': '.github/prompts/prd-generator.prompt.md',
    'product-brief': '.github/prompts/product-brief.prompt.md',
    'epic-single': '.github/prompts/epic-single.prompt.md',
    'story-single': '.github/prompts/story-single.prompt.md',
    'qa-test-scenario': '.github/prompts/qa-test-scenario.prompt.md',
    'skill-creator': '.github/prompts/skill-creator.prompt.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'product-brief': 'Generate an executive-level product brief (1-page summary)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'story-single': 'Generate a single Jira User Story from requirements',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD',
    'skill-creator': 'Create a modular skill package that extends AI agent capabilities'
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

    async generateAll(projectPath: string): Promise<string[]> {
        const createdOrUpdated: string[] = [];

        for (const target of this.getTargets()) {
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
