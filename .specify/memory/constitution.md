<!--
Sync Impact Report - Constitution Update
=========================================
Version Change: [Initial] → 1.0.0
Change Type: MINOR (Initial ratification)
Date: 2025-10-26

Modified Principles:
- All principles defined for first time

Added Sections:
- Core Principles (5 principles)
- Quality Standards
- Governance

Templates Status:
- ✅ .specify/templates/plan-template.md - Constitution Check section aligns
- ✅ .specify/templates/spec-template.md - Success criteria align with performance/accessibility
- ✅ .specify/templates/tasks-template.md - No changes needed

Follow-up TODOs:
- None - all placeholders filled

Rationale:
This is the initial ratification of the pray-v2 constitution, establishing core
principles for a static web prayer guide application focused on simplicity,
accessibility, and progressive enhancement.
-->

# Pray-v2 Constitution

## Core Principles

### I. Simplicity First

**Every feature MUST prioritize simplicity over sophistication.**

- No frameworks or build tools - vanilla JavaScript ES6+ only
- No backend dependencies - static site deployment only
- Clear separation of concerns: HTML structure, CSS presentation, JS behavior
- Feature complexity MUST be justified against user value
- Default to browser-native APIs before adding libraries

**Rationale**: This is a prayer guide, not a technical showcase. Complexity creates
maintenance burden and detracts from the contemplative purpose. Users need
reliability and clarity, not cutting-edge technology.

### II. Progressive Enhancement (NON-NEGOTIABLE)

**Core prayer functionality MUST work without JavaScript, decorative enhancements,
or modern browser features.**

- Essential content (prayers, text) accessible via semantic HTML
- CSS provides styling - never structural functionality
- JavaScript enhances experience but never gates access to prayer content
- Visual enhancements (animations, decorations) load after core content
- Feature detection over browser sniffing - graceful degradation required

**Rationale**: Prayer is sacred activity. Technical failures, slow connections, or
older devices MUST NOT prevent someone from accessing prayer content. This is a
moral imperative, not a technical preference.

### III. Accessibility Always

**All features MUST meet or exceed WCAG AA standards and respect user preferences.**

Mandatory requirements:
- Text contrast ratios: 4.5:1 minimum for body text, 3:1 for large text/headings
- Support `prefers-reduced-motion` (disable/minimize animations when set)
- Support `prefers-contrast: high` (remove textures, maximize contrast)
- Support `prefers-color-scheme: dark` (provide appropriate dark mode)
- All decorative elements: `aria-hidden="true"`
- Logical focus order maintained during transitions
- Screen reader announcements for page transitions
- Keyboard navigation for all interactive elements
- Functional at 320px viewport width minimum

**Rationale**: Accessibility is justice. Many who seek prayer may have disabilities.
Our design choices must never exclude them. This is both legal compliance (WCAG)
and ethical commitment.

### IV. Performance Budget

**All features MUST meet strict performance targets to support contemplative use.**

Performance requirements:
- Page transitions: 800-1200ms (deliberately slower for contemplative pacing)
- Asset loading: <2 seconds on 3G connection
- Animation frame rate: 60fps (16.67ms frame budget)
- Initial content render: <100ms for text processing
- Memory: No leaks from event listeners or cached DOM elements
- Responsive input: React to user actions within 100ms

**Rationale**: Performance affects contemplation. Slow, laggy interfaces create
frustration. Fast, smooth interfaces fade into background, allowing focus on
prayer. We optimize for meditation, not metrics.

### V. Specification-Driven Development

**All features begin with specifications before implementation.**

Required workflow:
1. `/speckit.specify` - Create feature specification with user scenarios
2. `/speckit.plan` - Generate implementation plan with research and design
3. `/speckit.tasks` - Break down into actionable tasks (future step)
4. Implementation follows approved spec/plan

Specifications MUST include:
- User scenarios (prioritized P1/P2/P3)
- Testable acceptance criteria (Given/When/Then)
- Success criteria (measurable, technology-agnostic)
- Edge cases and constraints
- No implementation details (what, not how)

**Rationale**: Specs prevent scope creep and ensure features serve users, not
developer preferences. They enable AI-assisted development via GitHub Copilot
and spec-kit integration. Clear specs = clear implementation = maintainable code.

## Quality Standards

### Documentation

- Every feature has `specs/###-feature-name/` directory
- Mandatory files: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`
- README.md stays current with project structure and setup
- Code comments explain "why" not "what" (code itself shows "what")

### Testing

- Manual testing via checklists in `specs/*/checklists/`
- Visual regression testing for UI changes
- Accessibility testing (automated + manual with assistive tech)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS Safari, Android Chrome) at 320px+ widths

### Code Style

- JavaScript: ES6+ features, 2-space indentation, semicolons required
- CSS: Mobile-first responsive design, CSS custom properties for theming
- HTML: Semantic markup, valid HTML5, accessible structure
- Naming: Descriptive, consistent (camelCase JS, kebab-case CSS/HTML)

## Governance

### Amendment Process

1. Propose change via GitHub issue with rationale
2. Version bump follows semantic versioning:
   - **MAJOR**: Breaking changes (removing/redefining principles)
   - **MINOR**: Adding new principles or expanding guidance
   - **PATCH**: Clarifications, wording fixes, non-semantic changes
3. Update `.specify/memory/constitution.md` with Sync Impact Report
4. Verify consistency across templates (plan, spec, tasks)
5. Commit with message: `docs: amend constitution to vX.Y.Z (summary)`

### Compliance Review

- Every feature plan includes "Constitution Check" section
- Constitution violations MUST be justified in "Complexity Tracking" table
- Unjustified violations block feature approval
- Re-check after Phase 1 design to catch new violations

### Authority

- This constitution supersedes personal preferences and coding habits
- When in doubt, simplicity and accessibility win
- Technical cleverness never justifies compromising prayer access
- GitHub Copilot instructions (`.github/copilot-instructions.md`) derive from
  this constitution but never override it

**Version**: 1.0.0 | **Ratified**: 2025-10-26 | **Last Amended**: 2025-10-26
