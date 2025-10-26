# Luther Prayer Guide

A simple web application that guides users through Martin Luther's prayer method using the seven petitions of the Lord's Prayer, the Ten Commandments, and the Apostle's Creed.

## Overview

This project implements Luther's "A Simple Way to Pray" (1535) as an interactive, user-paced prayer guide. The application presents static content with two methods:

- **Lord's Prayer (7 petitions)**: Each short petition is expanded into a fuller prayer meditation
- **Ten Commandments**: Uses the four-stranded garland method (instruction, thanksgiving, confession, prayer)
- **Apostle's Creed**: Uses the four-stranded garland method (instruction, thanksgiving, confession, prayer)

## Features

- **P1 (MVP)**: Seven petitions of the Lord's Prayer with Luther's meditations
- **P2**: Ten Commandments with four-stranded garland reflections
- **P3**: Apostle's Creed with four-stranded garland reflections
- User-paced navigation (no time limits)
- Session state persistence (localStorage)
- Distraction-free, contemplative design
- Works offline after initial load
- Keyboard navigation support

## Technology Stack

- HTML5, CSS3, JavaScript (ES6+)
- No frameworks or build tools
- Vanilla JavaScript with ES6 modules
- Hosted on GitHub Pages

## Quick Start

### Development Options

#### Option 1: GitHub Codespaces (Recommended)

This repository uses the official **[javascript-node](https://github.com/devcontainers/templates/tree/main/src/javascript-node)** devcontainer template from GitHub with Python added for serving static files.

**What's included out-of-the-box:**
- ✅ Node.js 22 (LTS) with npm, yarn, and nvm
- ✅ Python 3.13 for serving static files
- ✅ Git, zsh, and Oh My Zsh pre-configured
- ✅ ESLint for JavaScript/HTML linting
- ✅ GitHub Copilot extension enabled
- ✅ Live Server extension for instant preview
- ✅ spec-kit (specify CLI) for Specification-Driven Development

**To get started:**

1. Click the "Code" button in GitHub and select "Open with Codespaces"
2. Codespaces will launch and automatically set up everything (~2-3 minutes first time)
3. Start developing immediately - no manual setup required
4. To preview the app:
   ```bash
   cd docs
   python3 -m http.server 8000
   ```
   Then open the forwarded port in Codespaces or use the Live Server extension.

#### Option 2: Local Development

1. **Prerequisites:**
   - Python 3.11+ (for spec-kit)
   - Git
   - A web browser

2. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd pray-v2
   ```

3. **Install spec-kit (optional but recommended):**
   ```bash
   pipx install git+https://github.com/github/spec-kit.git
   specify check  # Verify your development environment
   ```

4. **Start local development:**
   ```bash
   cd docs
   python3 -m http.server 8000
   ```

5. **Open `http://localhost:8000` in your browser**

## Development Workflow Integration

### Spec-Driven Development with spec-kit

This project follows [GitHub's spec-kit](https://github.com/github/spec-kit) **Specification-Driven Development (SDD)** methodology:

**What is Spec-Driven Development?**
- **Specifications become executable** - write specs first, generate code from them
- **Intent-driven development** - define the "what" before the "how"  
- **Iterative refinement** - multi-step specification → plan → tasks → implementation
- **AI-powered generation** - use AI agents (like GitHub Copilot) to generate code from specs

**How this project uses SDD:**
- Feature specifications in `specs/001-luther-prayer-guide/` directory
- Structured spec files: `spec.md`, `plan.md`, `tasks.md`, `research.md`
- Clear separation between specification (what to build) and implementation (how it's built)

#### Using Spec-Kit in This Project

The `specify` CLI provides commands for spec-driven workflows:

```bash
# Initialize a new feature specification
/speckit.specify <feature description>

# Generate implementation plan from spec
/speckit.plan <technical requirements>

# Break down plan into actionable tasks
/speckit.tasks

# Execute implementation
/speckit.implement
```

For this project's existing features, see the `specs/` directory for complete specifications.

Learn more: [Spec-Driven Development Methodology](https://github.com/github/spec-kit/blob/main/spec-driven.md)

### GitHub Copilot Integration

- **Pre-enabled in Codespaces** - AI-powered code suggestions
- **Context-aware** - understands project structure and specifications
- **Works with spec-kit** - can help implement from specifications

### Quality Assurance

- **Specification-first** - changes documented in specs before implementation
- **Automated validation** - GitHub Actions ensure spec-kit compatibility
- **Manual testing** - checklists in `specs/` directory

## Project Structure

```
docs/                    # GitHub Pages root
├── index.html          # Main entry point
├── styles.css          # All styling
├── app.js              # Navigation and state management
└── content/
    ├── petitions.js    # Seven petitions content
    ├── commandments.js # Ten Commandments content
    └── creed.js        # Apostle's Creed content
```

## Documentation

For detailed development instructions, see the [Quickstart Guide](specs/001-luther-prayer-guide/quickstart.md).

Additional documentation:
- [Feature Specification](specs/001-luther-prayer-guide/spec.md)
- [Implementation Plan](specs/001-luther-prayer-guide/plan.md)
- [Data Model](specs/001-luther-prayer-guide/data-model.md)
- [Research & Decisions](specs/001-luther-prayer-guide/research.md)

## Testing

Manual testing is used for this low-risk static content feature:

- Navigate through all petitions/commandments/creed articles
- Verify content displays correctly
- Test keyboard navigation
- Test on multiple browsers and devices
- Verify localStorage persistence

## License

Content based on Martin Luther's "A Simple Way to Pray" (1535), public domain.

## Support

For issues or questions, please open a GitHub issue.
