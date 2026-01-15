import { SlashCommandConfigurator } from './base.js';
import { AntigravityConfigurator } from './antigravity.js';
import { ClaudeConfigurator } from './claude.js';
import { CodexConfigurator } from './codex.js';
import { GithubCopilotConfigurator } from './github-copilot.js';
import { OpenCodeConfigurator } from './opencode.js';
import { KiloCodeConfigurator } from './kilocode.js';

export class ConfiguratorRegistry {
    private configurators: Map<string, SlashCommandConfigurator> = new Map();

    constructor() {
        const antigravity = new AntigravityConfigurator();
        const claude = new ClaudeConfigurator();
        const codex = new CodexConfigurator();
        const githubCopilot = new GithubCopilotConfigurator();
        const opencode = new OpenCodeConfigurator();
        const kilocode = new KiloCodeConfigurator();

        this.configurators.set(antigravity.toolId, antigravity);
        this.configurators.set(claude.toolId, claude);
        this.configurators.set(codex.toolId, codex);
        this.configurators.set(githubCopilot.toolId, githubCopilot);
        this.configurators.set(opencode.toolId, opencode);
        this.configurators.set(kilocode.toolId, kilocode);
    }

    get(toolId: string): SlashCommandConfigurator | undefined {
        return this.configurators.get(toolId);
    }

    getAll(): SlashCommandConfigurator[] {
        return Array.from(this.configurators.values());
    }

    getAvailable(): SlashCommandConfigurator[] {
        return this.getAll().filter(c => c.isAvailable);
    }

    getToolIds(): string[] {
        return Array.from(this.configurators.keys());
    }
}

export const registry = new ConfiguratorRegistry();
