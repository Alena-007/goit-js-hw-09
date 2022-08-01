import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', onSubmitCreatePromises);

function onSubmitCreatePromises(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target;

  const firstDelay = Number(delay.value);
  const delayStep = Number(step.value);
  const amountNum = Number(amount.value);

  promisesCounter(amountNum, firstDelay, delayStep);
}

function promisesCounter(count, delay, step) {
  for (let i = 1; i <= count; i += 1) {
    let time = delay + step * (i - 1);
    createPromise(i, time)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
