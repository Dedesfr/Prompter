# CHANGELOG

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
