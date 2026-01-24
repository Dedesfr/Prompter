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

export interface PromptChoice {
    name: string;
    value: string;
    description: string;
    sourceFile: string;
}

export const SUPPORTED_TOOLS: ToolChoice[] = [
    { name: 'Antigravity', value: 'antigravity', available: true, successLabel: 'Antigravity' },
    { name: 'Claude Code', value: 'claude', available: true, successLabel: 'Claude Code' },
    { name: 'Codex', value: 'codex', available: true, successLabel: 'Codex' },
    { name: 'GitHub Copilot', value: 'github-copilot', available: true, successLabel: 'GitHub Copilot' },
    { name: 'OpenCode', value: 'opencode', available: true, successLabel: 'OpenCode' },
    { name: 'Kilo Code', value: 'kilocode', available: true, successLabel: 'Kilo Code' }
];

export const AVAILABLE_PROMPTS: PromptChoice[] = [
    {
        name: 'AI Humanizer',
        value: 'ai-humanizer',
        description: 'Transform AI-generated text into natural, human-like content',
        sourceFile: 'ai-humanizer.md'
    },
    {
        name: 'API Contract Generator',
        value: 'api-contract-generator',
        description: 'Generate OpenAPI specification from FSD and ERD',
        sourceFile: 'api-contract-generator.md'
    },
    {
        name: 'Document Explainer',
        value: 'document-explainer',
        description: 'Analyze and explain complex documents into clear, actionable insights',
        sourceFile: 'document-explainer.md'
    },
    {
        name: 'Epic (Single)',
        value: 'epic-single',
        description: 'Generate comprehensive epic documentation',
        sourceFile: 'epic-single.md'
    },
    {
        name: 'Epic Generator',
        value: 'epic-generator',
        description: 'Generate comprehensive EPICs from FSD and TDD documentation',
        sourceFile: 'epic-generator.md'
    },
    {
        name: 'ERD Generator',
        value: 'erd-generator',
        description: 'Generate Entity Relationship Diagram from FSD',
        sourceFile: 'erd-generator.md'
    },
    {
        name: 'FSD Generator',
        value: 'fsd-generator',
        description: 'Generate Functional Specification Document from PRD',
        sourceFile: 'fsd-generator.md'
    },
    {
        name: 'PRD Agent Generator',
        value: 'prd-agent-generator',
        description: 'Create AGENT.md files with Product Requirements Document prompts',
        sourceFile: 'prd-agent-generator.md'
    },
    {
        name: 'PRD Generator',
        value: 'prd-generator',
        description: 'Generate detailed Product Requirements Documents',
        sourceFile: 'prd-generator.md'
    },
    {
        name: 'Product Brief',
        value: 'product-brief',
        description: 'Create concise product brief documents',
        sourceFile: 'product-brief.md'
    },
    {
        name: 'QA Test Scenario',
        value: 'qa-test-scenario',
        description: 'Generate comprehensive test scenarios and test cases',
        sourceFile: 'qa-test-scenario.md'
    },
    {
        name: 'Skill Creator',
        value: 'skill-creator',
        description: 'Create structured skill documentation for AI agents',
        sourceFile: 'skill-creator.md'
    },
    {
        name: 'Story (Single)',
        value: 'story-single',
        description: 'Generate detailed user story documentation',
        sourceFile: 'story-single.md'
    },
    {
        name: 'Story Generator',
        value: 'story-generator',
        description: 'Generate comprehensive user stories from EPICs and FSD',
        sourceFile: 'story-generator.md'
    },
    {
        name: 'TDD Generator',
        value: 'tdd-generator',
        description: 'Generate comprehensive Technical Design Document',
        sourceFile: 'tdd-generator.md'
    },
    {
        name: 'TDD-Lite Generator',
        value: 'tdd-lite-generator',
        description: 'Generate lean Technical Design Document (TDD-Lite)',
        sourceFile: 'tdd-lite-generator.md'
    },
    {
        name: 'Wireframe Generator',
        value: 'wireframe-generator',
        description: 'Generate UI/UX wireframes from technical specs',
        sourceFile: 'wireframe-generator.md'
    }
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
