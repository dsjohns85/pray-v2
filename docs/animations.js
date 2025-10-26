/**
 * Medieval Prayer Book - Page Transition Animations
 * Feature: 002-medieval-ui
 * Purpose: WAAPI-based contemplative page transitions (800-1200ms)
 */

// ============================================================================
// Animation Configuration State
// ============================================================================

const animationConfig = {
  // Timing
  normalDuration: 1000,          // 1 second for normal transitions
  reducedMotionDuration: 0,      // Instant for reduced motion
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material ease-in-out
  mobileBreakpoint: 600,
  mobileAnimationScale: 0.6,     // 60% of desktop timing on mobile
  
  // User preferences (detected at runtime)
  prefersReducedMotion: false,
  currentBreakpoint: 'desktop',
  
  // Animation queue
  animationQueue: [],
  activeTransition: null
};

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize animation system with optional custom configuration
 * @param {Object} config - Optional configuration overrides
 */
export function initAnimations(config = {}) {
  // Merge custom config
  Object.assign(animationConfig, config);
  
  // Detect user preferences
  detectUserPreferences();
  
  // Listen for preference changes
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotionQuery.addEventListener('change', detectUserPreferences);
  
  // Listen for viewport changes
  window.addEventListener('resize', detectBreakpoint);
  
  // Emit ready event
  window.dispatchEvent(new CustomEvent('animationSystemReady', {
    detail: { config: animationConfig }
  }));
}

/**
 * Detect user motion and accessibility preferences
 */
function detectUserPreferences() {
  animationConfig.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  detectBreakpoint();
}

/**
 * Detect current viewport breakpoint
 */
function detectBreakpoint() {
  const width = window.innerWidth;
  if (width < animationConfig.mobileBreakpoint) {
    animationConfig.currentBreakpoint = 'mobile';
  } else {
    animationConfig.currentBreakpoint = 'desktop';
  }
}

/**
 * Get current animation configuration
 * @returns {Object} Current animation config
 */
export function getAnimationConfig() {
  return {
    duration: getDuration(),
    easing: animationConfig.easing,
    prefersReducedMotion: animationConfig.prefersReducedMotion,
    currentBreakpoint: animationConfig.currentBreakpoint
  };
}

/**
 * Calculate appropriate duration based on preferences and viewport
 * @returns {number} Duration in milliseconds
 */
function getDuration() {
  if (animationConfig.prefersReducedMotion) {
    return animationConfig.reducedMotionDuration;
  }
  
  let duration = animationConfig.normalDuration;
  
  // Scale down on mobile for better performance
  if (animationConfig.currentBreakpoint === 'mobile') {
    duration *= animationConfig.mobileAnimationScale;
  }
  
  return duration;
}

// ============================================================================
// Page Transition Animation
// ============================================================================

/**
 * Execute page-turning transition between two elements
 * @param {HTMLElement} fromElement - Current page being exited
 * @param {HTMLElement} toElement - New page being entered
 * @param {string} direction - 'forward' or 'back'
 * @returns {Promise<void>} Resolves when transition completes
 */
export async function transitionToPage(fromElement, toElement, direction = 'forward') {
  // Validation
  if (!fromElement || !toElement) {
    throw new Error('Both fromElement and toElement are required');
  }
  
  if (fromElement === toElement) {
    throw new Error('fromElement and toElement must be different');
  }
  
  // If transition already active, queue this one
  if (animationConfig.activeTransition) {
    return new Promise((resolve) => {
      animationConfig.animationQueue.push({ fromElement, toElement, direction, resolve });
    });
  }
  
  // Mark transition as active
  animationConfig.activeTransition = { fromElement, toElement, direction };
  
  // Emit start event
  window.dispatchEvent(new CustomEvent('pageTransitionStart', {
    detail: { from: fromElement, to: toElement, direction }
  }));
  
  const startTime = performance.now();
  const duration = getDuration();
  
  try {
    // Execute the transition
    await executeTransition(fromElement, toElement, direction, duration);
    
    // Calculate actual duration
    const actualDuration = performance.now() - startTime;
    
    // Emit end event
    window.dispatchEvent(new CustomEvent('pageTransitionEnd', {
      detail: { to: toElement, duration: actualDuration }
    }));
  } finally {
    // Clear active transition
    animationConfig.activeTransition = null;
    
    // Process queue if items exist
    if (animationConfig.animationQueue.length > 0) {
      const next = animationConfig.animationQueue.shift();
      transitionToPage(next.fromElement, next.toElement, next.direction)
        .then(next.resolve);
    }
  }
}

/**
 * Execute the actual WAAPI transition
 * @param {HTMLElement} fromElement - Element to exit
 * @param {HTMLElement} toElement - Element to enter
 * @param {string} direction - 'forward' or 'back'
 * @param {number} duration - Duration in milliseconds
 */
async function executeTransition(fromElement, toElement, direction, duration) {
  const timing = {
    duration,
    easing: animationConfig.easing,
    fill: 'forwards'
  };
  
  // Prepare new page (hidden initially)
  toElement.style.display = 'block';
  toElement.style.opacity = '0';
  
  // Add will-change hint for performance
  fromElement.style.willChange = 'transform, opacity';
  toElement.style.willChange = 'transform, opacity';
  
  // If duration is 0 (reduced motion), just swap immediately
  if (duration === 0) {
    fromElement.style.display = 'none';
    toElement.style.opacity = '1';
    return;
  }
  
  // Define keyframes based on direction
  const exitAngle = direction === 'forward' ? -15 : 15;
  const enterAngle = direction === 'forward' ? 15 : -15;
  
  // Note: The perspective value here (1200px) matches the CSS 'perspective: 1200px' for visual consistency.
  const perspectiveValue = '1200px';

  const exitKeyframes = [
    { 
      transform: `perspective(${perspectiveValue}) rotateY(0deg) scale(1)`, 
      opacity: 1 
    },
    { 
      transform: `perspective(${perspectiveValue}) rotateY(${exitAngle}deg) scale(0.95)`, 
      opacity: 0 
    }
  ];
  
  const enterKeyframes = [
    { 
      transform: `perspective(${perspectiveValue}) rotateY(${enterAngle}deg) scale(0.95)`, 
      opacity: 0 
    },
    { 
      transform: `perspective(${perspectiveValue}) rotateY(0deg) scale(1)`, 
      opacity: 1 
    }
  ];
  
  // Execute exit animation
  const exitAnimation = fromElement.animate(exitKeyframes, timing);
  await exitAnimation.finished;
  
  // Hide exited page
  fromElement.style.display = 'none';
  
  // Execute enter animation
  const enterAnimation = toElement.animate(enterKeyframes, timing);
  await enterAnimation.finished;
  
  // Cleanup will-change hints
  fromElement.style.willChange = 'auto';
  toElement.style.willChange = 'auto';
  
  // Ensure final state
  toElement.style.opacity = '1';
  toElement.style.transform = 'none';
}

/**
 * Cancel any active transition immediately
 * @returns {boolean} True if a transition was canceled
 */
export function cancelActiveTransition() {
  if (!animationConfig.activeTransition) {
    return false;
  }
  
  // Clear queue and active transition
  animationConfig.animationQueue = [];
  const canceled = animationConfig.activeTransition;
  animationConfig.activeTransition = null;
  
  // Emit canceled event
  window.dispatchEvent(new CustomEvent('pageTransitionCanceled', {
    detail: { transition: canceled }
  }));
  
  return true;
}

