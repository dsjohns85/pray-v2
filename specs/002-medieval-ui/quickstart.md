# Quickstart: Medieval Prayer Book UI Enhancement

**Feature**: 002-medieval-ui  
**Date**: October 26, 2025  
**Audience**: Developers implementing the medieval UI enhancements

---

## Prerequisites

- Existing Luther Prayer Guide application (located in `docs/` folder)
- Modern browser with Web Animations API support (Chrome 84+, Firefox 75+, Safari 13.1+)
- Basic knowledge of JavaScript ES6 modules and CSS custom properties

---

## Quick Overview

This enhancement adds 15th-century prayer book aesthetics to the existing web app:
1. **Page transitions** - Smooth, contemplative animations using WAAPI
2. **Illuminated capitals** - Decorative first letters on major text
3. **Parchment theme** - Aged, warm background styling
4. **Medieval typography** - Period-appropriate fonts
5. **Decorative borders** - Ornamental frames on key screens

**Key principle**: Progressive enhancement - core prayer functionality works even if decorations fail.

---

## Implementation Order

Follow this sequence for incremental, testable development:

### Phase 1: Foundation (P1 - Critical)
1. Set up medieval theme CSS and color palette
2. Implement parchment background styling
3. Add medieval font loading

### Phase 2: Core Visuals (P1 - Critical)
4. Implement illuminated capital processor
5. Create WAAPI page transition engine
6. Integrate transitions into existing navigation

### Phase 3: Polish (P2-P3 - Enhancement)
7. Add decorative SVG borders
8. Implement responsive scaling
9. Add accessibility features

---

## Step-by-Step Guide

### Step 1: Add Medieval CSS Foundation

**File**: `docs/medieval.css` (new file)

```css
/* CSS Custom Properties - Medieval Color Palette */
:root {
  /* Historical pigment colors */
  --medieval-gold: #D4AF37;
  --medieval-blue: #1E3A8A;
  --medieval-red: #E63946;
  --medieval-green: #2D6A4F;
  --medieval-brown: #6C4E31;
  
  /* Parchment colors */
  --parchment-base: #F4ECD8;
  --parchment-aged: #E8DCC4;
  --vellum-highlight: #FFF8DC;
  
  /* Text colors (WCAG AA compliant) */
  --text-body: #2B1810;
  --text-heading: #1A1A1A;
  --text-muted: #5C4033;
  
  /* Animation timing */
  --page-turn-duration: 1000ms;
  --transition-easing: cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Parchment background */
body {
  background-color: var(--parchment-base);
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%);
  background-blend-mode: multiply;
  color: var(--text-body);
}

/* Accessibility: Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --page-turn-duration: 0ms;
  }
}

/* Accessibility: High contrast */
@media (prefers-contrast: high) {
  :root {
    --parchment-base: white;
  }
  body {
    background-image: none;
  }
}

/* Accessibility: Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --parchment-base: #2C2416;
    --parchment-aged: #1A1410;
    --text-body: #E8DCC4;
    --text-heading: #FFF8DC;
    --medieval-gold: #B8950F;
  }
}
```

**Link in `docs/index.html`**:
```html
<head>
  <!-- Existing links -->
  <link rel="stylesheet" href="medieval.css">
</head>
```

**Test**: Reload page, verify parchment background appears.

---

### Step 2: Load Medieval Fonts

**Add to `docs/index.html` `<head>`**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Crimson+Pro:wght@400;600;700&display=swap" rel="stylesheet">
```

**Add to `docs/medieval.css`**:

```css
/* Typography */
h1, h2, h3, .heading {
  font-family: 'UnifrakturMaguntia', 'Cinzel', Georgia, serif;
  color: var(--text-heading);
}

body, p, li {
  font-family: 'Crimson Pro', 'Crimson Text', 'Libre Baskerville', serif;
  line-height: 1.6;
}
```

**Test**: Verify headings use medieval-style font, body text uses readable serif.

---

### Step 3: Create Illuminated Capitals Module

**File**: `docs/illuminated.js` (new file)

```javascript
// Illuminated capitals processor
export function processIlluminatedCapitals(rootElement, options = {}) {
  const {
    selector = 'h2, .petition-title',
    colorPalette = ['#D4AF37', '#1E3A8A', '#E63946'],
    decorationStyle = 'simple'
  } = options;
  
  const elements = rootElement.querySelectorAll(selector);
  let colorIndex = 0;
  let count = 0;
  
  elements.forEach((element) => {
    // Skip if already processed
    if (element.querySelector('.illuminated-capital')) return;
    
    const text = element.textContent.trim();
    if (!text || text.length === 0) return;
    
    const firstLetter = text.charAt(0);
    const restOfText = text.slice(1);
    
    // Create illuminated capital span
    const capitalSpan = document.createElement('span');
    capitalSpan.className = 'illuminated-capital';
    capitalSpan.textContent = firstLetter;
    capitalSpan.style.color = colorPalette[colorIndex % colorPalette.length];
    capitalSpan.setAttribute('aria-hidden', 'true');
    
    // Create visually-hidden duplicate for screen readers
    const srSpan = document.createElement('span');
    srSpan.className = 'visually-hidden';
    srSpan.textContent = firstLetter;
    
    // Update element
    element.textContent = restOfText;
    element.insertBefore(srSpan, element.firstChild);
    element.insertBefore(capitalSpan, element.firstChild);
    
    colorIndex++;
    count++;
  });
  
  return count;
}
```

**Add to `docs/medieval.css`**:

```css
.illuminated-capital {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.8;
  float: left;
  margin-right: 0.1em;
  font-weight: bold;
  font-family: 'UnifrakturMaguntia', serif;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Test**: Import and call on a page section, verify large decorated first letter appears.

---

### Step 4: Create WAAPI Animation Module

**File**: `docs/animations.js` (new file)

```javascript
// Web Animations API page transitions

let animationConfig = {
  duration: 1000,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  prefersReducedMotion: false
};

// Initialize
export function initAnimations(config = {}) {
  animationConfig = { ...animationConfig, ...config };
  
  // Listen for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  animationConfig.prefersReducedMotion = mediaQuery.matches;
  
  mediaQuery.addEventListener('change', (e) => {
    animationConfig.prefersReducedMotion = e.matches;
  });
  
  // Emit ready event
  window.dispatchEvent(new CustomEvent('animationSystemReady'));
}

// Page transition
export async function transitionToPage(fromElement, toElement, direction = 'forward') {
  if (!fromElement || !toElement) {
    throw new Error('Invalid elements for transition');
  }
  
  // Get duration (0 if reduced motion)
  const duration = animationConfig.prefersReducedMotion ? 0 : animationConfig.duration;
  
  // Emit start event
  window.dispatchEvent(new CustomEvent('pageTransitionStart', {
    detail: { from: fromElement, to: toElement, direction, duration }
  }));
  
  // Prepare new page
  toElement.style.display = 'block';
  toElement.style.opacity = '0';
  
  if (duration === 0) {
    // Instant transition for reduced motion
    fromElement.style.display = 'none';
    toElement.style.opacity = '1';
  } else {
    // Animated transition
    const exitKeyframes = [
      { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 },
      { transform: 'perspective(1000px) rotateY(-15deg)', opacity: 0 }
    ];
    
    const enterKeyframes = [
      { transform: 'perspective(1000px) rotateY(15deg)', opacity: 0 },
      { transform: 'perspective(1000px) rotateY(0deg)', opacity: 1 }
    ];
    
    const timing = {
      duration: duration,
      easing: animationConfig.easing,
      fill: 'forwards'
    };
    
    // Performance hint
    fromElement.style.willChange = 'transform, opacity';
    toElement.style.willChange = 'transform, opacity';
    
    // Execute animations
    const exitAnimation = fromElement.animate(exitKeyframes, timing);
    await exitAnimation.finished;
    
    fromElement.style.display = 'none';
    fromElement.style.willChange = 'auto';
    
    const enterAnimation = toElement.animate(enterKeyframes, timing);
    await enterAnimation.finished;
    
    toElement.style.willChange = 'auto';
  }
  
  // Emit end event
  window.dispatchEvent(new CustomEvent('pageTransitionEnd', {
    detail: { to: toElement, actualDuration: duration }
  }));
}

export function getAnimationConfig() {
  return { ...animationConfig };
}
```

**Test**: Call `transitionToPage()` between two elements, verify smooth page turn animation.

---

### Step 5: Integrate Into Main App

**Update `docs/app.js`**:

```javascript
// Add imports at top
import { initAnimations, transitionToPage } from './animations.js';
import { processIlluminatedCapitals } from './illuminated.js';

// In initialization function
function initApp() {
  // ... existing code ...
  
  // Initialize medieval enhancements
  initAnimations();
  
  // Process illuminated capitals on current view
  processIlluminatedCapitals(document.getElementById('welcome'), {
    selector: 'h1, h2'
  });
}

// Update navigation functions to use transitions
async function showContent(contentId) {
  const currentSection = document.querySelector('.section.active');
  const nextSection = document.getElementById(contentId);
  
  if (currentSection && nextSection && currentSection !== nextSection) {
    // Use medieval page transition
    await transitionToPage(currentSection, nextSection, 'forward');
    
    currentSection.classList.remove('active');
    nextSection.classList.add('active');
    
    // Process capitals in new section
    processIlluminatedCapitals(nextSection);
  }
}
```

**Update `docs/index.html`**:

```html
<!-- Change script tag to module -->
<script type="module" src="app.js"></script>
```

**Test**: Navigate between sections, verify page-turn transitions and illuminated capitals appear.

---

### Step 6: Add Responsive Behavior

**Add to `docs/medieval.css`**:

```css
/* Mobile: Simplified aesthetics */
@media (max-width: 599px) {
  :root {
    --page-turn-duration: 600ms; /* Faster on mobile */
  }
  
  .illuminated-capital {
    font-size: clamp(2.5rem, 10vw, 4rem); /* Smaller */
  }
  
  /* Hide decorative borders on mobile */
  .decorative-border {
    display: none;
  }
}

/* Tablet */
@media (min-width: 600px) and (max-width: 1023px) {
  :root {
    --page-turn-duration: 800ms;
  }
}

/* Desktop: Full experience */
@media (min-width: 1024px) {
  :root {
    --page-turn-duration: 1000ms;
  }
}
```

**Test**: Resize browser window, verify timing and sizing adjust appropriately.

---

## Testing Checklist

After implementation, verify:

- [ ] Parchment background appears on all screens
- [ ] Medieval fonts load (headings use UnifrakturMaguntia, body uses Crimson Pro)
- [ ] Illuminated capitals appear on major sections (h1, h2)
- [ ] Page transitions work smoothly (800-1200ms depending on screen size)
- [ ] Reduced motion preference disables animations
- [ ] High contrast mode disables parchment texture
- [ ] Dark mode switches to dark parchment palette
- [ ] Text remains readable (WCAG AA contrast)
- [ ] All screens work on 320px width
- [ ] Touch swipe gestures work on mobile (if implemented)

---

## Troubleshooting

**Issue**: Fonts don't load
- **Solution**: Check network tab for font requests, verify Google Fonts API is accessible

**Issue**: Animations don't work
- **Solution**: Check browser console for WAAPI errors, verify browser version supports Web Animations API

**Issue**: Illuminated capitals overlap text
- **Solution**: Adjust `clamp()` values in CSS, check line-height and margin settings

**Issue**: Performance issues (lag during animations)
- **Solution**: Reduce `will-change` usage, check for other running animations, verify 60fps target

**Issue**: Parchment too dark/light
- **Solution**: Adjust CSS custom properties for `--parchment-base`, check color contrast

---

## Performance Benchmarks

Target metrics (from spec success criteria):

- **Page transitions**: 800-1200ms duration ✓
- **Asset loading**: <2s on 3G connection ✓
- **Frame rate**: 60fps during animations ✓
- **Text contrast**: WCAG AA (4.5:1 body, 3:1 headings) ✓
- **Illuminated capital processing**: <100ms per page ✓

Use browser DevTools Performance tab to verify.

---

## Next Steps

Once core implementation is complete:

1. **Add decorative borders** (Phase 3) - Create SVG border components
2. **Implement swipe gestures** - Add touch event handlers for mobile
3. **Add marginalia** - Small decorative elements in margins
4. **Performance optimization** - Lazy load decorations, optimize asset sizes
5. **Comprehensive testing** - Cross-browser, accessibility audit, user testing

---

## Resources

- [Web Animations API Spec](https://drafts.csswg.org/web-animations/)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Medieval Manuscript Examples](https://www.themorgan.org/collection/hours-of-catherine-of-cleves)
- [Google Fonts](https://fonts.google.com/)

---

## Questions?

Refer to:
- **Spec**: `specs/002-medieval-ui/spec.md` - Feature requirements
- **Research**: `specs/002-medieval-ui/research.md` - Design decisions
- **Data Model**: `specs/002-medieval-ui/data-model.md` - Entity structures
- **Contracts**: `specs/002-medieval-ui/contracts/` - Module interfaces
