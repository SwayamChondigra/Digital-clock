let intervalId = null;
let isCustomTime = false;
let customTime = null;

function updateClock() {
    const clockElement = document.getElementById('clock');
    let now;

    if (isCustomTime && customTime) {
        now = new Date(customTime);
        // Increment custom time by 1 second
        customTime = new Date(customTime.getTime() + 1000);
    } else {
        now = new Date();
    }

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Format time as HH:MM:SS with leading zeros
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const currentTime = `${hours}:${minutes}:${seconds}`;
    clockElement.textContent = currentTime;
}

function startClock() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(updateClock, 1000);
    updateClock();
}

function setCustomTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();
    customTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    isCustomTime = true;
    updateClock();
}

function resetClock() {
    isCustomTime = false;
    customTime = null;
    updateClock();
}

document.addEventListener('DOMContentLoaded', () => {
    const setTimeBtn = document.getElementById('setTimeBtn');
    const resetTimeBtn = document.getElementById('resetTimeBtn');
    const timeInput = document.getElementById('timeInput');

    setTimeBtn.addEventListener('click', () => {
        if (timeInput.value) {
            setCustomTime(timeInput.value);
        }
    });

    resetTimeBtn.addEventListener('click', () => {
        resetClock();
    });

    startClock();
});
