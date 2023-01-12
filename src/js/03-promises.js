import Notiflix from 'notiflix';

const formDelay = document.querySelector('[name="delay"]');
const formStep = document.querySelector('[name="step"]');
const formAmount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const getPromise = e => {
  e.preventDefault();
  let newDelay = Number.parseInt(formDelay.value);
  let newStep = Number.parseInt(formStep.value);

  for (let i = 0; i < formAmount.value; i++) {
    createPromise(i + 1, newDelay + newStep * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};

form.addEventListener('submit', getPromise);
