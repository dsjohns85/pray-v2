/**
 * Medieval Prayer Book - Illuminated Initial Capitals
 * Feature: 002-medieval-ui
 * Purpose: Process and style decorative first letters in major text sections
 */

// ============================================================================
// Configuration
// ============================================================================

const defaultConfig = {
  selector: 'h2, .petition-title, .meditation-text, .garland-text',
  colorPalette: [
    '#D4AF37', // Medieval gold
    '#1E3A8A', // Ultramarine blue
    '#E63946', // Vermillion red
    '#2D6A4F', // Verdigris green
  ],
  decorationStyle: 'simple',
  skipIfAlreadyProcessed: true
};

// Track processed elements to avoid re-processing
const processedElements = new WeakSet();

// Color index for cycling through palette
let currentColorIndex = 0;

// ============================================================================
// Core Processing Functions
// ============================================================================

/**
 * Process illuminated capitals for text elements within a root element
 * @param {HTMLElement} rootElement - Container to search within
 * @param {Object} options - Configuration options
 * @returns {number} Count of capitals processed
 */
export function processIlluminatedCapitals(rootElement, options = {}) {
  const config = { ...defaultConfig, ...options };
  
  if (!rootElement) {
    console.warn('processIlluminatedCapitals: rootElement is required');
    return 0;
  }
  
  // Find all matching elements
  const elements = rootElement.querySelectorAll(config.selector);
  let processedCount = 0;
  
  elements.forEach((element) => {
    // Skip if already processed
    if (config.skipIfAlreadyProcessed && processedElements.has(element)) {
      return;
    }
    
    // Skip if element already has illuminated capital
    if (element.querySelector('.illuminated-capital')) {
      processedElements.add(element);
      return;
    }
    
    // Process this element
    if (createIlluminatedCapital(element, config)) {
      processedElements.add(element);
      processedCount++;
    }
  });
  
  return processedCount;
}

/**
 * Create illuminated capital for a single element
 * @param {HTMLElement} element - Text element to enhance
 * @param {Object} config - Configuration
 * @returns {boolean} True if successfully processed
 */
function createIlluminatedCapital(element, config) {
  // Get text content
  const textContent = element.textContent.trim();
  
  if (!textContent || textContent.length === 0) {
    return false;
  }
  
  // Extract first letter (skip HTML tags if any)
  const firstLetter = textContent.charAt(0);
  
  // Only process alphabetic characters
  if (!/[A-Za-z]/.test(firstLetter)) {
    return false;
  }
  
  // Get color from palette (cycle through)
  const color = config.colorPalette[currentColorIndex % config.colorPalette.length];
  currentColorIndex = (currentColorIndex + 1) % config.colorPalette.length;
  
  // Get the first text node
  const firstTextNode = getFirstTextNode(element);
  
  if (!firstTextNode) {
    return false;
  }
  
  // Split text at first letter
  const originalText = firstTextNode.textContent;
  const restOfText = originalText.slice(1);
  
  // Create illuminated capital span
  const capitalSpan = document.createElement('span');
  capitalSpan.className = 'illuminated-capital';
  capitalSpan.textContent = firstLetter;
  capitalSpan.style.color = color;
  capitalSpan.setAttribute('aria-hidden', 'true');
  
  // Create visually-hidden span for screen readers (preserve full text)
  const srSpan = document.createElement('span');
  srSpan.className = 'visually-hidden';
  srSpan.textContent = firstLetter;
  
  // Replace first text node with our structure
  const parentNode = firstTextNode.parentNode;
  const newTextNode = document.createTextNode(restOfText);
  
  // Insert in order: sr-span (hidden), capital-span (visible), rest-of-text
  parentNode.insertBefore(srSpan, firstTextNode);
  parentNode.insertBefore(capitalSpan, firstTextNode);
  parentNode.insertBefore(newTextNode, firstTextNode);
  parentNode.removeChild(firstTextNode);
  
  return true;
}

/**
 * Get the first text node within an element
 * @param {HTMLElement} element - Element to search
 * @returns {Text|null} First text node or null
 */
function getFirstTextNode(element) {
  // Walk through child nodes to find first text node with content
  for (let node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      return node;
    }
    
    // If it's an element, recursively search
    if (node.nodeType === Node.ELEMENT_NODE) {
      const textNode = getFirstTextNode(node);
      if (textNode) {
        return textNode;
      }
    }
  }
  
  return null;
}

/**
 * Remove illuminated capitals and restore original text
 * @param {HTMLElement} rootElement - Container to search within
 * @returns {number} Count of capitals removed
 */
export function removeIlluminatedCapitals(rootElement) {
  if (!rootElement) {
    console.warn('removeIlluminatedCapitals: rootElement is required');
    return 0;
  }
  
  const illuminatedSpans = rootElement.querySelectorAll('.illuminated-capital');
  let removedCount = 0;
  
  illuminatedSpans.forEach((span) => {
    const parent = span.parentElement;
    
    // Find associated visually-hidden span
    const srSpan = parent.querySelector('.visually-hidden');
    
    // Get the capital letter
    const capitalLetter = span.textContent;
    
    // Find the text node after the capital
    let textNode = span.nextSibling;
    while (textNode && textNode.nodeType !== Node.TEXT_NODE) {
      textNode = textNode.nextSibling;
    }
    
    if (textNode) {
      // Prepend the capital letter back to the text
      textNode.textContent = capitalLetter + textNode.textContent;
    } else {
      // Create a new text node with the capital
      const newTextNode = document.createTextNode(capitalLetter);
      parent.insertBefore(newTextNode, span);
    }
    
    // Remove the spans
    if (srSpan) {
      srSpan.remove();
    }
    span.remove();
    
    removedCount++;
  });
  
  // Clear processed tracking
  currentColorIndex = 0;
  
  return removedCount;
}

/**
 * Reset color index (useful for consistent color assignment)
 */
export function resetColorIndex() {
  currentColorIndex = 0;
}

