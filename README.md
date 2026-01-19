# Prompter

Enhance prompts directly in your AI coding workflow. Transform rough ideas into polished, professional-grade specifications.

## Installation

```bash
npm install -g @prompter/cli
# or
pnpm add -g @prompter/cli
```

## Quick Start

```bash
# Initialize Prompter in your project
cd my-project
prompter init

# Use the workflow in your AI assistant
/prompter-enhance Create a netflix homepage clone
```

## How It Works

1. **Initialize** - Run `prompter init` to set up workflows for your AI tools
2. **Enhance** - Use `/prompter-enhance` with a rough idea
3. **Review** - Find the enhanced spec in `prompter/<slug>/enhanced-prompt.md`
4. **Build** - Use the enhanced specification to guide implementation

## Supported AI Tools

- **Antigravity** - `.agent/workflows/prompter-enhance.md`
- **Claude Code** - `.claude/commands/prompter/enhance.md`
- **Codex** - `.codex/prompts/prompter-enhance.md`
- **GitHub Copilot** - `.github/prompts/prompter-enhance.md`
- **OpenCode** - `.opencode/prompts/prompter-enhance.md`
- **Kilo Code** - `.kilocode/workflows/prompter-enhance.md`
- **Universal** - `AGENTS.md` for any AGENTS.md-compatible tool

## Commands

```bash
prompter init              # Initialize Prompter (or re-configure tools)
prompter update            # Update workflow files to latest version
prompter list              # List all enhanced prompts
prompter list --json       # Output as JSON
```

### Re-configuring Tools

You can run `prompter init` again at any time to add, remove, or switch AI tools. See [docs/reconfigure-tools.md](docs/reconfigure-tools.md) for details.

```bash
# Add or remove tools interactively
prompter init

# Or specify tools directly
prompter init --tools github-copilot,claude
```

## Output Structure

```
prompter/
├── project.md                    # Project context (edit this!)
├── <slug>/
│   └── enhanced-prompt.md        # Enhanced specification
└── ...
```

## Configuration

Edit `prompter/project.md` to provide context about your project. This helps the AI assistant generate more relevant enhanced specifications.

## License

MIT
