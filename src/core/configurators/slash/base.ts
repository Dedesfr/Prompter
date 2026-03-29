import { promises as fs } from 'fs';
import path from 'path';
import { SlashCommandId, TemplateManager } from '../../templates/index.js';
import { PROMPTER_MARKERS } from '../../config.js';
import { SkillMetadata } from '../../skill-discovery.js';

export interface SlashCommandTarget {
    id: SlashCommandId;
    path: string;
    kind: 'slash';
}

export interface SkillTarget {
    name: string;
    path: string;
    kind: 'skill';
}

const ALL_COMMANDS: SlashCommandId[] = ['enhance', 'prd-generator', 'prd-agent-generator', 'product-brief', 'epic-single', 'epic-generator', 'story-single', 'story-generator', 'qa-test-scenario', 'skill-creator', 'ai-humanizer', 'api-contract-generator', 'apply', 'archive', 'design-system', 'erd-generator', 'fsd-generator', 'proposal', 'tdd-generator', 'tdd-lite-generator', 'wireframe-generator', 'document-explainer'];

export abstract class SlashCommandConfigurator {
    abstract readonly toolId: string;
    abstract readonly isAvailable: boolean;

    getTargets(filterIds?: SlashCommandId[]): SlashCommandTarget[] {
        // If filterIds is undefined, generate all commands
        // If filterIds is an empty array, generate nothing
        // If filterIds has items, generate only those
        const commandsToGenerate = filterIds === undefined
            ? ALL_COMMANDS
            : ALL_COMMANDS.filter(id => filterIds.includes(id));

        return commandsToGenerate.map((id) => ({
            id,
            path: this.getRelativePath(id),
            kind: 'slash'
        }));
    }

    async generateAll(projectPath: string, filterIds?: SlashCommandId[]): Promise<string[]> {
        const createdOrUpdated: string[] = [];

        for (const target of this.getTargets(filterIds)) {
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

    /**
     * Returns the relative directory path where the skill's full directory
     * will be placed inside the tool's config dir.
     * e.g. `.claude/skills/laravel-code-review`
     */
    protected abstract getSkillTargetDir(skillName: string): string;

    protected getBody(id: SlashCommandId): string {
        return TemplateManager.getSlashCommandBody(id).trim();
    }

    // --- Skill directory management ---

    getSkillTargets(skills: SkillMetadata[]): SkillTarget[] {
        return skills.map(skill => ({
            name: skill.name,
            path: this.getSkillTargetDir(skill.name),
            kind: 'skill'
        }));
    }

    async generateSkills(projectPath: string, skills: SkillMetadata[]): Promise<string[]> {
        const created: string[] = [];

        for (const skill of skills) {
            const targetDir = path.join(projectPath, this.getSkillTargetDir(skill.name));
            await this.copyDir(skill.sourcePath, targetDir);
            created.push(this.getSkillTargetDir(skill.name));
        }

        return created;
    }

    async updateExistingSkills(projectPath: string, skills: SkillMetadata[]): Promise<string[]> {
        const updated: string[] = [];

        for (const skill of skills) {
            const relativeDir = this.getSkillTargetDir(skill.name);
            const targetDir = path.join(projectPath, relativeDir);

            if (await this.dirExists(targetDir)) {
                await this.copyDir(skill.sourcePath, targetDir);
                updated.push(relativeDir);
            }
        }

        return updated;
    }

    async removeSkillFiles(projectPath: string, skillNames: string[]): Promise<string[]> {
        const removed: string[] = [];

        for (const name of skillNames) {
            const relativeDir = this.getSkillTargetDir(name);
            const targetDir = path.join(projectPath, relativeDir);

            if (await this.dirExists(targetDir)) {
                await fs.rm(targetDir, { recursive: true, force: true });
                removed.push(relativeDir);
            }
        }

        return removed;
    }

    private async copyDir(src: string, dest: string): Promise<void> {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await this.copyDir(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
    }

    private async dirExists(dirPath: string): Promise<boolean> {
        try {
            const stat = await fs.stat(dirPath);
            return stat.isDirectory();
        } catch {
            return false;
        }
    }

    // --- Shared helpers ---

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
