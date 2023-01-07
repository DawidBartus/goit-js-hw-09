const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const pageBody = document.querySelector('body');
let mainInterval;

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changecolor = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  mainInterval = setInterval(() => {
    pageBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

startBtn.addEventListener('click', changecolor);
stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(mainInterval);
});
