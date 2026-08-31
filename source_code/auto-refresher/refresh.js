const idleTimeoutMs = 600 * 1000; // 10 minutes (600s)
let idleTimer;
let lastResetTime; // Track when the timer started

function resetTimer() {
    clearTimeout(idleTimer);
    lastResetTime = Date.now(); // Record exact time of last activity

    idleTimer = setTimeout(() => {
        window.location.reload();
    }, idleTimeoutMs);
}

// Global function to check remaining time in console
window.checkTimeLeft = function() {
    const elapsed = Date.now() - lastResetTime;
    const remainingSeconds = Math.max(0, Math.round((idleTimeoutMs - elapsed) / 1000));
    console.log(`Refresh in: ${remainingSeconds} seconds`);
    return remainingSeconds;
};

// User activity listeners
const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
activityEvents.forEach(eventName => {
    window.addEventListener(eventName, resetTimer, { passive: true });
});

// Start the timer on initial load
resetTimer();