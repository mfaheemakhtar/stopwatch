const isStarted = false;
const intervalId = null;
const startedAt = new Date();

const hourElement = document.querySelector("#hour");
const minuteElement = document.querySelector("#minute");
const secondElement = document.querySelector("#second");

const padDigit = number => {
  return number < 10 ? `0${number}` : number;
};

const calculateElapsedTime = () => {
  const now = new Date();
  const elapsed = now - startedAt;

  let seconds = Math.floor(elapsed / 1000);

  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;

  return { hours, minutes, seconds };
};

const updateTime = elapsed => {
  hourElement.innerText = padDigit(elapsed.hours);
  minuteElement.innerText = padDigit(elapsed.minutes);
  secondElement.innerText = padDigit(elapsed.seconds);
};

const start = () => {
  intervalId = setInterval(() => {
    const elapsedTime = calculateElapsedTime();
    updateTime(elapsedTime);
  }, 1000);
};

start();
