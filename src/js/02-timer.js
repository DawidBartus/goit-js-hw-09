const flatpickr = require('flatpickr');
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minDisplay = document.querySelector('[data-minutes]');
const secDisplay = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const addLeadingZero = value => value.toString().padStart(2, '0');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let today = new Date().getTime();

    if (today <= selectedDates[0]) {
      startBtn.disabled = false;
      let time = selectedDates[0].getTime() - today;
      let countTime = convertMs(time);
      daysDisplay.innerHTML = addLeadingZero(countTime.days);
      hoursDisplay.innerHTML = addLeadingZero(countTime.hours);
      minDisplay.innerHTML = addLeadingZero(countTime.minutes);
      secDisplay.innerHTML = addLeadingZero(countTime.seconds);

      const countdown = () => {
        let mainInterval = setInterval(() => {
          if (time > 0) {
            time -= 1000;
            let newCounTime = convertMs(time);
            daysDisplay.innerHTML = addLeadingZero(newCounTime.days);
            hoursDisplay.innerHTML = addLeadingZero(newCounTime.hours);
            minDisplay.innerHTML = addLeadingZero(newCounTime.minutes);
            secDisplay.innerHTML = addLeadingZero(newCounTime.seconds);
            if (time <= 0) {
              clearInterval(mainInterval);
              daysDisplay.innerHTML = addLeadingZero(0);
              hoursDisplay.innerHTML = addLeadingZero(0);
              minDisplay.innerHTML = addLeadingZero(0);
              secDisplay.innerHTML = addLeadingZero(0);
              Notiflix.Notify.success("Finally it's time for my break!");
            }
          }
        }, 1000);
      };
      startBtn.addEventListener('click', countdown);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
