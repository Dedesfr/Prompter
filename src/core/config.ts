import { promises as fs } from 'fs';
import path from 'path';

export const PROMPTER_DIR = 'prompter';

export const PROMPTER_MARKERS = {
    start: '<!-- prompter-managed-start -->',
    end: '<!-- prompter-managed-end -->'
};

export interface ToolChoice {
    name: string;
    value: string;
    available: boolean;
    successLabel: string;
}

export const SUPPORTED_TOOLS: ToolChoice[] = [
    { name: 'Antigravity', value: 'antigravity', available: true, successLabel: 'Antigravity' },
    { name: 'Claude Code', value: 'claude', available: true, successLabel: 'Claude Code' },
    { name: 'Codex', value: 'codex', available: true, successLabel: 'Codex' },
    { name: 'GitHub Copilot', value: 'github-copilot', available: true, successLabel: 'GitHub Copilot' },
    { name: 'OpenCode', value: 'opencode', available: true, successLabel: 'OpenCode' },
    { name: 'Kilo Code', value: 'kilocode', available: true, successLabel: 'Kilo Code' }
];

export class PrompterConfig {
    static async ensurePrompterDir(projectPath: string): Promise<string> {
        const prompterPath = path.join(projectPath, PROMPTER_DIR);
        await fs.mkdir(prompterPath, { recursive: true });
        return prompterPath;
    }

    static async prompterDirExists(projectPath: string): Promise<boolean> {
        try {
            const prompterPath = path.join(projectPath, PROMPTER_DIR);
            await fs.access(prompterPath);
            return true;
        } catch {
            return false;
        }
    }
}
