// Set the timer durations in minutes
const workDuration = 25;
const breakDuration = 5;


// Get the HTML elements
const bodyElement = document.body;
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const separatorElement = document.getElementById("separator");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");


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

    // Update the page title with the remaining time
  document.title = `${minutes}:${seconds} - Pomodoro Timer`;
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
      // Stop the interval
      clearInterval(intervalId);

      // Toggle the current duration and reset the seconds remaining
      if (currentDuration === workDuration) {
        currentDuration = breakDuration;
        bodyElement.style.backgroundColor = "#C9CBA3";
      } else {
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

// Set up the click event listener for the start button
startButton.addEventListener("click", startTimer);


// Set up the click event listener for the reset button
resetButton.addEventListener("click", () => {
  // Stop the timer interval if it is running
  clearInterval(intervalId);

  // Reset the current duration and seconds remaining
  currentDuration = workDuration;
  secondsRemaining = currentDuration * 60;

  // Update the timer display and enable the start button
  updateTimer();
  startButton.disabled = false;
});