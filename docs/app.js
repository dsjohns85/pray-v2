// Luther Prayer Guide - Main Application
// ES6 Module - No dependencies

// Import content modules
import { petitions, amen } from './content/petitions.js';
import { commandments } from './content/commandments.js';
import { creed } from './content/creed.js';

// Import medieval UI enhancement modules
import { initAnimations, transitionToPage } from './animations.js';
import { processIlluminatedCapitals } from './illuminated.js';
import { autoLoadDecorations } from './decorations.js';

// Application State
const appState = {
    currentSection: null,        // 'petitions' | 'commandments' | 'creed' | 'amen' | 'welcome' | 'end'
    currentIndex: 0,             // Index within current section (0-based)
    currentView: null,           // 'text' | 'meditation' | 'instruction' | 'thanksgiving' | 'confession' | 'prayer'
    startTime: null,             // Session start timestamp
    contentData: {
        petitions: [],
        commandments: [],
        creed: [],
        amen: null
    }
};

// DOM Elements
const elements = {
    welcome: document.getElementById('welcome'),
    content: document.getElementById('content'),
    amenScreen: document.getElementById('amen-screen'),
    commandmentsEnd: document.getElementById('commandments-end'),
    endScreen: document.getElementById('end-screen'),
    navControls: document.getElementById('nav-controls'),
    contentTitle: document.getElementById('content-title'),
    contentText: document.getElementById('content-text'),
    amenText: document.getElementById('amen-text'),
    startButton: document.getElementById('start-button'),
    nextButton: document.getElementById('next-button'),
    endSessionButton: document.getElementById('end-session-button'),
    continueCommandments: document.getElementById('continue-commandments'),
    endFromAmen: document.getElementById('end-from-amen'),
    continueCreed: document.getElementById('continue-creed'),
    endFromCommandments: document.getElementById('end-from-commandments'),
    restartButton: document.getElementById('restart-button'),
    completionMessage: document.getElementById('completion-message')
};

// Initialize Application
async function init() {
    try {
        // Initialize medieval animations system
        initAnimations();

        // Load content (will be implemented when content files are created)
        await loadContent();

        // Set up event listeners
        setupEventListeners();

        // Try to load saved state
        const savedState = loadState();
        if (savedState && savedState.currentSection) {
            // Resume saved session
            Object.assign(appState, savedState);
            renderCurrentState();
        } else {
            // Show welcome screen
            showScreen('welcome');
        }
        
        // Process illuminated capitals on welcome screen
        processIlluminatedCapitals(elements.welcome);
        
        // Load decorations on welcome screen
        autoLoadDecorations(elements.welcome);
    } catch (error) {
        console.error('Failed to initialize app:', error);
        alert('Failed to load prayer guide. Please refresh the page.');
    }
}

// Load Content from Content Modules
async function loadContent() {
    try {
        // Load petitions content
        appState.contentData.petitions = petitions;
        appState.contentData.amen = amen;

        // Load commandments content
        appState.contentData.commandments = commandments;

        // Load creed content
        appState.contentData.creed = creed;
    } catch (error) {
        console.error('Failed to load content:', error);
        throw error;
    }
}

// Set Up Event Listeners
function setupEventListeners() {
    elements.startButton.addEventListener('click', startPrayer);
    elements.nextButton.addEventListener('click', next);
    elements.endSessionButton.addEventListener('click', endSession);
    elements.continueCommandments.addEventListener('click', continueToCommandments);
    elements.endFromAmen.addEventListener('click', endSession);
    elements.continueCreed.addEventListener('click', continueToCreed);
    elements.endFromCommandments.addEventListener('click', endSession);
    elements.restartButton.addEventListener('click', restart);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

// Handle Keyboard Events
function handleKeyboard(event) {
    if (appState.currentSection === 'welcome' || appState.currentSection === 'end') {
        return;
    }

    if (event.key === 'Enter') {
        // Enter = Next
        next();
    } else if (event.key === 'Escape') {
        // Escape = End Session
        if (confirm('Are you sure you want to end this prayer session?')) {
            endSession();
        }
    }
}

// Start Prayer Session
function startPrayer() {
    appState.currentSection = 'petitions';
    appState.currentIndex = 0;
    appState.currentView = 'text';
    appState.startTime = new Date().toISOString();
    saveState();
    renderCurrentState();
}

// Navigate to Next View
function next() {
    const section = appState.currentSection;
    const index = appState.currentIndex;
    const view = appState.currentView;

    if (section === 'petitions') {
        if (view === 'text') {
            // Move to meditation
            appState.currentView = 'meditation';
        } else if (view === 'meditation') {
            // Move to next petition or amen
            if (index < appState.contentData.petitions.length - 1) {
                appState.currentIndex++;
                appState.currentView = 'text';
            } else {
                // Completed all petitions, show amen
                showScreen('amen-screen');
                return;
            }
        }
    } else if (section === 'commandments') {
        const views = ['text', 'instruction', 'thanksgiving', 'confession', 'prayer'];
        const currentViewIndex = views.indexOf(view);

        if (currentViewIndex < views.length - 1) {
            // Move to next garland strand
            appState.currentView = views[currentViewIndex + 1];
        } else {
            // Move to next commandment or end
            if (index < appState.contentData.commandments.length - 1) {
                appState.currentIndex++;
                appState.currentView = 'text';
            } else {
                // Completed all commandments
                showScreen('commandments-end');
                return;
            }
        }
    } else if (section === 'creed') {
        const views = ['text', 'instruction', 'thanksgiving', 'confession', 'prayer'];
        const currentViewIndex = views.indexOf(view);

        if (currentViewIndex < views.length - 1) {
            // Move to next garland strand
            appState.currentView = views[currentViewIndex + 1];
        } else {
            // Move to next creed article or end
            if (index < appState.contentData.creed.length - 1) {
                appState.currentIndex++;
                appState.currentView = 'text';
            } else {
                // Completed all creed articles
                elements.completionMessage.textContent = 'You have completed the full prayer journey through the Petitions, Commandments, and Creed. May God bless you.';
                showScreen('end-screen');
                return;
            }
        }
    }

    saveState();
    renderCurrentState();
}

// Continue to Commandments
function continueToCommandments() {
    appState.currentSection = 'commandments';
    appState.currentIndex = 0;
    appState.currentView = 'text';
    saveState();
    renderCurrentState();
}

// Continue to Creed
function continueToCreed() {
    appState.currentSection = 'creed';
    appState.currentIndex = 0;
    appState.currentView = 'text';
    saveState();
    renderCurrentState();
}

// End Session
function endSession() {
    const section = appState.currentSection;

    if (section === 'petitions' || section === 'amen-screen') {
        elements.completionMessage.textContent = 'Thank you for praying through the Lord\'s Prayer with Luther\'s guidance.';
    } else if (section === 'commandments' || section === 'commandments-end') {
        elements.completionMessage.textContent = 'Thank you for praying through the Commandments with Luther\'s guidance.';
    } else {
        elements.completionMessage.textContent = 'Thank you for praying with Luther\'s guide.';
    }

    showScreen('end-screen');
}

// Restart Session
function restart() {
    clearState();
    appState.currentSection = null;
    appState.currentIndex = 0;
    appState.currentView = null;
    appState.startTime = null;
    showScreen('welcome');
}

// Render Current State
function renderCurrentState() {
    const section = appState.currentSection;
    const index = appState.currentIndex;
    const view = appState.currentView;

    if (section === 'petitions') {
        renderPetition(index, view);
    } else if (section === 'commandments') {
        renderCommandment(index, view);
    } else if (section === 'creed') {
        renderCreed(index, view);
    }

    showScreen('content');
    
    // Process illuminated capitals after content is rendered
    processIlluminatedCapitals(elements.content);
}

// Render Petition Content
function renderPetition(index, view) {
    const petition = appState.contentData.petitions[index];

    if (!petition) {
        elements.contentTitle.textContent = 'Content Not Available';
        elements.contentText.innerHTML = '<p>Petition content is being loaded...</p>';
        return;
    }

    elements.contentTitle.textContent = petition.title;

    if (view === 'text') {
        elements.contentText.innerHTML = `<div class="petition-text">${petition.petitionText}</div>`;
    } else if (view === 'meditation') {
        elements.contentText.innerHTML = `<div class="meditation-text">${formatText(petition.meditation)}</div>`;
    }
}

// Render Commandment Content
function renderCommandment(index, view) {
    const commandment = appState.contentData.commandments[index];

    if (!commandment) {
        elements.contentTitle.textContent = 'Content Not Available';
        elements.contentText.innerHTML = '<p>Commandment content is being loaded...</p>';
        return;
    }

    elements.contentTitle.textContent = commandment.title;

    if (view === 'text') {
        elements.contentText.innerHTML = `<div class="petition-text">${commandment.commandmentText}</div>`;
    } else if (view === 'instruction') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Instruction</span>
            <div class="garland-text">${formatText(commandment.garland.instruction)}</div>
        `;
    } else if (view === 'thanksgiving') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Thanksgiving</span>
            <div class="garland-text">${formatText(commandment.garland.thanksgiving)}</div>
        `;
    } else if (view === 'confession') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Confession</span>
            <div class="garland-text">${formatText(commandment.garland.confession)}</div>
        `;
    } else if (view === 'prayer') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Prayer</span>
            <div class="garland-text">${formatText(commandment.garland.prayer)}</div>
        `;
    }
}

// Render Creed Content
function renderCreed(index, view) {
    const article = appState.contentData.creed[index];

    if (!article) {
        elements.contentTitle.textContent = 'Content Not Available';
        elements.contentText.innerHTML = '<p>Creed content is being loaded...</p>';
        return;
    }

    elements.contentTitle.textContent = article.title;

    if (view === 'text') {
        elements.contentText.innerHTML = `<div class="petition-text">${article.creedText}</div>`;
    } else if (view === 'instruction') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Instruction</span>
            <div class="garland-text">${formatText(article.garland.instruction)}</div>
        `;
    } else if (view === 'thanksgiving') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Thanksgiving</span>
            <div class="garland-text">${formatText(article.garland.thanksgiving)}</div>
        `;
    } else if (view === 'confession') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Confession</span>
            <div class="garland-text">${formatText(article.garland.confession)}</div>
        `;
    } else if (view === 'prayer') {
        elements.contentText.innerHTML = `
            <span class="garland-label">Prayer</span>
            <div class="garland-text">${formatText(article.garland.prayer)}</div>
        `;
    }
}

// Format Text (preserve line breaks)
function formatText(text) {
    return text.split('\n').map(p => `<p>${p}</p>`).join('');
}

// Show Screen
async function showScreen(screenName) {
    // Find currently active screen
    const currentScreen = document.querySelector('.section.active');
    
    // Map screen names to elements
    const screens = {
        'welcome': elements.welcome,
        'content': elements.content,
        'amen-screen': elements.amenScreen,
        'commandments-end': elements.commandmentsEnd,
        'end-screen': elements.endScreen
    };
    
    const nextScreen = screens[screenName];
    
    if (!nextScreen) {
        console.error('Invalid screen name:', screenName);
        return;
    }
    
    // Prepare special screen content before transition
    if (screenName === 'amen-screen') {
        // Render amen content
        if (appState.contentData.amen) {
            elements.amenText.innerHTML = formatText(appState.contentData.amen.content);
        }
    }
    
    // If there's a current screen and it's different from the next screen, animate
    if (currentScreen && currentScreen !== nextScreen) {
        // Remove active class from current screen first
        currentScreen.classList.remove('active');
        
        // Add active class to next screen (for display purposes)
        nextScreen.classList.add('active');
        
        // Determine direction (forward or back)
        const direction = determineTransitionDirection(currentScreen, nextScreen);
        
        // Execute transition animation
        await transitionToPage(currentScreen, nextScreen, direction);
    } else {
        // No transition needed, just show the screen
        // Hide all sections
        elements.welcome.classList.remove('active');
        elements.content.classList.remove('active');
        elements.amenScreen.classList.remove('active');
        elements.commandmentsEnd.classList.remove('active');
        elements.endScreen.classList.remove('active');
        
        // Show selected screen
        nextScreen.classList.add('active');
    }
    
    // Show/hide navigation controls
    if (screenName === 'content') {
        elements.navControls.classList.add('active');
    } else {
        elements.navControls.classList.remove('active');
    }
    
    // Handle end screen state clearing
    if (screenName === 'end-screen') {
        clearState(); // Clear localStorage when ending
    }

    // Process illuminated capitals for the new screen
    processIlluminatedCapitals(nextScreen);
    
    // Load decorations for designated screens
    autoLoadDecorations(nextScreen);

    // Scroll to top
    window.scrollTo(0, 0);
}

/**
 * Determine transition direction based on screen flow
 * @param {HTMLElement} fromScreen - Current screen
 * @param {HTMLElement} toScreen - Target screen
 * @returns {string} 'forward' or 'back'
 */
function determineTransitionDirection(fromScreen, toScreen) {
    // Define screen order for forward progression
    const screenOrder = [
        elements.welcome,
        elements.content,
        elements.amenScreen,
        elements.commandmentsEnd,
        elements.endScreen
    ];
    
    const fromIndex = screenOrder.indexOf(fromScreen);
    const toIndex = screenOrder.indexOf(toScreen);

    // If either screen is not found, default to 'forward'
    if (fromIndex === -1 || toIndex === -1) {
        return 'forward';
    }
    
    // If going back to welcome, it's a back transition
    if (toScreen === elements.welcome) {
        return 'back';
    }
    
    // Otherwise, determine by index
    return toIndex > fromIndex ? 'forward' : 'back';
}

// Save State to localStorage
function saveState() {
    try {
        const stateToSave = {
            currentSection: appState.currentSection,
            currentIndex: appState.currentIndex,
            currentView: appState.currentView,
            startTime: appState.startTime
        };
        localStorage.setItem('pray-v2-state', JSON.stringify(stateToSave));
    } catch (error) {
        console.warn('Failed to save state to localStorage:', error);
        // Silently fail - app will still work without persistence
    }
}

// Load State from localStorage
function loadState() {
    try {
        const savedState = localStorage.getItem('pray-v2-state');
        if (savedState) {
            return JSON.parse(savedState);
        }
    } catch (error) {
        console.warn('Failed to load state from localStorage:', error);
    }
    return null;
}

// Clear State from localStorage
function clearState() {
    try {
        localStorage.removeItem('pray-v2-state');
    } catch (error) {
        console.warn('Failed to clear state from localStorage:', error);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
