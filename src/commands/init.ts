import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { checkbox } from '@inquirer/prompts';
import { PROMPTER_DIR, SUPPORTED_TOOLS, AVAILABLE_PROMPTS, PrompterConfig } from '../core/config.js';
import { projectTemplate, agentsTemplate } from '../core/templates/index.js';
import { PROMPT_TEMPLATES } from '../core/prompt-templates.js';
import { registry } from '../core/configurators/slash/index.js';
import { SlashCommandId } from '../core/templates/index.js';

interface InitOptions {
    tools?: string[];
    prompts?: string[];
    noInteractive?: boolean;
}

export class InitCommand {
    async execute(options: InitOptions = {}): Promise<void> {
        const projectPath = process.cwd();
        const isReInitialization = await PrompterConfig.prompterDirExists(projectPath);

        // Display ASCII art banner for initial setup
        if (!isReInitialization) {
            console.log(chalk.cyan(`
 ██████  ██████   ██████  ███    ███ ██████  ████████ ███████ ██████  
 ██   ██ ██   ██ ██    ██ ████  ████ ██   ██    ██    ██      ██   ██ 
 ██████  ██████  ██    ██ ██ ████ ██ ██████     ██    █████   ██████  
 ██      ██   ██ ██    ██ ██  ██  ██ ██         ██    ██      ██   ██ 
 ██      ██   ██  ██████  ██      ██ ██         ██    ███████ ██   ██ 
`));
            console.log(chalk.white.bold('Welcome to Prompter!\n'));
        }

        if (isReInitialization) {
            console.log(chalk.blue('\n🔄 Re-configuring Prompter tools...\n'));
        } else {
            console.log(chalk.blue('🚀 Initializing Prompter...\n'));
        }

        // Detect currently configured tools if re-initializing
        let currentTools: string[] = [];
        if (isReInitialization) {
            currentTools = await this.detectConfiguredTools(projectPath);
            if (currentTools.length > 0) {
                console.log(chalk.gray('Currently configured tools: ') + chalk.cyan(currentTools.map(t => {
                    const tool = SUPPORTED_TOOLS.find(st => st.value === t);
                    return tool ? tool.name : t;
                }).join(', ')));
                console.log();
            }
        }

        // Select tools
        let selectedTools: string[] = [];

        if (options.tools && options.tools.length > 0) {
            // Handle comma-separated values in a single string or array of strings
            selectedTools = options.tools.flatMap(tool => tool.split(',').map(t => t.trim()));
        } else if (!options.noInteractive) {
            try {
                const message = isReInitialization 
                    ? 'Select AI tools to configure (check/uncheck to add/remove):'
                    : 'Select AI tools to configure:';
                
                selectedTools = await checkbox({
                    message,
                    choices: SUPPORTED_TOOLS.map(tool => ({
                        name: tool.name,
                        value: tool.value,
                        checked: isReInitialization 
                            ? currentTools.includes(tool.value) 
                            : tool.value === 'antigravity' // Default check Antigravity for new init
                    }))
                });
            } catch (error) {
                // User cancelled
                console.log(chalk.yellow(isReInitialization ? '\nRe-configuration cancelled.' : '\nInitialization cancelled.'));
                return;
            }
        } else if (isReInitialization && selectedTools.length === 0) {
            // In non-interactive re-init without tools specified, keep current tools
            selectedTools = currentTools;
        }

        // Select prompts
        let selectedPrompts: string[] = [];

        if (options.prompts && options.prompts.length > 0) {
            // Handle comma-separated values in a single string or array of strings
            selectedPrompts = options.prompts.flatMap(prompt => prompt.split(',').map(p => p.trim()));
        } else if (!options.noInteractive) {
            try {
                // Detect currently installed prompts (use path.join to get prompter path)
                const prompterPathForDetection = path.join(projectPath, PROMPTER_DIR);
                const currentPrompts = await this.detectInstalledPrompts(prompterPathForDetection);
                
                selectedPrompts = await checkbox({
                    message: 'Select prompt templates to install:',
                    choices: AVAILABLE_PROMPTS.map(prompt => ({
                        name: `${prompt.name} - ${chalk.gray(prompt.description)}`,
                        value: prompt.value,
                        checked: currentPrompts.includes(prompt.value)
                    })),
                    pageSize: 15
                });
            } catch (error) {
                // User cancelled
                console.log(chalk.yellow(isReInitialization ? '\nRe-configuration cancelled.' : '\nInitialization cancelled.'));
                return;
            }
        }

        // Create or ensure prompter directory
        const prompterPath = await PrompterConfig.ensurePrompterDir(projectPath);
        if (!isReInitialization) {
            console.log(chalk.green('✓') + ` Created ${chalk.cyan(PROMPTER_DIR + '/')}`);
        }

        // Create project.md if not exists
        const projectMdPath = path.join(prompterPath, 'project.md');
        const projectMdExists = await this.fileExists(projectMdPath);
        if (!projectMdExists) {
            try {
                if (!projectTemplate) {
                    throw new Error('project.md template is undefined');
                }
                await fs.writeFile(projectMdPath, projectTemplate, 'utf-8');
                console.log(chalk.green('✓') + ` Created ${chalk.cyan(PROMPTER_DIR + '/project.md')}`);
            } catch (error) {
                console.error(chalk.red('✗') + ` Failed to create project.md: ${error}`);
            }
        } else if (isReInitialization) {
            console.log(chalk.gray('  project.md already exists, keeping it'));
        }

        // Create AGENTS.md for universal support
        const agentsMdPath = path.join(prompterPath, 'AGENTS.md');
        const agentsExists = await this.fileExists(agentsMdPath);
        if (!agentsExists) {
            try {
                if (!agentsTemplate) {
                    throw new Error('AGENTS.md template is undefined');
                }
                await fs.writeFile(agentsMdPath, agentsTemplate, 'utf-8');
                console.log(chalk.green('✓') + ` Created ${chalk.cyan(PROMPTER_DIR + '/AGENTS.md')}`);
            } catch (error) {
                console.error(chalk.red('✗') + ` Failed to create AGENTS.md: ${error}`);
            }
        } else {
            console.log(chalk.gray('  AGENTS.md already exists, skipping'));
        }

        // Handle tool changes
        const toolsToAdd = selectedTools.filter(t => !currentTools.includes(t));
        const toolsToRemove = currentTools.filter(t => !selectedTools.includes(t));
        const toolsToKeep = selectedTools.filter(t => currentTools.includes(t));

        // Handle prompt changes
        const prompterPathForDetection = path.join(projectPath, PROMPTER_DIR);
        const currentPrompts = await this.detectInstalledPrompts(prompterPathForDetection);
        const promptsToAdd = selectedPrompts.filter(p => !currentPrompts.includes(p));
        const promptsToRemove = currentPrompts.filter(p => !selectedPrompts.includes(p));
        const promptsToKeep = selectedPrompts.filter(p => currentPrompts.includes(p));

        // Remove old tool files
        if (toolsToRemove.length > 0) {
            console.log(chalk.blue('\n🗑️  Removing workflow files...\n'));
            for (const toolId of toolsToRemove) {
                const configurator = registry.get(toolId);
                if (configurator) {
                    try {
                        const files = await this.removeToolFiles(projectPath, configurator);
                        for (const file of files) {
                            console.log(chalk.yellow('✓') + ` Removed ${chalk.cyan(file)}`);
                        }
                    } catch (error) {
                        console.log(chalk.red('✗') + ` Failed to remove files for ${toolId}: ${error}`);
                    }
                }
            }
        }

        // Remove unchecked prompts
        if (promptsToRemove.length > 0) {
            console.log(chalk.blue('\n🗑️  Removing prompt templates...\n'));
            
            // Remove from prompter/ folder
            const removedPrompts = await this.removePrompts(prompterPath, promptsToRemove);
            for (const promptName of removedPrompts) {
                console.log(chalk.yellow('✓') + ` Removed ${chalk.cyan(promptName)}`);
            }
            
            // Remove workflow files from all configured tools
            await this.removeWorkflowFilesForPrompts(projectPath, currentTools, promptsToRemove);
        }

        // Generate workflow files for new tools
        if (toolsToAdd.length > 0) {
            console.log(chalk.blue('\n📝 Creating workflow files...\n'));

            // Convert selected prompt values to SlashCommandIds
            const slashCommandIds: SlashCommandId[] = selectedPrompts as SlashCommandId[];

            for (const toolId of toolsToAdd) {
                const configurator = registry.get(toolId);
                if (configurator) {
                    try {
                        // Pass selected prompts to only generate those workflow files
                        // Pass empty array if no prompts selected to generate nothing
                        const files = await configurator.generateAll(projectPath, slashCommandIds);
                        for (const file of files) {
                            console.log(chalk.green('✓') + ` Created ${chalk.cyan(file)}`);
                        }
                    } catch (error) {
                        console.log(chalk.red('✗') + ` Failed to create files for ${toolId}: ${error}`);
                    }
                }
            }
        }

        // Add missing workflow files for existing tools
        if (isReInitialization && toolsToKeep.length > 0) {
            const missingFiles: string[] = [];
            
            // Convert selected prompt values to SlashCommandIds
            const slashCommandIds: SlashCommandId[] = selectedPrompts as SlashCommandId[];
            
            for (const toolId of toolsToKeep) {
                const configurator = registry.get(toolId);
                if (configurator) {
                    try {
                        // Pass selected prompts to only generate those workflow files
                        // Pass empty array if no prompts selected to generate nothing
                        const files = await configurator.generateAll(projectPath, slashCommandIds);
                        for (const file of files) {
                            missingFiles.push(file);
                        }
                    } catch (error) {
                        // Ignore errors for kept tools
                    }
                }
            }
            
            if (missingFiles.length > 0) {
                console.log(chalk.blue('\n📝 Adding missing workflow files...\n'));
                for (const file of missingFiles) {
                    console.log(chalk.green('✓') + ` Created ${chalk.cyan(file)}`);
                }
            }
        }

        // Show kept tools
        if (isReInitialization && toolsToKeep.length > 0 && (toolsToAdd.length > 0 || toolsToRemove.length > 0)) {
            console.log(chalk.blue('\n✨ Keeping existing tools:\n'));
            for (const toolId of toolsToKeep) {
                const tool = SUPPORTED_TOOLS.find(t => t.value === toolId);
                if (tool) {
                    console.log(chalk.gray('  • ') + chalk.cyan(tool.name));
                }
            }
        }

        // Install new prompts
        if (promptsToAdd.length > 0) {
            console.log(chalk.blue('\n📋 Installing prompt templates...\n'));
            const installedPrompts = await this.installPrompts(projectPath, prompterPath, promptsToAdd);
            for (const promptName of installedPrompts) {
                console.log(chalk.green('✓') + ` Installed ${chalk.cyan(promptName)}`);
            }
        }

        // Update existing prompts in prompter/core/
        if (isReInitialization && promptsToKeep.length > 0) {
            console.log(chalk.blue('\n🔄 Updating existing prompt templates...\n'));
            const updatedPrompts = await this.installPrompts(projectPath, prompterPath, promptsToKeep);
            for (const promptName of updatedPrompts) {
                console.log(chalk.green('✓') + ` Updated ${chalk.cyan(promptName)}`);
            }
        }

        // Success message
        if (isReInitialization) {
            console.log(chalk.green('\n✅ Prompter tools updated successfully!\n'));
            if (toolsToAdd.length > 0 || toolsToRemove.length > 0 || promptsToAdd.length > 0 || promptsToRemove.length > 0) {
                console.log(chalk.blue('Summary:'));
                if (toolsToAdd.length > 0) {
                    console.log(chalk.green('  Tools Added: ') + toolsToAdd.map(t => {
                        const tool = SUPPORTED_TOOLS.find(st => st.value === t);
                        return tool ? tool.name : t;
                    }).join(', '));
                }
                if (toolsToRemove.length > 0) {
                    console.log(chalk.yellow('  Tools Removed: ') + toolsToRemove.map(t => {
                        const tool = SUPPORTED_TOOLS.find(st => st.value === t);
                        return tool ? tool.name : t;
                    }).join(', '));
                }
                if (promptsToAdd.length > 0) {
                    console.log(chalk.green('  Prompts Added: ') + promptsToAdd.map(p => {
                        const prompt = AVAILABLE_PROMPTS.find(ap => ap.value === p);
                        return prompt ? prompt.name : p;
                    }).join(', '));
                }
                if (promptsToRemove.length > 0) {
                    console.log(chalk.yellow('  Prompts Removed: ') + promptsToRemove.map(p => {
                        const prompt = AVAILABLE_PROMPTS.find(ap => ap.value === p);
                        return prompt ? prompt.name : p;
                    }).join(', '));
                }
                console.log();
            } else {
                console.log(chalk.gray('  No changes made.\n'));
            }
        } else {
            console.log(chalk.green('\n✅ Prompter initialized successfully!\n'));
            if (promptsToAdd.length > 0) {
                console.log(chalk.gray(`Installed ${promptsToAdd.length} prompt template(s).\n`));
            }
            console.log(chalk.gray('Run `prompter guide` for next steps.\n'));
        }
    }

    private async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    private async detectConfiguredTools(projectPath: string): Promise<string[]> {
        const configuredTools: string[] = [];
        const allConfigurators = registry.getAll();

        for (const configurator of allConfigurators) {
            const targets = configurator.getTargets();
            let hasFiles = false;

            for (const target of targets) {
                const filePath = path.join(projectPath, target.path);
                if (await this.fileExists(filePath)) {
                    hasFiles = true;
                    break;
                }
            }

            if (hasFiles) {
                configuredTools.push(configurator.toolId);
            }
        }

        return configuredTools;
    }

    private async removeToolFiles(projectPath: string, configurator: any): Promise<string[]> {
        const removedFiles: string[] = [];
        const targets = configurator.getTargets();

        for (const target of targets) {
            const filePath = path.join(projectPath, target.path);
            if (await this.fileExists(filePath)) {
                await fs.unlink(filePath);
                removedFiles.push(target.path);

                // Remove empty parent directories
                await this.removeEmptyDirs(path.dirname(filePath), projectPath);
            }
        }

        return removedFiles;
    }

    private async removeEmptyDirs(dirPath: string, projectPath: string): Promise<void> {
        // Don't remove the project directory itself
        if (dirPath === projectPath || dirPath === path.dirname(projectPath)) {
            return;
        }

        try {
            const files = await fs.readdir(dirPath);
            if (files.length === 0) {
                await fs.rmdir(dirPath);
                // Recursively check parent
                await this.removeEmptyDirs(path.dirname(dirPath), projectPath);
            }
        } catch {
            // Directory doesn't exist or can't be removed, ignore
        }
    }

    private async detectInstalledPrompts(prompterPath: string): Promise<string[]> {
        const installedPrompts: string[] = [];
        const corePath = path.join(prompterPath, 'core');
        
        for (const prompt of AVAILABLE_PROMPTS) {
            const promptFilePath = path.join(corePath, prompt.sourceFile);
            if (await this.fileExists(promptFilePath)) {
                installedPrompts.push(prompt.value);
            }
        }
        
        return installedPrompts;
    }

    private async installPrompts(projectPath: string, prompterPath: string, selectedPrompts: string[]): Promise<string[]> {
        const installedPrompts: string[] = [];
        const corePath = path.join(prompterPath, 'core');
        
        // Ensure core directory exists
        await fs.mkdir(corePath, { recursive: true });
        
        for (const promptId of selectedPrompts) {
            const prompt = AVAILABLE_PROMPTS.find(p => p.value === promptId);
            if (!prompt) continue;
            
            const destPath = path.join(corePath, prompt.sourceFile);
            
            try {
                // Get template content from embedded templates
                const content = PROMPT_TEMPLATES[promptId];
                
                if (!content) {
                    console.log(chalk.yellow(`  Warning: Template not found for ${prompt.name}`));
                    continue;
                }
                
                // Write the prompt file from embedded template (overwrites if exists)
                await fs.writeFile(destPath, content, 'utf-8');
                installedPrompts.push(prompt.name);
            } catch (error) {
                console.log(chalk.red(`  Error installing ${prompt.name}: ${error}`));
            }
        }
        
        return installedPrompts;
    }

    private async removePrompts(prompterPath: string, promptsToRemove: string[]): Promise<string[]> {
        const removedPrompts: string[] = [];
        const corePath = path.join(prompterPath, 'core');
        
        for (const promptId of promptsToRemove) {
            const prompt = AVAILABLE_PROMPTS.find(p => p.value === promptId);
            if (!prompt) continue;
            
            const filePath = path.join(corePath, prompt.sourceFile);
            
            try {
                if (await this.fileExists(filePath)) {
                    await fs.unlink(filePath);
                    removedPrompts.push(prompt.name);
                }
            } catch (error) {
                console.log(chalk.red(`  Error removing ${prompt.name}: ${error}`));
            }
        }
        
        return removedPrompts;
    }

    private async removeWorkflowFilesForPrompts(projectPath: string, toolIds: string[], promptIds: string[]): Promise<void> {
        const slashCommandIds: SlashCommandId[] = promptIds as SlashCommandId[];
        
        for (const toolId of toolIds) {
            const configurator = registry.get(toolId);
            if (!configurator) continue;
            
            // Get targets for the prompts to remove
            const targets = configurator.getTargets(slashCommandIds);
            
            for (const target of targets) {
                const filePath = path.join(projectPath, target.path);
                
                try {
                    if (await this.fileExists(filePath)) {
                        await fs.unlink(filePath);
                        console.log(chalk.yellow('✓') + ` Removed ${chalk.cyan(target.path)}`);
                        
                        // Remove empty parent directories
                        await this.removeEmptyDirs(path.dirname(filePath), projectPath);
                    }
                } catch (error) {
                    // Silently ignore errors for workflow file removal
                }
            }
        }
    }
}
