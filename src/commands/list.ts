import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { PROMPTER_DIR, PrompterConfig } from '../core/config.js';

interface ListOptions {
    json?: boolean;
}

interface EnhancedPrompt {
    id: string;
    path: string;
    createdAt?: string;
}

export class ListCommand {
    async execute(options: ListOptions = {}): Promise<void> {
        const projectPath = process.cwd();

        // Check if initialized
        if (!await PrompterConfig.prompterDirExists(projectPath)) {
            if (options.json) {
                console.log(JSON.stringify({ error: 'Prompter not initialized', prompts: [] }));
            } else {
                console.log(chalk.red('❌ Prompter is not initialized in this project.'));
                console.log(chalk.gray('   Run `prompter init` first.\n'));
            }
            process.exitCode = 1;
            return;
        }

        const prompterPath = path.join(projectPath, PROMPTER_DIR);
        const prompts = await this.scanPrompts(prompterPath);

        if (options.json) {
            console.log(JSON.stringify(prompts, null, 2));
            return;
        }

        if (prompts.length === 0) {
            console.log(chalk.yellow('\n📭 No enhanced prompts found.\n'));
            console.log(chalk.gray('Use /prompter-enhance to create one.\n'));
            return;
        }

        console.log(chalk.blue(`\n📋 Enhanced Prompts (${prompts.length}):\n`));

        for (const prompt of prompts) {
            console.log(chalk.green('  •') + ` ${chalk.cyan(prompt.id)}`);
            console.log(chalk.gray(`    ${prompt.path}`));
        }

        console.log();
    }

    private async scanPrompts(prompterPath: string): Promise<EnhancedPrompt[]> {
        const prompts: EnhancedPrompt[] = [];

        try {
            const entries = await fs.readdir(prompterPath, { withFileTypes: true });

            for (const entry of entries) {
                if (!entry.isDirectory() || entry.name.startsWith('.')) continue;

                const enhancedPromptPath = path.join(prompterPath, entry.name, 'enhanced-prompt.md');

                try {
                    const stats = await fs.stat(enhancedPromptPath);
                    prompts.push({
                        id: entry.name,
                        path: path.join(PROMPTER_DIR, entry.name, 'enhanced-prompt.md'),
                        createdAt: stats.birthtime.toISOString()
                    });
                } catch {
                    // No enhanced-prompt.md in this directory, skip
                }
            }
        } catch (error) {
            // Directory doesn't exist or can't be read
        }

        return prompts.sort((a, b) => a.id.localeCompare(b.id));
    }
}
