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

### Available Workflows

Prompter includes multiple workflow templates for different documentation needs:

#### `/prompter-enhance` - Prompt Enhancement
Transform rough ideas into clear, actionable specifications.
```bash
/prompter-enhance Build a user dashboard with analytics
```
Output: `prompter/<slug>/enhanced-prompt.md`

#### `/prd-generator` - Product Requirements Document
Generate comprehensive PRDs with objectives, user stories, and success metrics.
```bash
/prd-generator Feature: User authentication system
```
Output: `prompter/<slug>/prd.md`

#### `/epic-single` - Jira Epic Generation
Create well-structured Jira Epics from high-level requirements.
```bash
/epic-single Payment processing system for e-commerce
```
Output: `prompter/<slug>/epic.md`

#### `/story-single` - User Story Generation
Convert requirements or QA findings into actionable user stories.
```bash
/story-single Users need to reset their password via email
```
Output: `prompter/<slug>/story.md`

#### `/qa-test-scenario` - QA Test Scenarios
Generate focused test scenarios from PRDs or requirements.
```bash
/qa-test-scenario [paste your PRD content]
```
Output: `prompter/<slug>/qa-test-scenarios.md`

## Supported AI Tools

Each tool gets workflow files for all commands (`/prompter-enhance`, `/prd-generator`, `/epic-single`, `/story-single`, `/qa-test-scenario`):

- **Antigravity** - `.agent/workflows/*.md`
- **Claude Code** - `.claude/commands/prompter/*.md`
- **Codex** - `.codex/prompts/*.md`
- **GitHub Copilot** - `.github/prompts/*.md`
- **OpenCode** - `.opencode/prompts/*.md`
- **Kilo Code** - `.kilocode/workflows/*.md`
- **Universal** - `AGENTS.md` for any AGENTS.md-compatible tool

## Commands

```bash
prompter init              # Initialize Prompter (or re-configure tools)
prompter update            # Update workflow files to latest version
prompter list              # List all enhanced prompts
prompter list --json       # Output as JSON
prompter prd-generator     # Generate PRD workflow files for configured tools
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
│   ├── enhanced-prompt.md        # Enhanced specification
│   ├── prd.md                    # Product Requirements Document
│   ├── epic.md                   # Jira Epic
│   ├── story.md                  # Jira User Story
│   └── qa-test-scenarios.md      # QA Test Scenarios
└── ...
```

## Configuration

Edit `prompter/project.md` to provide context about your project. This helps the AI assistant generate more relevant enhanced specifications.

## License

MIT
