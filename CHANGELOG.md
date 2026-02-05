# CHANGELOG

## [0.7.3] - 2026-02-06

### ✨ Added
- Added `prompter archive` command to archive completed projects
  - 
## [0.7.2] - 2026-02-06

### 🔄 Changed
- Remove `prompter update` command from agents-template documentation
  - Prevents confusion since `prompter update` is no longer a valid command
  - Updated AGENTS.md template to reflect current command set

## [0.7.1] - 2026-02-06

### 🔧 Fixed
- **AGENTS.md Creation**: Fixed AGENTS.md not being created during first-time initialization
  - Added proper error handling for both project.md and AGENTS.md creation
  - Fixed AGENTS.md path to be created inside `prompter/` directory instead of root
  - Added template validation to prevent undefined template errors
  - Clear error messages now displayed if file creation fails

## [0.7.0] - 2026-02-06

### ✨ Added
- Added Proposal, Apply, and Archive commands and workflows
  
## [0.6.15] - 2026-01-29

### ✨ Added
- **Guide Command Enhancement**: Added complexity-based workflow paths to `prompter guide`
  - Small complexity: Brief → FSD → Design System → Stories
  - Medium complexity: Brief → PRD → FSD → UI → Design System → Stories
  - High complexity: Brief → PRD → FSD → ERD → API → UI → Design System → TDD → Epics → Stories
  - Provides quick reference for document generation based on project complexity
  - Integrated into existing guide output after workflow dependencies section

## [0.6.14] - 2026-01-26

### 🔧 Fixed
- **Design System Installation Issue**: Fixed design-system not being installed during `prompter init`
  - Added 'design-system' to ALL_COMMANDS array in base configurator
  - Added 'design-system' to PROMPT_TEMPLATES mapping
  - Now correctly generates workflow files for all configured AI tools
  - Now correctly installs design-system.md to prompter/core/ directory

## [0.6.13] - 2026-01-26

### ✨ Added
- **Guide Command Enhancement**: Enhanced `prompter guide` with document workflow dependencies
  - Added comprehensive workflow dependency table
  - Shows recommended order for generating all document types
  - Clear visualization of document generation pipeline

### 🔄 Changed
- **Guide Command Output**: Expanded guide with workflow reference table
  - 10 document types with their dependencies listed
  - Strictly Required Inputs column showing must-have dependencies
  - Recommended Extra Inputs column showing optional enhancements
  - Special notation for new vs. existing projects
  - Legend explaining table notation and abbreviations
  - ASCII table format with proper alignment for terminal display

### 📚 Documentation
- Added workflow dependencies documentation within CLI help
- Integrated dependency documentation into `prompter guide` command
- Documents include:
  - Product Brief, PRD, FSD, ERD
  - API Contract, UI Wireframes, Design System
  - TDD, Epics, Stories
  - Clear dependency relationships between all document types

## [0.6.12] - 2026-01-26

### ✨ Added
- **Design System Command**: New workflow command for design system documentation
  - `prompter design-system`: Generate Design System workflow files
  - Create comprehensive design system documentation for components and tokens
  - Support for all 6 AI tools (Antigravity, Claude Code, Codex, GitHub Copilot, OpenCode, Kilo Code)
- **Design System Template**: New embedded prompt template for design documentation
  - Complete workflow for generating component documentation
  - Support for components, design tokens, and patterns
  - Includes anatomy, variants, props/API, states, accessibility, and code examples
  - Quality standards and best practices guidance
- **Design System Integration**: Full integration into Prompter ecosystem
  - Available in `prompter init --prompts design-system`
  - Selectable in interactive `prompter init` mode
  - Workflow files generated for all configured AI tools
  - Tool-specific file paths configured for each AI tool

### 🔄 Changed
- **Updated CLI Commands**: Added design-system to help documentation
  - Listed in `prompter --help` output
  - Included in `prompter init` available prompts
- **Updated All Configurators**: Extended file paths and descriptions
  - Antigravity: `.agent/workflows/design-system.md`
  - Claude Code: `.claude/commands/prompter/design-system.md`
  - Codex: `.codex/prompts/design-system.md`
  - GitHub Copilot: `.github/prompts/design-system.prompt.md`
  - OpenCode: `.opencode/command/design-system.md`
  - Kilo Code: `.kilocode/workflows/design-system.md`

## [0.6.11] - 2026-01-25

### 🔄 Changed
- **Story Generator Role Classification**: Stories now categorized by implementation role
  - New role types: **Frontend**, **Backend**, **Others**
  - Role classification step added to story generation process
  - Unclear stories default to "Others" category
- **Story Organization by Role**: Stories organized into role-based folders
  - Directory structure: `stories/EPIC-[id]/[Role]/STORY-[id]-[title].md`
  - Frontend, Backend, and Others folders created per Epic
  - Enables better team assignment and parallel work
- **Story Template Enhancement**: Updated story file template
  - Added **Role** field to story metadata
  - Role classification visible in individual story files
- **Story Index by Role**: README files now group stories by role
  - Separate story index tables for Frontend, Backend, and Others
  - Story point estimates broken down by role
  - Clearer work assignment and team allocation

## [0.6.10] - 2026-01-25

### 🔧 Fixed
- **Init Command**: Now updates existing prompt files in `prompter/core/` during re-initialization
  - Re-running `prompter init` now refreshes kept prompts to latest version
  - Adds new prompts while updating existing ones in `prompter/core/`
- **Update Command**: Fixed to only update existing files instead of creating all available commands
  - No longer creates all available commands when updating
  - Only updates existing workflow files in AI tool directories
  - Now also updates existing prompt files in `prompter/core/` directory
  - Behavior matches the original intent: update only what exists, don't create new

## [0.6.9] - 2026-01-25

### 🔄 Changed
- **Epic Generator Output Structure**: Refactored to generate organized directory structure
  - Now creates `epics/README.md` with executive summary, EPIC index, dependency map, and traceability matrix
  - Individual EPICs as separate files: `EPIC-[XXX]-[kebab-case-title].md`
  - Each EPIC file includes complete details with Related EPICs section
  - Better organization for version control and individual reference
- **Story Generator Output Structure**: Refactored to generate organized directory structure
  - Now creates `stories/EPIC-[XXX]-[title]/` folders for each Epic
  - Each Epic folder contains `README.md` with story index, dependency map, and estimate totals
  - Individual stories as separate files: `STORY-[XXX]-[kebab-case-title].md`
  - Each story file includes Definition of Done checklist
  - Stories grouped by Epic for easier sprint planning and navigation

## [0.6.5] - 2026-01-24

### 🔄 Changed
- **Streamlined CLI Commands**: Removed all generator commands from core CLI
  - Kept only essential commands: `init`, `update`, `list`, `guide`, `upgrade`
  - Generator workflows (epic-generator, story-generator, api-contract-generator, erd-generator, fsd-generator, tdd-generator, tdd-lite-generator, wireframe-generator, document-explainer) are still available via AI tool slash commands
  - Cleaner, more focused CLI interface
  - Reduced command clutter while maintaining full workflow functionality

## [0.6.4] - 2026-01-24

### ✨ Added
- **Epic Generator & Story Generator**: New workflow generators for agile planning
  - `epic-generator`: Generate comprehensive EPICs from FSD and TDD documentation
  - `story-generator`: Generate user stories from EPICs and FSD
  - Both include full embedded prompt templates with quality standards and verification checklists

## [0.6.3] - 2026-01-24

### 🔄 Changed
- **OpenCode Format**: Added `agent: build` to the frontmatter of OpenCode workflow files
  - Ensures compatibility with OpenCode's agent execution mode

## [0.6.2] - 2026-01-24

### ✨ Added
- **New Document Explainer Command**: Added `document-explainer` command to generate workflow files for document analysis
  - Extracts value, identifies issues, and facilitates productive discussion about improvements
  - Provides section-by-section breakdown in plain language
  - Identifies gaps, redundancies, and structural improvement opportunities
- **Embedded Document Explainer Template**: New comprehensive prompt template for document analysis
  - Complete workflow support for all supported AI tools
  - Structured output including executive summary, key takeaways, and improvement suggestions
- **Init Command Enhancement**: Added `document-explainer` to prompt installation options
  - Selectable in interactive `prompter init` mode
  - Supported via `--prompts` flag

## [0.6.1] - 2026-01-23

### ✨ Added
- **New Generator Commands**: Added 6 new workflow generator commands for complete software development lifecycle
  - `api-contract-generator`: Generate OpenAPI specification from FSD and ERD
  - `erd-generator`: Generate Entity Relationship Diagram from FSD
  - `fsd-generator`: Generate Functional Specification Document from PRD
  - `tdd-generator`: Generate comprehensive Technical Design Document
  - `tdd-lite-generator`: Generate lean Technical Design Document (TDD-Lite)
  - `wireframe-generator`: Generate UI/UX wireframes from technical specs
- **Embedded Templates**: All 6 new generators include full embedded prompt templates
  - Complete workflow support for all AI tools
  - Comprehensive prompts for technical documentation generation
  - End-to-end software development workflow coverage
- **Init Command Enhancement**: Updated `prompter init` to include all new prompts
  - New prompts available in interactive selection
  - Added to `--prompts` flag options
  - Alphabetically organized prompt list

### 🔄 Changed
- **Tool Configurators**: Updated all AI tool configurators with new command paths
  - GitHub Copilot: `.github/prompts/[command].prompt.md`
  - Antigravity: `.agent/workflows/[command].md`
  - Claude Code: `.claude/commands/prompter/[command].md`
  - Codex: `.codex/prompts/[command].md`
  - OpenCode: `.opencode/prompts/[command].md`
  - Kilo Code: `.kilocode/workflows/[command].md`

### 🔧 Technical
- Extended `SlashCommandId` type with 6 new command identifiers
- Added command bodies to `slashCommandBodies` registry
- Updated `ALL_COMMANDS` array in base configurator
- Enhanced `AVAILABLE_PROMPTS` with new generator descriptions

## [0.6.0] - 2026-01-22

### ✨ Added
- **Core Folder Organization**: Prompt templates now organized in `prompter/core/` subfolder
  - Cleaner separation between project configuration and prompt templates
  - `prompter/project.md` remains at root level
  - All prompt templates stored in `prompter/core/` directory

### 🐛 Fixed
- **Embedded Prompt Templates**: All prompt templates now embedded in package
  - No longer depends on external prompt files
  - Works correctly in any project directory
  - Templates always available after global installation
- **Selective Workflow Generation**: Only selected prompts are generated
  - Previously generated all workflows regardless of selection
  - Now respects user selection in both interactive and CLI modes
  - Applies to all supported AI tools (GitHub Copilot, Antigravity, Claude Code, Codex, OpenCode, Kilo Code)
- **Workflow File Removal**: Prompt removal now works across all directories
  - Removes workflow files from AI tool directories (.github/prompts/, .agent/workflows/, etc.)
  - Previously only removed from prompter directory
  - Proper cleanup of empty directories
- **Empty Selection Handling**: Unchecking all prompts now generates nothing
  - Previously generated all prompts when none selected
  - Now correctly interprets empty selection as no prompts wanted

### 🔄 Changed
- **Prompt Directory Structure**: Reorganized prompter folder layout
  - Old: `prompter/*.md`
  - New: `prompter/core/*.md` for templates, `prompter/project.md` at root

## [0.5.1] - 2026-01-22

### ✨ Added
- **Upgrade Command**: New command for self-updating Prompter
  - Run `prompter upgrade` to update to the latest version
  - Automatically executes `npm install -g @dedesfr/prompter@latest`
  - Cross-platform support (Windows, macOS, Linux)
  - Clear success/error feedback
  - Fallback instructions if upgrade fails

## [0.5.0] - 2026-01-22

### ✨ Added
- **Prompt Installation & Management**: New system for installing and managing workflow prompts
  - Install prompts from templates
  - Manage existing prompt workflows
  - Centralized prompt management system

## [0.4.3] - 2026-01-22

### ✨ Added
- **PRD Agent Generator**: New command and workflow support
  - Generate PRD (Product Requirements Document) agents
  - Automated workflow creation for PRD generation
  - Integration with AI tools for PRD creation

## [0.4.2] - 2026-01-21

### ✨ Added
- **AI Humanizer**: New command and workflow support
  - Humanize AI-generated content
  - Make AI text more natural and conversational
  - Workflow integration for content improvement

## [0.4.1] - 2026-01-21

### 🔄 Changed
- **Enhanced Product Brief Template**: Comprehensive structure improvements
  - More detailed product brief sections
  - Better organization and clarity
  - Improved guidance for product documentation

## [0.4.0] - 2026-01-21

### ✨ Added
- **Product Brief Command**: New workflow support for product documentation
  - Generate product briefs using AI workflows
  - Structured product documentation templates
  - Integration with AI coding tools

## [0.3.9] - 2026-01-21

### ✨ Added
- **ASCII Art Banner**: Welcome message during initial setup
  - Visual branding during `prompter init`
  - Improved first-run experience

## [0.3.8] - 2026-01-21

### ✨ Added
- **Guide Command**: New command for documentation and help
  - Interactive guide for using Prompter
  - Documentation assistance
  - Usage examples and tips

## [0.3.7] - 2026-01-21

### ✨ Added
- **Skill Creator Command**: New workflow for creating skills
  - Generate skill definitions
  - Workflow files for skill creation
  - Integration with AI tools for skill development

## [0.3.6] - 2026-01-20

### 🔧 Technical
- CLI version synchronization with package version
- Improved version consistency across the codebase

## [0.3.5] - 2026-01-20

### 🐛 Fixed
- Updated CLI version display to match package version

## [0.3.4] - 2026-01-20

### 🔄 Changed
- Improved next steps message for `project.md` clarity
- Enhanced project template with structured sections

## [0.3.3] - 2026-01-20

### 🐛 Fixed
- **GitHub Copilot Format**: Corrected workflow file format
  - Use `.prompt.md` extension instead of `.md`
  - Add `$ARGUMENTS` placeholder after frontmatter
  - Fixed `$ARGUMENTS` position in template

## [0.3.2] - 2026-01-19

### 🐛 Fixed
- **Update Command Enhancement**: Now detects configured tools automatically
  - Adds missing workflow files during update
  - Intelligent tool detection from existing workflows

## [0.3.1] - 2026-01-19

### 🐛 Fixed
- **Re-init Support**: Ensure missing workflow files are added during re-initialization
  - Automatically detect and create missing workflows
  - Safe re-initialization without data loss

## [0.3.0] - 2026-01-19

### ✨ Added
- **New Workflows**: Added support for multiple project management workflows
  - PRD (Product Requirements Document) workflow
  - Epic workflow for large features
  - Story workflow for user stories
  - QA test scenario workflow
  - Comprehensive project planning support

## [0.2.0] - 2026-01-19

### ✨ Added
- **Re-configurable AI Tools**: `prompter init` now allows re-selection of AI tools at any time, even after initial setup
  - Add new AI tools to existing configuration
  - Remove unused AI tools
  - Switch between different AI tools seamlessly
  - Interactive checkbox interface with current tools pre-selected
  - Non-interactive mode with `--tools` flag for automation

### 🔄 Changed
- `prompter init` no longer blocks on already-initialized projects
- Tool selection now shows currently configured tools before prompting
- Success messages now context-aware (initialization vs re-configuration)
- Improved user feedback with change summaries (Added/Removed/Kept)

### 🛡️ Safety
- Enhanced prompts in `prompter/<slug>/` always preserved
- `prompter/project.md` preserved during re-configuration
- `AGENTS.md` preserved if already exists
- Automatic cleanup of empty directories when removing tools
- Cancel-safe operation (Ctrl+C) at any time

### 📚 Documentation
- Added comprehensive re-configuration guide (`docs/reconfigure-tools.md`)
- Added before/after comparison (`docs/before-after-comparison.md`)
- Added usage scenarios guide (`docs/usage-scenarios.md`)
- Added implementation summary (`docs/implementation-summary.md`)
- Updated README with re-configuration examples

### 🔧 Technical
- Added `detectConfiguredTools()` method to scan for existing workflow files
- Added `removeToolFiles()` method for clean tool removal
- Added `removeEmptyDirs()` method for automatic directory cleanup
- Improved file existence checking and preservation logic

### 🎯 Backward Compatibility
- 100% backward compatible with existing installations
- No breaking changes to command syntax or behavior
- Fresh projects work identically to previous versions
- No changes to workflow file format
- No changes to other commands (`update`, `list`)

## [0.1.0] - Previous Release
- Initial release with `init`, `update`, and `list` commands
- Support for 6 AI tools: Antigravity, Claude Code, Codex, GitHub Copilot, OpenCode, Kilo Code
- Universal support via AGENTS.md
- Workflow file generation with managed markers
