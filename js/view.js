// Selecting elements

const inputPomodoro = document.querySelector('#time-pomodoro');
const inputShortBreak = document.querySelector('#time-short-break');
const inputLongBreak = document.querySelector('#time-long-break');

const elementDescriptionNumber = document.querySelector('.description__number');
const elementDescriptionText = document.querySelector('.description__text');

const buttonsTop = document.querySelector('.timer__buttons-top');
const buttonPomodoro = document.querySelector('.pomodoro-button');
const buttonShortBreak = document.querySelector('.short-break-button');
const buttonLongBreak = document.querySelector('.long-break-button');

const elementTime = document.querySelector('.time');

const buttonReset = document.querySelector('.reset-button');
const buttonControl = document.querySelector('#button-control');
const buttonForward = document.querySelector('.forward-button');

// Inputs

export const toggleInputs = function(currentState) {
  [
    inputPomodoro,
    inputShortBreak,
    inputLongBreak
  ].forEach(function(element) {
    element.disabled = currentState === 'active' ? true : false;
    element.classList.toggle('disabled');
  });
}

export const renderPomodoroTime = function(pomodoroTime) {
  inputPomodoro.value = pomodoroTime;
}

export const renderShortBreakTime = function(shortBreakTime) {
  inputShortBreak.value = shortBreakTime;
}

export const renderLongBreakTime = function(longBreakTime) {
  inputLongBreak.value = longBreakTime;
}

// Top buttons

export const renderTopButtons = function(currentStage) {
  document.querySelector('.active-top').classList.toggle('active-top');

  switch (currentStage) {
    case 1:
      buttonPomodoro.classList.toggle('active-top');

      break;
    case 2:
      buttonShortBreak.classList.toggle('active-top');

      break;
    case 3:
      buttonLongBreak.classList.toggle('active-top');

      break;
    default:
      return;
  }
}

// Description

export const renderDescriptionNumber = function(pomodoroNumber) {
  elementDescriptionNumber.textContent = `#${pomodoroNumber}`;
}

export const renderDescriptionText = function(currentStage) {
  elementDescriptionText.textContent =
    currentStage === 1 ? 'Time to focus!' : 'Time for a break';
}

// Timer

export const renderTimer = function(time) {
  elementTime.textContent = time;
}

// Bottom buttons

export const renderControlButton = function(currentState) {
  switch (currentState) {
    case 'active':
      buttonControl.textContent = 'Pause';
      buttonControl.classList.add('pause-button');
      buttonControl.classList.remove('start-button');

      break;
    case 'paused':
    case 'not-started':
      buttonControl.textContent = 'Start';
      buttonControl.classList.add('start-button');
      buttonControl.classList.remove('pause-button');

      break;
    default:
      return;
  }
}

export const toggleForwardButton = function() {
  buttonForward.classList.toggle('hidden');
}

// Event handlers

export const subscribeHandlerReset = function(handler) {
  buttonReset.addEventListener('click', handler);
}

export const subscribeHandlerTimer = function(handler) {
  buttonControl.addEventListener('click', function(event) {
    let nextState;

    if (event.target.classList.contains('start-button')) {
      nextState = 'active';
    } else if (event.target.classList.contains('pause-button')) {
      nextState = 'paused';
    }

    handler(nextState);
  });
}

export const subscribeHandlerForward = function(handler) {
  buttonForward.addEventListener('click', handler);
}

export const subscribeHandlerPomodoroTime = function(handler) {
  inputPomodoro.addEventListener('input', (event) => handler(event.target.value));
}

export const subscribeHandlerShortBreakTime = function(handler) {
  inputShortBreak.addEventListener('input', (event) => handler(event.target.value));
}

export const subscribeHandlerLongBreakTime = function(handler) {
  inputLongBreak.addEventListener('input', (event) => handler(event.target.value));
}

export const subscribeHandlerStages = function(handler) {
  buttonsTop.addEventListener('click', function(event) {
    let nextStage;

    if (
      event.target.classList.contains('active-top') ||
      !event.target.classList.contains('button')
    ) return;

    if (event.target.classList.contains('pomodoro-button')) {
      nextStage = 1;
    } else if (event.target.classList.contains('short-break-button')) {
      nextStage = 2;
    } else if (event.target.classList.contains('long-break-button')) {
      nextStage = 3;
    }

    handler(nextStage);
  });
}
