# Research: Luther Prayer Guide

**Date**: 2025-10-26
**Feature**: Luther Prayer Guide (001)
**Phase**: 0 - Research & Decision Making

## Overview

This document captures technical research and decisions for implementing a guided prayer web application based on Martin Luther's "A Simple Way to Pray."

## Research Questions & Resolutions

### 1. Hosting Platform

**Question**: Where should this static application be hosted?

**Decision**: GitHub Pages

**Rationale**:
- **Zero cost**: Free hosting for public repositories
- **Zero configuration**: Serve directly from `/docs` folder
- **Zero deployment complexity**: Push to main branch automatically deploys
- **Built-in HTTPS**: Secure by default
- **Custom domain support**: Can add custom domain later if needed
- **Git-native workflow**: Deployment is just `git push`

**Alternatives Considered**:
- **Netlify/Vercel**: More features but unnecessary for this simple use case (YAGNI principle)
- **Self-hosted**: Requires server management, violates simplicity principle
- **AWS S3 + CloudFront**: Overkill and introduces costs for static content

**Implementation Notes**:
- Enable GitHub Pages in repository settings
- Set source to `/docs` folder on main branch
- Site will be available at `https://<username>.github.io/<repo-name>/`

---

### 2. Frontend Architecture

**Question**: Should this be a single-page application (SPA) or multi-page site?

**Decision**: Single-Page Application (SPA) with vanilla JavaScript

**Rationale**:
- **Smooth transitions**: No page reloads between petitions maintains contemplative atmosphere
- **State persistence**: Easy to track current position in localStorage
- **Offline-capable**: All content loads once, works without internet after first visit
- **Simple implementation**: Show/hide DOM elements, no routing library needed
- **Fast navigation**: Instant transitions between sections

**Alternatives Considered**:
- **Multi-page site**: Simpler for beginners but page reloads break prayer flow and feel clunky
- **Framework-based SPA** (React, Vue): Massive overkill for displaying static content with simple navigation

**Implementation Approach**:
```javascript
// Pseudo-code for navigation
const sections = ['petition-1', 'petition-2', ..., 'amen'];
let currentIndex = 0;

function showSection(index) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(sections[index]).classList.remove('hidden');
  currentIndex = index;
  saveState();
}

function next() {
  if (currentIndex < sections.length - 1) showSection(currentIndex + 1);
}
```

---

### 3. Styling Approach

**Question**: How should the UI be styled for a contemplative, distraction-free experience?

**Decision**: Minimal CSS with focus on readability and calm aesthetics

**Rationale**:
- **Readability**: Large, legible font (18-20px body text)
- **Visual calm**: Ample whitespace, neutral color palette
- **Focus**: Minimal UI chrome, content-first design
- **Accessibility**: High contrast, keyboard navigable

**Design Principles**:
- **Typography**: Serif font for content (Georgia or similar system font), sans-serif for UI
- **Color palette**:
  - Background: Off-white (#fafafa)
  - Text: Dark gray (#333)
  - Accent: Subtle blue/green for navigation (#4a5568)
- **Layout**: Centered content, max-width 600-700px, generous line height (1.6-1.8)
- **Navigation**: Subtle, unobtrusive "Next" button, progress indicator optional

**Alternatives Considered**:
- **CSS Framework** (Bootstrap, Tailwind): Unnecessary complexity and file size
- **Dark theme**: Could add later as user preference but keep light as default for readability

---

### 4. Content Structure

**Question**: How should prayer content be organized in the codebase?

**Decision**: Separate JavaScript modules for each content type

**Rationale**:
- **Maintainability**: Content editors can update content files without touching app logic
- **Clarity**: Clear separation of concerns (app.js = logic, content/*.js = data)
- **Scalability**: Easy to add new content sections (e.g., additional prayers)

**File Structure**:
```javascript
// content/petitions.js
export const petitions = [
  {
    id: 1,
    title: "First Petition: Hallowed Be Thy Name",
    petition: "Our Father who art in heaven, hallowed be thy name.",
    application: "...",
    confession: "...",
    intercession: "..."
  },
  // ... 6 more
];

// content/commandments.js
export const commandments = [ /* ... */ ];

// content/creed.js
export const creed = [ /* ... */ ];
```

**Implementation Notes**:
- Use ES6 modules (export/import)
- Load in HTML: `<script type="module" src="app.js"></script>`
- All modern browsers support ES6 modules natively (no transpilation needed)

---

### 5. State Persistence

**Question**: Should the app remember where the user left off?

**Decision**: Optional localStorage persistence (implement in P1, not critical for MVP)

**Rationale**:
- **User benefit**: Allows resuming long prayer sessions
- **Low complexity**: Simple localStorage API
- **Graceful degradation**: If user clears storage or blocks it, app still works (starts from beginning)

**Implementation Approach**:
```javascript
function saveState() {
  try {
    localStorage.setItem('pray-current-index', currentIndex);
    localStorage.setItem('pray-current-section', currentSection); // 'petitions', 'commandments', 'creed'
  } catch (e) {
    // Silently fail if localStorage unavailable
  }
}

function loadState() {
  try {
    return {
      index: parseInt(localStorage.getItem('pray-current-index') || '0'),
      section: localStorage.getItem('pray-current-section') || 'petitions'
    };
  } catch (e) {
    return { index: 0, section: 'petitions' };
  }
}
```

**Alternatives Considered**:
- **No persistence**: Simpler but loses value for long sessions (spec says "hours" possible)
- **Backend persistence**: Massive overkill, requires authentication, violates simplicity

---

### 6. Content Source

**Question**: Where will the actual prayer content come from?

**Decision**: Research and extract from Martin Luther's "A Simple Way to Pray" + standard Christian texts

**Content Sources**:
- **Seven Petitions**: Martin Luther's "A Simple Way to Pray" (public domain, 1535)
- **Lord's Prayer base text**: Standard liturgical version (public domain)
- **Ten Commandments**: Standard Christian text (public domain)
- **Apostle's Creed**: Standard Christian text (public domain)

**Action Items for Implementation**:
1. Locate public domain English translation of Luther's work (Project Gutenberg or similar)
2. Extract the four-element structure for each petition:
   - The petition itself (from Lord's Prayer)
   - Luther's personal application guidance
   - Luther's confession prompts
   - Luther's intercession prompts
3. Adapt language to modern English if necessary while preserving theological content
4. Structure Ten Commandments and Creed content in similar reflection format

**Licensing**: All source material is public domain (pre-1928 or standard liturgical texts). No copyright concerns.

---

### 7. Browser Compatibility

**Question**: Which browsers must be supported?

**Decision**: Modern evergreen browsers (last 2 versions)

**Supported**:
- Chrome/Edge (Chromium) 110+
- Firefox 115+
- Safari 16+

**Features Used (all supported in target browsers)**:
- ES6 modules
- CSS Grid/Flexbox
- localStorage API
- classList API
- addEventListener

**Not Supporting**:
- Internet Explorer (end of life)
- Legacy mobile browsers (pre-2022)

**Rationale**: Simplicity principle - supporting legacy browsers requires polyfills and complexity. Target audience (Christians using prayer app) likely has modern devices.

---

### 8. Progressive Enhancement

**Question**: Should the app work without JavaScript?

**Decision**: JavaScript required (graceful message for no-JS users)

**Rationale**:
- **Core functionality depends on JS**: Navigation state machine requires JavaScript
- **Simplicity**: Building no-JS fallback adds significant complexity
- **Acceptable tradeoff**: >98% of users have JS enabled
- **Graceful degradation**: Show clear message: "This prayer guide requires JavaScript. Please enable it in your browser."

**Implementation**:
```html
<noscript>
  <div class="no-js-message">
    <h1>JavaScript Required</h1>
    <p>This prayer guide requires JavaScript to provide a guided experience.
       Please enable JavaScript in your browser settings.</p>
  </div>
</noscript>
```

---

## Technology Stack Summary

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Markup** | HTML5 | Standard, semantic |
| **Styling** | CSS3 | No preprocessor needed |
| **Logic** | Vanilla JavaScript (ES6+) | Zero dependencies, native browser support |
| **Hosting** | GitHub Pages | Free, zero-config, git-native |
| **Deployment** | Git push to main | Automatic via GitHub Pages |
| **State** | localStorage (optional) | Simple, no backend needed |
| **Content** | JS modules | Maintainable, separates data from logic |

---

## Open Questions (to be resolved in Phase 1)

1. **UI transitions**: Should sections fade in/out or appear instantly? (Design decision in Phase 1)
2. **Progress indicator**: Should there be a progress bar or step counter? (Design decision in Phase 1)
3. **Navigation options**: Just "Next" button, or also "Previous" and "Jump to section"? (UX decision in Phase 1)
4. **Mobile responsiveness**: Specific breakpoints and mobile-first considerations (Design decision in Phase 1)

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Content extraction from Luther's work is time-consuming | Medium | Medium | Allocate dedicated task for content research, consider using multiple translations |
| Users expect mobile app not web app | Low | Low | Make responsive design excellent, consider PWA features later (out of scope for MVP) |
| GitHub Pages downtime | Very Low | Low | Acceptable for free hosting, can switch to alternate host if needed |
| Browser compatibility issues | Low | Medium | Test in all target browsers before release |

---

## Next Steps (Phase 1)

1. Create data-model.md defining content structure
2. Design UI mockup or wireframe (low-fidelity)
3. Define navigation flow and state machine
4. Create quickstart.md with setup and deployment instructions
5. Extract actual content from Luther's work
