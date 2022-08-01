import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStartEl = document.querySelector('button[data-start]');
btnStartEl.setAttribute('disabled', true);

const timer = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let choosedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosedDate = selectedDates[0].getTime();

    const delta = choosedDate - Date.now();
    if (delta <= 0) {
      Notify.failure('Please choose a date in the future!');
      return;
    }
    btnStartEl.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);
const inputDateEl = document.querySelector('#datetime-picker')._flatpickr;

btnStartEl.addEventListener('click', onStartTimer);

let timerId = null;

function onStartTimer(evt) {
  if (timerId > 0) {
    return;
  }
  timerId = setInterval(() => {
    const deltaTime = choosedDate - Date.now();
    console.log(deltaTime);

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime >= 0) {
      timer.days.textContent = days;
      timer.hours.textContent = hours;
      timer.minutes.textContent = minutes;
      timer.seconds.textContent = seconds;
    } else {
      Notify.success('The condition is fulfilled!');
      clearInterval(timerId);
      evt.target.setAttribute('disabled', true);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padStart(Math.floor(ms / day));
  const hours = padStart(Math.floor((ms % day) / hour));
  const minutes = padStart(Math.floor(((ms % day) % hour) / minute));
  const seconds = padStart(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function padStart(value) {
  return String(value).padStart(2, '0');
}
