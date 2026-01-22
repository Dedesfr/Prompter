import { SlashCommandConfigurator } from './base.js';
import { SlashCommandId } from '../../templates/index.js';

const FILE_PATHS: Record<SlashCommandId, string> = {
    enhance: '.claude/commands/prompter/enhance.md',
    'prd-generator': '.claude/commands/prompter/prd-generator.md',
    'prd-agent-generator': '.claude/commands/prompter/prd-agent-generator.md',
    'product-brief': '.claude/commands/prompter/product-brief.md',
    'epic-single': '.claude/commands/prompter/epic-single.md',
    'story-single': '.claude/commands/prompter/story-single.md',
    'qa-test-scenario': '.claude/commands/prompter/qa-test-scenario.md',
    'skill-creator': '.claude/commands/prompter/skill-creator.md',
    'ai-humanizer': '.claude/commands/prompter/ai-humanizer.md'
};

const DESCRIPTIONS: Record<SlashCommandId, string> = {
    enhance: 'Enhance a rough prompt into a professional specification',
    'prd-generator': 'Generate a comprehensive Product Requirements Document (PRD)',
    'prd-agent-generator': 'Generate a PRD with autonomous assumptions (non-interactive mode)',
    'product-brief': 'Generate an executive-level product brief (1-page summary)',
    'epic-single': 'Generate a single well-defined Jira Epic',
    'story-single': 'Generate a single Jira User Story from requirements',
    'qa-test-scenario': 'Generate focused QA test scenarios from PRD',
    'skill-creator': 'Create a modular skill package that extends AI agent capabilities',
    'ai-humanizer': 'Humanize and proofread AI-generated content for natural, publication-ready output'
};

export class ClaudeConfigurator extends SlashCommandConfigurator {
    readonly toolId = 'claude';
    readonly isAvailable = true;

    protected getRelativePath(id: SlashCommandId): string {
        return FILE_PATHS[id];
    }

    protected getFrontmatter(id: SlashCommandId): string | undefined {
        // Claude Code uses the filename as the command name
        return undefined;
    }
}
