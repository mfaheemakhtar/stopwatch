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

const padDigit = number => {
  return number < 10 ? `0${number}` : number;
};

const getElapsedTime = () => {
  return new Date() - startedAt;
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
  isStarted = true;
  startedAt = new Date() - elapsedTime;
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
