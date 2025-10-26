# Content Schema Contract

**Version**: 1.0.0  
**Date**: October 26, 2025  
**Feature**: 002-medieval-ui

---

## Overview

This contract defines the interface for the medieval UI enhancement modules. Since this is a frontend JavaScript enhancement, we define module interfaces rather than REST/GraphQL APIs.

---

## Module: `animations.js`

### Purpose
Provides WAAPI-based page transition animations with accessibility support.

### Public Interface

#### `initAnimations(config)`

Initialize animation system with configuration.

**Parameters**:
```javascript
{
  reducedMotionDuration?: number,  // Default: 0
  normalDuration?: number,         // Default: 1000
  easing?: string,                 // Default: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  mobileBreakpoint?: number        // Default: 600
}
```

**Returns**: `void`

**Side Effects**: 
- Listens to `prefers-reduced-motion` media query
- Attaches resize listener for responsive timing
- Emits `animationSystemReady` event

---

#### `async transitionToPage(fromElement, toElement, direction)`

Execute page transition animation.

**Parameters**:
```javascript
{
  fromElement: HTMLElement,    // Current page (required)
  toElement: HTMLElement,      // Target page (required)
  direction?: string          // "forward" | "back" (default: "forward")
}
```

**Returns**: `Promise<void>` - Resolves when transition completes

**Throws**: 
- `Error` if elements are invalid
- `Error` if animation already in progress (unless queued)

**Side Effects**:
- Hides `fromElement`
- Shows `toElement`
- Emits `pageTransitionStart` event (detail: { from, to, direction })
- Emits `pageTransitionEnd` event (detail: { to, duration })

**Example**:
```javascript
import { transitionToPage } from './animations.js';

const currentPage = document.getElementById('welcome');
const nextPage = document.getElementById('content');

await transitionToPage(currentPage, nextPage, 'forward');
console.log('Transition complete');
```

---

#### `getAnimationConfig()`

Get current animation configuration.

**Parameters**: None

**Returns**:
```javascript
{
  duration: number,              // Current duration (may be 0 if reduced motion)
  easing: string,
  prefersReducedMotion: boolean,
  currentBreakpoint: string     // "mobile" | "tablet" | "desktop"
}
```

---

#### `cancelActiveTransition()`

Cancel any in-progress transition immediately.

**Parameters**: None

**Returns**: `boolean` - `true` if transition was canceled, `false` if none active

**Side Effects**:
- Stops current animation
- Resolves transition promise
- Emits `pageTransitionCanceled` event

---

## Module: `illuminated.js`

### Purpose
Process text elements to add illuminated capital letters.

### Public Interface

#### `processIlluminatedCapitals(rootElement, options)`

Find and enhance first letters in designated text elements.

**Parameters**:
```javascript
{
  rootElement: HTMLElement,          // Search root (required)
  selector?: string,                 // CSS selector (default: 'h2, .petition-title')
  colorPalette?: Array<string>,      // Colors to cycle through
  decorationStyle?: string          // "floral" | "geometric" | "simple" (default: "simple")
}
```

**Returns**: `number` - Count of capitals processed

**Side Effects**:
- Modifies DOM: Wraps first letter in `<span class="illuminated-capital">`
- Applies inline styles or classes
- Caches processed elements to avoid re-processing

**Example**:
```javascript
import { processIlluminatedCapitals } from './illuminated.js';

const contentArea = document.getElementById('content');
const count = processIlluminatedCapitals(contentArea, {
  selector: 'h2, h3',
  colorPalette: ['#D4AF37', '#1E3A8A', '#E63946'],
  decorationStyle: 'floral'
});

console.log(`Processed ${count} illuminated capitals`);
```

---

#### `removeIlluminatedCapitals(rootElement)`

Remove illuminated capital styling and restore original text.

**Parameters**:
```javascript
{
  rootElement: HTMLElement    // Required
}
```

**Returns**: `number` - Count of capitals removed

**Side Effects**:
- Removes `.illuminated-capital` spans
- Restores text to original state

---

## Module: `medieval.js`

### Purpose
Central theme coordinator, loads assets, applies parchment styling.

### Public Interface

#### `async initMedievalTheme(options)`

Initialize medieval theme with all enhancements.

**Parameters**:
```javascript
{
  enableAnimations?: boolean,      // Default: true
  enableIllumination?: boolean,    // Default: true
  enableDecorations?: boolean,     // Default: true
  customColors?: Object,           // Override default palette
  loadStrategy?: string           // "eager" | "lazy" (default: "lazy")
}
```

**Returns**: `Promise<void>` - Resolves when critical assets loaded

**Side Effects**:
- Loads web fonts
- Applies parchment background styles
- Initializes animations module
- Processes illuminated capitals
- Emits `medievalThemeReady` event (detail: { loadTime })

**Example**:
```javascript
import { initMedievalTheme } from './medieval.js';

await initMedievalTheme({
  enableAnimations: true,
  enableIllumination: true,
  enableDecorations: true,
  loadStrategy: 'lazy'
});

console.log('Medieval theme ready');
```

---

#### `getThemeConfig()`

Get current theme configuration and state.

**Parameters**: None

**Returns**:
```javascript
{
  colors: Object,              // Color palette
  fonts: Object,               // Font families and load status
  darkMode: boolean,
  highContrastMode: boolean,
  assetsLoaded: boolean,
  currentBreakpoint: string
}
```

---

#### `updateThemePreference(preference, value)`

Update theme preference dynamically.

**Parameters**:
```javascript
{
  preference: string,    // "darkMode" | "highContrast" | "reducedMotion"
  value: boolean         // New value
}
```

**Returns**: `void`

**Side Effects**:
- Updates theme CSS custom properties
- Re-applies styles based on new preference
- Emits `themePreferenceChanged` event

---

## Module: `decorations.js`

### Purpose
Load and render SVG decorative borders.

### Public Interface

#### `async loadDecorationsForScreen(screenName, position)`

Load decorative borders for a specific screen.

**Parameters**:
```javascript
{
  screenName: string,     // "welcome" | "amen" | "completion" | "content"
  position?: string       // "full" | "corners" | "top" (default: "full")
}
```

**Returns**: `Promise<Array<SVGElement>>` - Array of loaded SVG elements

**Side Effects**:
- Fetches SVG files (cached after first load)
- Inserts SVG into DOM
- Applies theme colors
- Emits `decorationsLoaded` event

---

#### `removeDecorations(screenName)`

Remove decorations from a screen.

**Parameters**:
```javascript
{
  screenName: string    // Required
}
```

**Returns**: `void`

**Side Effects**:
- Removes SVG elements from DOM
- Clears screen-specific decoration cache

---

## Events API

All modules emit custom events for loose coupling.

### Event: `medievalThemeReady`

**Emitted by**: `medieval.js`  
**When**: Theme initialization complete  
**Detail**:
```javascript
{
  loadTime: number,        // Milliseconds to initialize
  assetsLoaded: number,    // Count of assets loaded
  assetsFailed: number     // Count of failed assets
}
```

---

### Event: `pageTransitionStart`

**Emitted by**: `animations.js`  
**When**: Page transition animation begins  
**Detail**:
```javascript
{
  from: HTMLElement,
  to: HTMLElement,
  direction: string,       // "forward" | "back"
  duration: number         // Expected duration in ms
}
```

---

### Event: `pageTransitionEnd`

**Emitted by**: `animations.js`  
**When**: Page transition animation completes  
**Detail**:
```javascript
{
  to: HTMLElement,
  actualDuration: number,  // Actual time taken
  wasCanceled: boolean
}
```

---

### Event: `assetLoadProgress`

**Emitted by**: `medieval.js` (via internal AssetLoader)  
**When**: Each asset loads  
**Detail**:
```javascript
{
  assetName: string,
  assetType: string,       // "font" | "texture" | "decoration"
  loaded: number,          // Count loaded so far
  total: number,           // Total asset count
  progress: number         // 0.0 - 1.0
}
```

---

## Error Handling Contract

All modules follow consistent error handling:

### Error Types

```javascript
// Invalid parameter
class MedievalUIError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'MedievalUIError';
    this.code = code;
  }
}

// Error codes
const ERROR_CODES = {
  INVALID_ELEMENT: 'INVALID_ELEMENT',
  ANIMATION_IN_PROGRESS: 'ANIMATION_IN_PROGRESS',
  ASSET_LOAD_FAILED: 'ASSET_LOAD_FAILED',
  UNSUPPORTED_BROWSER: 'UNSUPPORTED_BROWSER'
};
```

### Graceful Degradation

If errors occur:
1. Log to console (development)
2. Emit error event with details
3. Fall back to simpler implementation
4. **Never** block prayer functionality

**Example**:
```javascript
// If WAAPI not supported, fall back to CSS transitions
if (!('animate' in HTMLElement.prototype)) {
  console.warn('WAAPI not supported, using CSS fallback');
  // Use CSS classes instead
}

// If fonts fail to load, use fallback stack
document.fonts.ready.catch(() => {
  console.warn('Custom fonts failed, using system fallbacks');
  // Continue with fallback fonts
});
```

---

## Accessibility Contract

All modules MUST:

1. **Respect `prefers-reduced-motion`**:
   - Animations: Set duration to 0
   - Transitions: Use instant CSS changes
   
2. **Respect `prefers-contrast: high`**:
   - Remove parchment texture
   - Use maximum contrast colors
   - Disable decorative elements if needed
   
3. **Respect `prefers-color-scheme: dark`**:
   - Switch to dark parchment palette
   - Invert text colors
   
4. **ARIA compliance**:
   - All decorative elements: `aria-hidden="true"`
   - Transitions: Announce to screen readers
   - Focus management: Maintain logical order

---

## Performance Contract

All modules MUST meet:

- **Animation frame rate**: 60fps (16.67ms budget per frame)
- **Critical asset loading**: <2000ms on 3G
- **Initial render**: <100ms for illuminated capitals processing
- **Memory**: No memory leaks from event listeners or cached elements
- **Responsiveness**: React to user input within 100ms

**Monitoring**:
```javascript
// All modules should expose performance metrics
getPerformanceMetrics() {
  return {
    averageFrameTime: number,  // ms
    assetLoadTime: number,     // ms
    memoryUsage: number        // bytes (if available)
  };
}
```

---

## Versioning

This contract follows semantic versioning:
- **MAJOR**: Breaking changes to public interfaces
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes

Current version: **1.0.0**
