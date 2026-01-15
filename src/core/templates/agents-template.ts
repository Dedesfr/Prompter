export const agentsTemplate = `# Prompter Workflow

This project uses Prompter to enhance rough prompts into professional specifications.

## Available Commands

- \`/prompter-enhance\` - Transform a rough idea into a comprehensive specification

## How It Works

1. Invoke \`/prompter-enhance\` with your rough idea (e.g., "Create a todo app")
2. The AI will enhance your prompt into a detailed specification
3. The enhanced specification is saved to \`prompter/<slug>/enhanced-prompt.md\`
4. Use the enhanced specification to guide implementation

## Output Location

Enhanced prompts are saved in the \`prompter/\` directory:

\`\`\`
prompter/
├── project.md              # Project context (edit this!)
├── todo-app/
│   └── enhanced-prompt.md  # Enhanced specification
└── ...
\`\`\`

## Tips

- Edit \`prompter/project.md\` to provide context about your project
- Be specific in your initial prompt for better results
- Review and refine the enhanced specification before implementing
`;
