# Data Model: Medieval Prayer Book UI Enhancement

**Date**: October 26, 2025  
**Feature**: 002-medieval-ui  
**Purpose**: Define the data structures and entities for medieval UI state management

---

## Overview

This feature is primarily a **visual/presentational enhancement** rather than a data-driven application. However, there are several configuration and state entities that govern the medieval aesthetic behavior.

---

## 1. Animation Configuration

**Purpose**: Centralized configuration for all WAAPI-based transitions and timing

```javascript
AnimationConfig = {
  // Timing
  pageTurnDuration: Number,      // milliseconds (800-1200ms range)
  reducedMotionDuration: Number, // milliseconds (0 for instant)
  easing: String,                // CSS easing function
  
  // User preferences (detected at runtime)
  prefersReducedMotion: Boolean,
  prefersHighContrast: Boolean,
  prefersDarkMode: Boolean,
  
  // Responsive timing
  mobileBreakpoint: Number,      // 600px
  mobileAnimationScale: Number,  // 0.6 (60% of desktop timing)
  
  // Performance
  willChangeEnabled: Boolean,    // Use will-change CSS hints
  animationQueue: Array          // Queue for sequential transitions
}
```

**Source**: Derived from `window.matchMedia()` queries and viewport size  
**Lifecycle**: Initialized on page load, updated on media query changes  
**Relationships**: Used by PageTransition entity

---

## 2. Page Transition

**Purpose**: Represents a single page-to-page transition animation

```javascript
PageTransition = {
  // Elements
  fromElement: HTMLElement,      // Current page being exited
  toElement: HTMLElement,        // New page being entered
  
  // Animation state
  exitAnimation: Animation,      // WAAPI Animation object for exit
  enterAnimation: Animation,     // WAAPI Animation object for enter
  
  // Timing
  startTime: Number,            // Performance.now() timestamp
  duration: Number,             // Actual duration (may vary by config)
  
  // Status
  isActive: Boolean,
  isQueued: Boolean,
  promise: Promise              // Resolves when transition completes
}
```

**Lifecycle**: 
- Created when user navigates between sections
- Active during animation (800-1200ms)
- Destroyed after completion

**State Transitions**:
1. `created` → `active` (animation starts)
2. `active` → `completed` (animation finishes)
3. `created` → `queued` (if another animation is active)
4. `queued` → `active` (when queue processes)

**Validation Rules**:
- `fromElement` and `toElement` must be different
- `duration` must be non-negative
- Only one transition can be `isActive` at a time (others queue)

---

## 3. Illuminated Capital

**Purpose**: Configuration for decorative first-letter styling

```javascript
IlluminatedCapital = {
  // Target
  textElement: HTMLElement,      // Parent element containing text
  capitalLetter: String,         // First letter (1 char)
  
  // Styling
  color: String,                // From medieval color palette
  size: String,                 // CSS font-size (clamp() value)
  fontFamily: String,           // Heading font stack
  
  // Decoration
  decorationStyle: String,      // "floral" | "geometric" | "simple"
  backgroundColor: String,      // Optional background fill
  
  // Rendering
  capitalElement: HTMLElement,  // Created <span> for the capital
  rendered: Boolean            // Track if already processed
}
```

**Lifecycle**: 
- Created during page content initialization
- Rendered once per section load
- Cached to avoid re-processing

**Validation Rules**:
- `capitalLetter` must be alphabetic (A-Z, a-z)
- `size` must be valid CSS clamp() or length value
- Each text element can only have one illuminated capital

---

## 4. Theme Configuration

**Purpose**: Central medieval aesthetic theme settings

```javascript
ThemeConfig = {
  // Color palette
  colors: {
    gold: String,              // #D4AF37
    ultramarineBlue: String,   // #1E3A8A
    vermillionRed: String,     // #E63946
    verdigrisGreen: String,    // #2D6A4F
    organicBrown: String,      // #6C4E31
    parchmentBase: String,     // #F4ECD8
    parchmentAged: String,     // #E8DCC4
    vellumHighlight: String,   // #FFF8DC
    bodyText: String,          // #2B1810
    headingText: String        // #1A1A1A
  },
  
  // Typography
  fonts: {
    heading: String,           // "UnifrakturMaguntia", fallbacks
    body: String,              // "Crimson Pro", fallbacks
    loaded: Boolean            // Font loading status
  },
  
  // Responsive
  currentBreakpoint: String,   // "mobile" | "tablet" | "desktop"
  
  // User preference overrides
  highContrastMode: Boolean,
  darkMode: Boolean
}
```

**Source**: Defined in CSS custom properties, exposed to JavaScript  
**Lifecycle**: Initialized on page load, updated on theme changes  
**Relationships**: Referenced by IlluminatedCapital, ParchmentRenderer

---

## 5. Decorative Border

**Purpose**: SVG border decoration configuration for major screens

```javascript
DecorativeBorder = {
  // Placement
  targetScreen: String,         // "welcome" | "amen" | "completion"
  position: String,             // "full" | "top" | "corners"
  
  // SVG Components
  svgElements: Array<SVGElement>, // Array of SVG border pieces
  
  // Styling
  color: String,                // Tint color from theme palette
  opacity: Number,              // 0.0 - 1.0
  
  // Loading
  loaded: Boolean,
  lazyLoad: Boolean,            // Load on scroll/navigation vs immediately
  
  // Responsive
  visibleAtBreakpoint: String   // "mobile" | "tablet" | "desktop"
}
```

**Lifecycle**: 
- Created when navigating to major screens
- Lazy-loaded for non-welcome screens
- Cached once loaded

**Validation Rules**:
- `opacity` must be 0.0-1.0
- `svgElements` array cannot be empty for rendered borders
- Screen-specific borders only render on their designated screens

---

## 6. Asset Loader

**Purpose**: Track loading state of medieval design assets (fonts, textures, SVGs)

```javascript
AssetLoader = {
  // Assets to load
  fonts: Array<{
    family: String,
    url: String,
    loaded: Boolean,
    error: Boolean
  }>,
  
  textures: Array<{
    name: String,
    url: String,
    type: String,              // "svg" | "css"
    loaded: Boolean,
    error: Boolean
  }>,
  
  decorations: Array<{
    name: String,
    url: String,
    loaded: Boolean,
    error: Boolean
  }>,
  
  // State
  totalAssets: Number,
  loadedCount: Number,
  errorCount: Number,
  allLoaded: Boolean,
  
  // Loading strategy
  critical: Array<String>,     // Asset names to load first
  deferred: Array<String>,     // Asset names to lazy load
  
  // Performance
  startTime: Number,
  loadTime: Number             // Total milliseconds to load all
}
```

**Lifecycle**: 
- Initialized before any rendering
- Updated as each asset loads
- Emits events for UI to show loading states

**State Transitions**:
1. `initializing` → `loading-critical` (fonts, essential textures)
2. `loading-critical` → `ready` (core functionality available)
3. `ready` → `loading-deferred` (decorative elements)
4. `loading-deferred` → `complete` (all assets loaded)

**Validation Rules**:
- Must attempt critical assets before marking `ready`
- Failed assets should fallback gracefully (don't block functionality)
- `loadTime` tracked for performance monitoring (target: <2000ms on 3G)

---

## Entity Relationships

```
ThemeConfig
    ↓ (provides colors/fonts)
IlluminatedCapital

AnimationConfig
    ↓ (provides timing)
PageTransition

ThemeConfig
    ↓ (provides colors)
DecorativeBorder

AssetLoader
    ↓ (loads resources)
ThemeConfig, DecorativeBorder
```

---

## State Management Approach

**Pattern**: Module-based state management (no framework needed)

Each entity is managed by a dedicated JavaScript module:
- `animations.js` → PageTransition, AnimationConfig
- `illuminated.js` → IlluminatedCapital
- `medieval.js` → ThemeConfig (central coordinator)
- `decorations.js` → DecorativeBorder
- `assetLoader.js` → AssetLoader

**Communication**: 
- Custom events for cross-module communication
- `medievalThemeReady` event when ThemeConfig initialized
- `pageTransitionStart` / `pageTransitionEnd` events
- `assetLoaded` / `allAssetsLoaded` events

**Storage**: 
- No persistence needed (theme applied fresh on each page load)
- User preferences read from browser APIs (`matchMedia`)
- No cookies, localStorage, or server communication

---

## Accessibility Considerations

All entities must respect:
- `prefersReducedMotion` → AnimationConfig sets duration to 0
- `prefersHighContrast` → ThemeConfig disables textures, uses high-contrast colors
- `prefersDarkMode` → ThemeConfig switches to dark parchment palette

**Validation**: Every rendered element must maintain WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large text/headings).

---

## Performance Constraints

- **AnimationConfig**: Must check media queries without causing reflows (<1ms)
- **PageTransition**: Must maintain 60fps (16.67ms per frame budget)
- **AssetLoader**: Critical assets must load in <2000ms on 3G connection
- **IlluminatedCapital**: Processing all capitals on a page must take <100ms

These constraints map to success criteria SC-003, SC-008 from the spec.
