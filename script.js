/* ==========================================
   GLOBAL VARIABLES & AUDIO CONTEXT
   ========================================== */

// Audio Context (initialized after user interaction)
let audioContext = null;
let isMuted = false;
let audioInitialized = false;

// Check localStorage for mute preference
if (localStorage.getItem('valentine-muted') === 'true') {
    isMuted = true;
}

/* ==========================================
   AUDIO INITIALIZATION
   ========================================== */

/**
 * Initialize Web Audio API context
 * Must be called after user interaction
 */
function initAudio() {
    if (audioInitialized) return;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioInitialized = true;
        console.log('Audio initialized');
    } catch (e) {
        console.warn('Web Audio API not supported', e);
    }
}

/* ==========================================
   SOUND GENERATION FUNCTIONS
   ========================================== */

/**
 * Play a sound effect using Web Audio API
 * @param {string} type - Type of sound to play
 */
function playSound(type) {
    if (isMuted || !audioContext) return;
    
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
        case 'click':
            // Simple click sound
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
            
        case 'hover':
            // Subtle hover sound
            oscillator.frequency.setValueAtTime(600, now);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            oscillator.start(now);
            oscillator.stop(now + 0.05);
            break;
            
        case 'dodge':
            // Playful dodge sound
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.15);
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            oscillator.start(now);
            oscillator.stop(now + 0.15);
            break;
            
        case 'error':
            // Error buzz
            oscillator.frequency.setValueAtTime(200, now);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.setValueAtTime(0.2, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
            break;
            
        case 'success':
            // Success chime (multiple tones)
            playSuccessChord(now);
            return; // Don't cleanup here, handled in playSuccessChord
            
        case 'celebration':
            // Celebration melody
            playCelebrationMelody(now);
            return; // Don't cleanup here, handled in playCelebrationMelody
            
        case 'select':
            // Selection sound
            oscillator.frequency.setValueAtTime(500, now);
            oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.25, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
            break;
            
        default:
            oscillator.frequency.setValueAtTime(440, now);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
    }
}

/**
 * Play a success chord (C major)
 */
function playSuccessChord(startTime) {
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    const duration = 0.4;
    
    frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime + index * 0.05);
        oscillator.stop(startTime + duration);
    });
}

/**
 * Play a celebration melody
 */
function playCelebrationMelody(startTime) {
    // Happy melody notes: C, E, G, C (higher)
    const melody = [
        { freq: 523.25, duration: 0.15 }, // C5
        { freq: 659.25, duration: 0.15 }, // E5
        { freq: 783.99, duration: 0.15 }, // G5
        { freq: 1046.50, duration: 0.3 }  // C6
    ];
    
    let currentTime = startTime;
    
    melody.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        currentTime += note.duration;
    });
}

/* ==========================================
   MUTE TOGGLE FUNCTIONALITY
   ========================================== */

/**
 * Toggle mute state and update UI
 */
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('valentine-muted', isMuted.toString());
    updateMuteButton();
    
    // Play a sound to confirm unmuting (if unmuting)
    if (!isMuted) {
        playSound('click');
    }
}

/**
 * Update mute button visual state
 */
function updateMuteButton() {
    const muteToggle = document.getElementById('muteToggle');
    if (!muteToggle) return;
    
    const soundOn = muteToggle.querySelector('.sound-on');
    const soundOff = muteToggle.querySelector('.sound-off');
    
    if (isMuted) {
        soundOn.style.display = 'none';
        soundOff.style.display = 'block';
        muteToggle.setAttribute('aria-label', 'Unmute sounds');
    } else {
        soundOn.style.display = 'block';
        soundOff.style.display = 'none';
        muteToggle.setAttribute('aria-label', 'Mute sounds');
    }
}

/* ==========================================
   INITIALIZATION ON PAGE LOAD
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const muteToggle = document.getElementById('muteToggle');
    
    // Set initial mute button state
    updateMuteButton();
    
    // Add mute toggle listener
    if (muteToggle) {
        muteToggle.addEventListener('click', () => {
            if (!audioInitialized) {
                initAudio();
            }
            toggleMute();
        });
    }
    
    // Initialize audio on first user interaction
    const initOnInteraction = () => {
        if (!audioInitialized) {
            initAudio();
        }
        // Remove listeners after first initialization
        document.removeEventListener('click', initOnInteraction);
        document.removeEventListener('touchstart', initOnInteraction);
        document.removeEventListener('keydown', initOnInteraction);
    };
    
    document.addEventListener('click', initOnInteraction);
    document.addEventListener('touchstart', initOnInteraction);
    document.addEventListener('keydown', initOnInteraction);
});

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

/**
 * Add smooth scroll behavior for hash links
 */
function smoothScrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ==========================================
   EXPORT FOR USE IN OTHER SCRIPTS
   ========================================== */

// Make functions available globally
window.playSound = playSound;
window.toggleMute = toggleMute;
window.smoothScrollToElement = smoothScrollToElement;
window.debounce = debounce;
window.prefersReducedMotion = prefersReducedMotion;
