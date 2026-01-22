# CHANGELOG

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
