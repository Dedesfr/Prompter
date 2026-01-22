import { promises as fs } from 'fs';
import path from 'path';
import { SlashCommandId, TemplateManager } from '../../templates/index.js';
import { PROMPTER_MARKERS } from '../../config.js';

export interface SlashCommandTarget {
    id: SlashCommandId;
    path: string;
    kind: 'slash';
}

const ALL_COMMANDS: SlashCommandId[] = ['enhance', 'prd-generator', 'product-brief', 'epic-single', 'story-single', 'qa-test-scenario', 'skill-creator', 'ai-humanizer'];

export abstract class SlashCommandConfigurator {
    abstract readonly toolId: string;
    abstract readonly isAvailable: boolean;

    getTargets(): SlashCommandTarget[] {
        return ALL_COMMANDS.map((id) => ({
            id,
            path: this.getRelativePath(id),
            kind: 'slash'
        }));
    }

    async generateAll(projectPath: string): Promise<string[]> {
        const createdOrUpdated: string[] = [];

        for (const target of this.getTargets()) {
            const body = this.getBody(target.id);
            const filePath = path.join(projectPath, target.path);

            // Ensure directory exists
            await fs.mkdir(path.dirname(filePath), { recursive: true });

            if (await this.fileExists(filePath)) {
                await this.updateBody(filePath, body);
            } else {
                const frontmatter = this.getFrontmatter(target.id);
                const sections: string[] = [];
                if (frontmatter) {
                    sections.push(frontmatter.trim());
                }
                sections.push(`${PROMPTER_MARKERS.start}\n${body}\n${PROMPTER_MARKERS.end}`);
                const content = sections.join('\n') + '\n';
                await fs.writeFile(filePath, content, 'utf-8');
            }

            createdOrUpdated.push(target.path);
        }

        return createdOrUpdated;
    }

    async updateExisting(projectPath: string): Promise<string[]> {
        const updated: string[] = [];

        for (const target of this.getTargets()) {
            const filePath = path.join(projectPath, target.path);
            if (await this.fileExists(filePath)) {
                const body = this.getBody(target.id);
                await this.updateBody(filePath, body);
                updated.push(target.path);
            }
        }

        return updated;
    }

    protected abstract getRelativePath(id: SlashCommandId): string;
    protected abstract getFrontmatter(id: SlashCommandId): string | undefined;

    protected getBody(id: SlashCommandId): string {
        return TemplateManager.getSlashCommandBody(id).trim();
    }

    protected async updateBody(filePath: string, body: string): Promise<void> {
        const content = await fs.readFile(filePath, 'utf-8');
        const startIndex = content.indexOf(PROMPTER_MARKERS.start);
        const endIndex = content.indexOf(PROMPTER_MARKERS.end);

        if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
            throw new Error(`Missing Prompter markers in ${filePath}`);
        }

        const before = content.slice(0, startIndex + PROMPTER_MARKERS.start.length);
        const after = content.slice(endIndex);
        const updatedContent = `${before}\n${body}\n${after}`;

        await fs.writeFile(filePath, updatedContent, 'utf-8');
    }

    private async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}
