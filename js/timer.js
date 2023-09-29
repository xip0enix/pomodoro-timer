// Set the timer durations in minutes
const workDuration = 25;
const breakDuration = 5;
const longBreakDuration = 15;
let pomodoroStreak = 0;

// Get the HTML elements
const bodyElement = document.body;
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const separatorElement = document.getElementById("separator");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const roundcounter = document.getElementById("lap");

// Initialize the timer variables
let currentDuration = workDuration;
let secondsRemaining = currentDuration * 60;
let intervalId;

// Format the remaining time as MM:SS and update the HTML elements
function updateTimer() {
const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, "0");
const seconds = (secondsRemaining % 60).toString().padStart(2, "0");
minutesElement.textContent = minutes;
secondsElement.textContent = seconds;

if (currentDuration === workDuration) {
  // Update the page title with the remaining time
  document.title = `${minutes}:${seconds} - Time to focus!`;
} else {
  // Pause
  document.title = `${minutes}:${seconds} - Time for a break!`;
}

}

// Start the timer
function startTimer() {
// Disable the start button
startButton.disabled = true;

// Update the timer immediately
updateTimer();

// Set up the interval to update the timer every second
intervalId = setInterval(() => {
// Decrement the remaining time
secondsRemaining--;
// Update the timer display
updateTimer();

// Check if the timer has reached zero
if (secondsRemaining <= 0) {
  // Stop the interval and play sound
  playSound();
  clearInterval(intervalId);

  // Toggle the current duration and reset the seconds remaining
  if (currentDuration === workDuration) {
    // Pomodoro Long Break
    if (pomodoroStreak === 3) { // Pomodoro-Zähler bei 0 beginnen, 4 Arbeitsphasen vor einer langen Pause
      pomodoroStreak = 0;
      roundcounter.textContent = "🎉";
      currentDuration = longBreakDuration;
      bodyElement.style.backgroundColor = "#3a3a3a";
    } else {
      currentDuration = breakDuration;
      bodyElement.style.backgroundColor = "#C9CBA3";
      roundcounter.textContent = "#0" + (pomodoroStreak + 1) + " Take a break!☕"
    }
  } else {
    pomodoroStreak++;
    roundcounter.textContent = "#0" + (pomodoroStreak + 1) + " Time to focus!✍️";
    currentDuration = workDuration;
    bodyElement.style.backgroundColor = "#E26D5C";
  }
  secondsRemaining = currentDuration * 60;

  // Update the timer display and enable the start button
  updateTimer();
  startButton.disabled = false;
}
}, 1000);
}

// Play Sound
function playSound() {
let audio = new Audio("https://github.com/xip0enix/pomodoro-timer/blob/main/audio/sound.mp3?raw=true");
audio.play();
}

// Play Cancel Sound
function playCancel() {
let audio = new Audio("https://github.com/xip0enix/pomodoro-timer/blob/main/audio/cancel.mp3?raw=true");
audio.play();
}

// Set up the click event listener for the start button
startButton.addEventListener("click", startTimer);

// Set up the click event listener for the reset button
resetButton.addEventListener("click", () => {
// Stop the timer interval if it is running
playCancel();
clearInterval(intervalId);

// Reset the current duration and seconds remaining
currentDuration = workDuration;
secondsRemaining = currentDuration * 60;
roundcounter.textContent = "#0" + (pomodoroStreak + 1) + " Time to focus!✍️";
bodyElement.style.backgroundColor = "#E26D5C";

// Update the timer display and enable the start button
updateTimer();
startButton.disabled = false;
});