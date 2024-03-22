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

  document.title = `${minutes}:${seconds} - ${currentDuration === workDuration ? 'Time to focus!' : 'Time for a break!'}`;
}

// Start the timer
function startTimer() {

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
      playSound("https://github.com/xip0enix/pomodoro-timer/blob/main/audio/sound.mp3?raw=true");
      clearInterval(intervalId);

      // Calculate next break duration
      const nextBreakDuration = pomodoroStreak === 3 ? longBreakDuration : breakDuration;

      // Toggle the current duration and reset the seconds remaining
      currentDuration = nextBreakDuration;
      pomodoroStreak = currentDuration === workDuration ? pomodoroStreak : pomodoroStreak + 1; // Update streak on break start
      secondsRemaining = currentDuration * 60;

      // Update the timer display, round counter, and button state
      updateTimer();
      roundcounter.textContent = `#${pomodoroStreak + 1} ${currentDuration === workDuration ? 'Time to focus!' : 'Take a break!☕'}`;
      bodyElement.style.backgroundColor = currentDuration === workDuration ? "#E26D5C" : (currentDuration === longBreakDuration ? "#3a3a3a" : "#C9CBA3");
      startButton.disabled = false;
    }
  }, 1000);
}

// Play Sound
function playSound(filePath) {
  let audio = new Audio(filePath);
  audio.play();
}

// Play Cancel Sound
function playCancel() {
  playSound("https://github.com/xip0enix/pomodoro-timer/blob/main/audio/cancel.mp3?raw=true");
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
  roundcounter.textContent = `#${pomodoroStreak + 1} Time to focus!`;
  bodyElement.style.backgroundColor = "#E26D5C";
  pomodoroStreak = 0;

  // Update the timer display and enable the start button
  updateTimer();
  startButton.disabled = false;
});