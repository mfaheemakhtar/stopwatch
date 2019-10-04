let isStarted = false;
let intervalId = null;
let startedAt = null;
let elapsedTime = 0;

// Display nodes.
const hourElement = document.querySelector("#hour");
const minuteElement = document.querySelector("#minute");
const secondElement = document.querySelector("#second");

// Start/pause button node
const toggleButton = document.querySelector("#toggle");
const resetButton = document.querySelector("#reset");

const padDigit = number => {
  return number < 10 ? `0${number}` : number;
};

const getElapsedTime = () => {
  return new Date().valueOf() - startedAt;
};

const updateDisplay = () => {
  let seconds = Math.floor(elapsedTime / 1000);

  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;

  hourElement.innerText = padDigit(hours);
  minuteElement.innerText = padDigit(minutes);
  secondElement.innerText = padDigit(seconds);
};

const start = () => {
  // Set flag and startedAt time.
  isStarted = true;

  // If elapsed time is greater than 0, calculate the new start value and update it.
  if (elapsedTime) {
    startedAt = new Date().valueOf() - elapsedTime;
  }

  // If elapsed time is 0, it means the stopwatch is not paused and we should use
  // the old startedAt value.
  else {
    startedAt = new Date().valueOf();
  }

  toggleButton.innerText = "Pause";

  intervalId = setInterval(() => {
    elapsedTime = getElapsedTime();
    updateDisplay();
  }, 100);
};

const pause = () => {
  elapsedTime = getElapsedTime();

  isStarted = false;
  startedAt = null;
  toggleButton.innerText = "Start";

  clearInterval(intervalId);
};

const reset = () => {
  // Set app state to default.
  isStarted = false;
  startedAt = null;
  elapsedTime = 0;

  // Clear the interval.
  clearInterval(intervalId);
  intervalId = null;

  // Update display so everything looks like new.
  updateDisplay();
};

/******************************
 * LISTENERS
 *****************************/
toggleButton.addEventListener("click", () => {
  if (!isStarted) {
    start();
  } else {
    pause();
  }
});

resetButton.addEventListener("click", reset);
