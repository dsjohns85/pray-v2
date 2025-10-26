/**
 * Medieval Prayer Book - Decorative Borders and Marginalia
 * Feature: 002-medieval-ui
 * Purpose: Load and manage SVG decorative elements for key screens
 */

// ============================================================================
// Configuration
// ============================================================================

const decorationConfig = {
  // Screens that should have decorations
  screenMapping: {
    'welcome': 'full',      // Full corner decorations
    'amen-screen': 'corners', // Just corners
    'end-screen': 'full'    // Full corner decorations
  },
  
  // Asset paths
  assetPath: './assets/decorations/',
  
  // Decoration files
  cornerFiles: {
    'tl': 'corner-flourish-tl.svg',
    'tr': 'corner-flourish-tr.svg',
    'bl': 'corner-flourish-bl.svg',
    'br': 'corner-flourish-br.svg'
  },
  
  // Responsive behavior
  hideOnMobile: true,
  mobileBreakpoint: 600
};

// Track loaded decorations
const loadedDecorations = new WeakMap();

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Load decorations for a specific screen
 * @param {HTMLElement} screenElement - Screen element to decorate
 * @param {string} decorationType - Type of decoration ('full', 'corners', 'top')
 * @returns {Promise<number>} Number of decorations loaded
 */
export async function loadDecorationsForScreen(screenElement, decorationType = 'full') {
  if (!screenElement) {
    console.warn('loadDecorationsForScreen: screenElement is required');
    return 0;
  }
  
  // Check if decorations already loaded
  if (loadedDecorations.has(screenElement)) {
    return 0; // Already decorated
  }
  
  // Check responsive hiding
  if (decorationConfig.hideOnMobile && window.innerWidth < decorationConfig.mobileBreakpoint) {
    return 0; // Skip on mobile
  }
  
  // Remove any existing decorations first
  removeDecorations(screenElement);
  
  // Create decoration container
  const container = document.createElement('div');
  container.className = 'decorative-border-container';
  container.setAttribute('aria-hidden', 'true');
  
  let loadedCount = 0;
  
  // Load corner decorations
  if (decorationType === 'full' || decorationType === 'corners') {
    for (const [position, filename] of Object.entries(decorationConfig.cornerFiles)) {
      try {
        const decoration = await loadSVGDecoration(filename, position);
        container.appendChild(decoration);
        loadedCount++;
      } catch (error) {
        console.warn(`Failed to load decoration ${filename}:`, error);
      }
    }
  }
  
  // Add container to screen
  if (loadedCount > 0) {
    screenElement.appendChild(container);
    loadedDecorations.set(screenElement, container);
  }
  
  return loadedCount;
}

/**
 * Load a single SVG decoration
 * @param {string} filename - SVG filename
 * @param {string} position - Position identifier ('tl', 'tr', 'bl', 'br')
 * @returns {Promise<HTMLElement>} Decoration element
 */
async function loadSVGDecoration(filename, position) {
  const response = await fetch(decorationConfig.assetPath + filename);
  if (!response.ok) {
    throw new Error(`Failed to fetch SVG decoration "${filename}" (status: ${response.status})`);
  }
  const svgText = await response.text();
  
  // Create wrapper div
  const wrapper = document.createElement('div');
  wrapper.className = `decoration decoration-${position}`;
  wrapper.innerHTML = svgText;
  
  return wrapper;
}

/**
 * Remove decorations from a screen
 * @param {HTMLElement} screenElement - Screen element to clean
 * @returns {boolean} True if decorations were removed
 */
export function removeDecorations(screenElement) {
  if (!screenElement) {
    return false;
  }
  
  const container = loadedDecorations.get(screenElement);
  
  if (container && container.parentNode) {
    container.remove();
    loadedDecorations.delete(screenElement);
    return true;
  }
  
  // Also check for any orphaned decoration containers
  const orphanedContainers = screenElement.querySelectorAll('.decorative-border-container');
  orphanedContainers.forEach(c => c.remove());
  
  return orphanedContainers.length > 0;
}

/**
 * Auto-load decorations based on screen ID
 * @param {HTMLElement} screenElement - Screen element
 * @returns {Promise<number>} Number of decorations loaded
 */
export async function autoLoadDecorations(screenElement) {
  if (!screenElement || !screenElement.id) {
    return 0;
  }
  
  const decorationType = decorationConfig.screenMapping[screenElement.id];
  
  if (!decorationType) {
    return 0; // This screen doesn't have decorations
  }
  
  return await loadDecorationsForScreen(screenElement, decorationType);
}

// ============================================================================
// Responsive Handling
// ============================================================================

// Listen for resize to show/hide decorations on mobile
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const isMobile = window.innerWidth < decorationConfig.mobileBreakpoint;
    
    document.querySelectorAll('.decorative-border-container').forEach(container => {
      if (isMobile && decorationConfig.hideOnMobile) {
        container.style.display = 'none';
      } else {
        container.style.display = 'block';
      }
    });
  }, 250);
});

