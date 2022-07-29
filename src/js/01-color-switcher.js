const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

btnStartEl.addEventListener('click', onChangeColor);

function onChangeColor() {
  timerId = setInterval(() => {
    if (btnStartEl) {
      btnStartEl.setAttribute('disabled', 'disabled');
    }
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

btnStopEl.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartEl.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
