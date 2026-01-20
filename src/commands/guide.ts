import chalk from 'chalk';

export class GuideCommand {
    async execute(): Promise<void> {
        console.log(chalk.blue('\nGuides:'));
        console.log(chalk.gray('  1. Provide a detailed and filled-out version of the "prompter/project.md"'));
        console.log(chalk.gray('     document based on the project\'s specifics, including a clear description'));
        console.log(chalk.gray('     of the project, its purpose, the technologies used (tech stack), and any'));
        console.log(chalk.gray('     conventions or standards being followed.'));
    }
}
