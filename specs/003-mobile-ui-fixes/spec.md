# Feature Specification: Mobile UI Fixes for Medieval Theme

**Feature Branch**: `003-mobile-ui-fixes`  
**Created**: October 27, 2025  
**Status**: Draft  
**Input**: User description: "the recent UI changes were huge but introduce some concerns. first they do not work on mobile, which should be the primary target. 2nd, the colors on mobile are unreadable, light on light. the buttons are out of theme \"next and end session\", and also have \"hit boxes\" that don't match up with the button. the animations are inconsistent, and seem to work sometimes, and then not others."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mobile Text Readability (Priority: P1)

Users on mobile devices (especially phones in portrait orientation) need to read all prayer text, headings, and buttons with clear contrast and legible sizing. Currently, the parchment background creates light-on-light contrast issues making text unreadable, especially in bright lighting conditions.

**Why this priority**: Without readable text, the app is completely unusable on mobile devices. Since mobile is the primary target platform (users pray on-the-go, in church, at bedtime), this is a critical blocker affecting all users.

**Independent Test**: Can be fully tested by opening the app on any mobile device (or Chrome DevTools mobile emulator at 375px width) and verifying all text has sufficient contrast (WCAG AA minimum 4.5:1 for body text), delivering immediate usability restoration.

**Acceptance Scenarios**:

1. **Given** user opens app on iPhone in bright sunlight, **When** viewing any prayer text, **Then** text is clearly readable with dark color on sufficiently contrasted background
2. **Given** user navigates to any section on Android phone, **When** reading headings and body text, **Then** all text meets WCAG AA contrast standards (4.5:1 for body, 3:1 for headings)
3. **Given** user views buttons on small screen (320px width), **When** reading button labels, **Then** text is legible and not truncated
4. **Given** user has dark mode enabled on mobile, **When** viewing content, **Then** color scheme adapts appropriately with sufficient contrast

---

### User Story 2 - Consistent Button Styling (Priority: P1)

All buttons (navigation buttons "Next" and "End Session", plus decision buttons like "Continue to Commandments") need to match the medieval theme while providing clear clickable areas with accurate hit boxes that align with visual button boundaries.

**Why this priority**: Buttons are the primary interaction mechanism. Misaligned hit boxes create frustration and broken trust in the interface, while theme inconsistency breaks immersion. This affects every single navigation action.

**Independent Test**: Can be tested by tapping all buttons on mobile device and verifying: (1) visual appearance matches medieval theme, (2) tap area exactly matches visual button, (3) hover/active states provide clear feedback, delivering consistent interaction patterns.

**Acceptance Scenarios**:

1. **Given** user views any screen with buttons, **When** observing button styling, **Then** buttons use parchment-themed colors, medieval-appropriate fonts, and decorative borders consistent with overall design
2. **Given** user taps "Next" button on mobile, **When** finger touches within visual button boundaries, **Then** button activates reliably without requiring precise tapping
3. **Given** user taps near but outside button visual boundary, **When** tap occurs, **Then** button does NOT activate (no hit box overflow beyond visual bounds)
4. **Given** user presses and holds button, **When** button is in active state, **Then** visual feedback (color change, shadow, etc.) clearly indicates pressed state
5. **Given** user with large fingers taps button on small screen, **When** tapping, **Then** button hit area is at least 44px × 44px (iOS) / 48dp (Android) for accessibility

---

### User Story 3 - Reliable Page Transition Animations (Priority: P1)

Page transitions between prayer sections must work consistently on all mobile devices and screen sizes. Animations should either complete smoothly or gracefully degrade to instant transitions rather than showing broken/partial animations or frozen screens.

**Why this priority**: Inconsistent animations create user confusion ("is the app broken?"), interrupt prayer flow, and may leave users stuck unable to navigate. This affects the core navigation experience that happens dozens of times per session.

**Independent Test**: Can be tested by navigating through multiple sections (Petitions → Commandments → Creed) on various mobile devices and verifying transitions either animate smoothly or switch instantly without visual glitches, delivering predictable navigation behavior.

**Acceptance Scenarios**:

1. **Given** user on iPhone Safari taps "Next", **When** transitioning between sections, **Then** page-turn animation completes smoothly within 1 second OR switches instantly if animation can't run
2. **Given** user on older Android device with limited GPU, **When** navigating, **Then** system detects performance limitations and disables animations rather than showing choppy/broken transitions
3. **Given** user navigates rapidly (taps Next 3 times quickly), **When** animations queue, **Then** transitions queue gracefully without visual overlap or broken states
4. **Given** user has "Reduce Motion" enabled in device settings, **When** navigating, **Then** all transitions are instant (0ms duration) with no animation artifacts
5. **Given** user on slow network connection, **When** animation assets load, **Then** transitions work with basic fallback even if decorative assets haven't loaded yet

---

### User Story 4 - Mobile-First Layout Optimization (Priority: P2)

Content, decorative elements, and spacing should adapt gracefully to mobile screen sizes (320px to 600px width) with proper touch-target sizing, readable typography scaling, and appropriate hiding/simplification of complex decorative elements that don't work on small screens.

**Why this priority**: While readable text (P1) ensures usability, proper mobile layout optimization ensures a pleasant, polished experience. Poor layout leads to horizontal scrolling, excessive vertical scrolling, and wasted screen real estate.

**Independent Test**: Can be tested by viewing app at various viewport widths (320px, 375px, 414px, 600px) and verifying: no horizontal scroll, appropriate text scaling, hidden/simplified decorations on smallest screens, delivering mobile-optimized presentation.

**Acceptance Scenarios**:

1. **Given** user on iPhone SE (320px width), **When** viewing any section, **Then** no horizontal scrolling occurs and all content fits within viewport
2. **Given** user on standard phone (375px width), **When** reading prayer text, **Then** lines are 45-75 characters wide (optimal readability) with appropriate font size (16px minimum)
3. **Given** user on small screen, **When** viewing decorative borders, **Then** complex decorations are hidden or simplified to prevent clutter
4. **Given** user on tablet (768px width), **When** viewing content, **Then** layout expands appropriately without excessive line lengths or wasted space
5. **Given** user zooms text to 200% via browser settings, **When** content reflows, **Then** layout remains functional without breaking

---

### User Story 5 - Fixed Navigation Button Positioning (Priority: P2)

The fixed-position "Next" and "End Session" buttons at the bottom of the screen must remain accessible and not obscure content on mobile devices, accounting for various mobile browser UI behaviors (address bars appearing/disappearing, soft keyboards, etc.).

**Why this priority**: Fixed navigation buttons are convenient but can cause problems on mobile (obscuring content, interfering with keyboard, browser chrome overlap). This is important for usability but the app remains functional even if buttons aren't perfectly positioned.

**Independent Test**: Can be tested by scrolling content on mobile device and verifying navigation buttons stay accessible, don't hide critical content, and adapt to keyboard/browser chrome changes, delivering reliable navigation access.

**Acceptance Scenarios**:

1. **Given** user scrolls long prayer meditation text on mobile, **When** buttons are fixed at bottom, **Then** last line of content remains readable above buttons (adequate bottom padding)
2. **Given** user focuses input field (if any) and keyboard appears, **When** keyboard is visible, **Then** navigation buttons either move above keyboard or hide appropriately
3. **Given** user on mobile Safari scrolls, **When** address bar hides/shows, **Then** button position adjusts smoothly without jumping
4. **Given** user on landscape orientation mobile, **When** screen height is limited, **Then** buttons remain accessible without covering excessive content (or relocate to inline position)
5. **Given** user has accessibility zoom enabled, **When** navigating, **Then** buttons remain within viewport and don't require horizontal scrolling

---

### Edge Cases

- What happens when user rapidly taps buttons during animation transitions? (Animations should queue or debounce to prevent race conditions)
- How does the interface handle very long prayer texts that exceed screen height on mobile? (Content should scroll smoothly with buttons remaining accessible)
- What happens on extremely small screens (< 320px)? (Layout should degrade gracefully with simplified styling)
- How does the app handle landscape orientation on mobile? (Layout should adapt or remain functional, buttons may need repositioning)
- What happens when user has browser text size set to "Large" or "Extra Large"? (Text should scale without breaking layout)
- How does the interface behave on devices with notches or safe area insets (iPhone X+)? (Content should respect safe areas)
- What happens when user has high contrast mode enabled on mobile? (Decorative effects disable, maintaining basic functionality with high contrast)
- How does the app perform on low-end Android devices with limited RAM? (Animations should gracefully degrade, content remains accessible)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide minimum WCAG AA contrast ratios on mobile viewports (4.5:1 for body text, 3:1 for large headings) across all parchment background variations
- **FR-002**: System MUST adjust parchment background color/opacity on mobile devices to ensure text readability, even if this means reducing decorative parchment effects
- **FR-003**: System MUST style all buttons (primary and secondary) with medieval-themed colors, fonts, and decorative elements consistent with overall interface design
- **FR-004**: System MUST ensure button hit boxes (tap/click areas) precisely match visual button boundaries with no overflow or gaps
- **FR-005**: System MUST provide minimum touch target size of 48px × 48px for all interactive elements on mobile devices (iOS/Android accessibility guidelines)
- **FR-006**: System MUST execute page transition animations consistently or gracefully degrade to instant transitions rather than showing broken/incomplete animations
- **FR-007**: System MUST detect device performance capabilities and disable animations on low-performance devices to maintain usable navigation
- **FR-008**: System MUST queue or debounce rapid navigation button clicks to prevent animation race conditions and frozen states
- **FR-009**: System MUST respect user "Reduce Motion" preference by disabling all animations (0ms duration) without breaking navigation functionality
- **FR-010**: System MUST scale typography appropriately for mobile viewports (minimum 16px body text) without requiring horizontal scrolling
- **FR-011**: System MUST hide or simplify complex decorative elements (borders, marginalia) on viewports narrower than 600px to prevent visual clutter
- **FR-012**: System MUST position fixed navigation buttons to remain accessible while not obscuring final lines of content (adequate bottom padding/margin)
- **FR-013**: System MUST handle mobile browser chrome (address bar show/hide) and soft keyboard appearance without breaking button positioning
- **FR-014**: System MUST respect device safe area insets (notches, rounded corners on modern phones) to prevent content from being cut off
- **FR-015**: System MUST support viewport widths from 320px (iPhone SE) to 600px (large phones) without horizontal scrolling or broken layouts
- **FR-016**: System MUST maintain functionality when user browser text size is set to 200% (accessibility requirement)
- **FR-017**: System MUST provide visual feedback (color change, shadow, scale) for button active/pressed states on mobile touch interactions
- **FR-018**: System MUST work in both portrait and landscape orientations on mobile devices, adapting layout appropriately

### Key Entities

- **Mobile Viewport Breakpoint**: Critical screen width threshold (600px) below which mobile-specific styles, simplified decorations, and enhanced contrast are applied
- **Button Theme Styling**: Visual styling system for buttons including medieval-appropriate colors (derived from parchment palette), typography (matching heading fonts), decorative borders, and sizing that ensures minimum touch target compliance
- **Hit Box**: Interactive tap/click area for buttons, must precisely align with visual button boundaries (using CSS padding/border to match visual design, not transparent overflow areas)
- **Contrast Enhancement Layer**: Mobile-specific CSS adjustments that increase text-to-background contrast on parchment, potentially darkening parchment base color or adding semi-transparent overlay behind text
- **Animation Reliability System**: JavaScript logic that detects device capabilities (GPU support, performance metrics) and user preferences (prefers-reduced-motion, prefers-contrast) to determine whether to run full animations, simplified animations, or instant transitions
- **Safe Area Padding**: CSS padding/margin adjustments that respect device safe area insets (CSS env() variables) to prevent content from being obscured by notches, rounded corners, or system UI



## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All text content achieves minimum WCAG AA contrast ratio of 4.5:1 (body text) and 3:1 (headings) when measured on mobile devices at 375px viewport width
- **SC-002**: 100% of buttons have tap areas that precisely match visual boundaries (±2px tolerance) and meet minimum 48px × 48px size requirement
- **SC-003**: Page transitions complete successfully without visual glitches on 95% of mobile devices tested (iOS Safari 14+, Chrome Mobile 90+, Firefox Mobile 90+)
- **SC-004**: Users with "Reduce Motion" enabled experience 0ms transition times with no animation artifacts or broken states
- **SC-005**: App loads and displays readable content within 3 seconds on 3G mobile connections, even if decorative assets are still loading
- **SC-006**: No horizontal scrolling occurs on any viewport width from 320px to 600px across all major browsers
- **SC-007**: Fixed navigation buttons remain accessible (visible and tappable) in 100% of tested scenarios including: scrolled content, keyboard appearance, address bar hide/show, portrait/landscape orientations
- **SC-008**: All decorative elements (borders, marginalia, illuminated capitals) either scale appropriately or hide gracefully on mobile without causing layout shift or performance degradation
- **SC-009**: App remains fully functional when browser text size is increased to 200%, with all content accessible and no overlapping elements
- **SC-010**: Page transition animations complete within performance budget: 60fps on modern devices (iPhone 12+, recent Android), OR graceful degradation to instant transitions on older devices
- **SC-011**: Users can successfully complete a full prayer session (Petitions → Commandments → Creed) on mobile device without encountering navigation errors, frozen screens, or unreadable text
- **SC-012**: Button active/pressed states provide clear visual feedback within 100ms of touch on mobile devices
- **SC-013**: Content respects safe area insets on devices with notches (iPhone X+) with no text or buttons cut off by device chrome
- **SC-014**: App achieves mobile Lighthouse score of 90+ for accessibility and 85+ for performance when tested on simulated mid-range device (Moto G4)
