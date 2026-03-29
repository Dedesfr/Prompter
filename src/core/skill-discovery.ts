import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface SkillMetadata {
    name: string;
    description: string;
    sourcePath: string;
    body: string;
}

/**
 * Discover skills in a directory by scanning for subdirectories containing SKILL.md files.
 * Parses YAML frontmatter (name, description) and extracts the markdown body.
 */
export async function discoverSkills(skillsDir: string): Promise<SkillMetadata[]> {
    const skills: SkillMetadata[] = [];

    let entries: import('fs').Dirent[];
    try {
        entries = await fs.readdir(skillsDir, { withFileTypes: true });
    } catch {
        return skills;
    }

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const skillDir = path.join(skillsDir, entry.name);
        const skillMdPath = path.join(skillDir, 'SKILL.md');

        try {
            const content = await fs.readFile(skillMdPath, 'utf-8');
            const parsed = parseSkillMd(content);

            if (parsed) {
                skills.push({
                    name: parsed.name,
                    description: parsed.description,
                    sourcePath: skillDir,
                    body: parsed.body
                });
            }
        } catch {
            // SKILL.md not found or unreadable, skip this directory
        }
    }

    return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function parseSkillMd(content: string): { name: string; description: string; body: string } | null {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return null;

    try {
        const meta = yaml.parse(match[1]);
        if (!meta.name || !meta.description) return null;

        return {
            name: String(meta.name),
            description: String(meta.description),
            body: match[2].trim()
        };
    } catch {
        return null;
    }
}
