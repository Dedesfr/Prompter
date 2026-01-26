import chalk from 'chalk';

export class GuideCommand {
    async execute(): Promise<void> {
        console.log(chalk.blue('\nGuides:'));
        console.log(chalk.gray('  1. Provide a detailed and filled-out version of the "prompter/project.md"'));
        console.log(chalk.gray('     document based on the project\'s specifics, including a clear description'));
        console.log(chalk.gray('     of the project, its purpose, the technologies used (tech stack), and any'));
        console.log(chalk.gray('     conventions or standards being followed.'));
        
        console.log(chalk.blue('\nDocument Workflow & Dependencies:'));
        console.log(chalk.gray('  This table shows the recommended order for document generation:\n'));
        
        // Print table header
        console.log(chalk.cyan('  Document         │ Strictly Required Inputs              │ Recommended Extra Inputs'));
        console.log(chalk.cyan('  ─────────────────┼───────────────────────────────────────┼──────────────────────────────────'));
        
        // Table rows
        const rows = [
            ['Product Brief   ', '—                                    ', '—'],
            ['PRD             ', 'Product Brief                        ', '—'],
            ['FSD             ', 'PRD                                  ', 'Product Brief'],
            ['ERD             ', 'FSD                                  ', '—'],
            ['API Contract    ', 'FSD + ERD                            ', '—'],
            ['UI Wireframes   ', 'FSD + ERD + API Contract             ', '—'],
            ['Design System   ', 'UI Wireframes (new) / FSD (existing) ', 'Brand guide / existing UI'],
            ['TDD             ', 'FSD                                  ', 'ERD + API Contract + UI Wireframes + Design System'],
            ['Epics           ', 'FSD + TDD-Lite                       ', 'UI Wireframes + Design System'],
            ['Stories         ', 'Epics                                ', 'FSD + UI Wireframes + API Contract']
        ];
        
        rows.forEach(row => {
            console.log(chalk.gray(`  ${row[0]} │ ${row[1]} │ ${row[2]}`));
        });
        
        console.log(chalk.gray('\n  Legend:'));
        console.log(chalk.gray('  • Strictly Required: Must-have inputs for high-quality output'));
        console.log(chalk.gray('  • Recommended Extra: Optional inputs that improve document quality'));
        console.log(chalk.gray('  • (new) = For new projects  |  (existing) = For existing projects\n'));
    }
}
