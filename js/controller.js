import * as model from './model.js';
import * as view from './view.js';


// Global variables

let pomodoroInverval;
let pomodoroTimeout;

// Event handlers

const controlPomodoroTime = function(value) {
  model.updatePomodoroTime(value);
  view.renderPomodoroTime(model.state.settings.pomodoroTime);

  if (model.state.currentStage === 1) {
    view.renderTimer(model.state.remainingTime.formatted);
  }
}

const controlShortBreakTime = function(value) {
  model.updateShortBreakTime(value);
  view.renderShortBreakTime(model.state.settings.shortBreakTime);

  if (model.state.currentStage === 2) {
    view.renderTimer(model.state.remainingTime.formatted);
  }
}

const controlLongBreakTime = function(value) {
  model.updateLongBreakTime(value);
  view.renderLongBreakTime(model.state.settings.longBreakTime);

  if (model.state.currentStage === 3) {
    view.renderTimer(model.state.remainingTime.formatted);
  }
}

const controlStages = function(nextStage, byTimeout = false) {
  if (model.state.currentState === 'active') {
    model.updateState();

    clearInterval(pomodoroInverval);
    clearTimeout(pomodoroTimeout);

    view.toggleInputs(model.state.currentState);
    view.toggleForwardButton();
  }

  model.updateStage(nextStage);
  view.renderTopButtons(model.state.currentStage);
  view.renderDescriptionText(model.state.currentStage);
  view.renderTimer(model.state.remainingTime.formatted);
  view.renderControlButton(model.state.currentState);

  if (model.state.previousStage === 1 && model.state.currentStage !== 1 && byTimeout) {
    model.updatePomodoroNumber();
  }

  if (model.state.currentStage === 1) {
    view.renderDescriptionNumber(model.state.pomodoroNumber);
  } else {
    view.renderDescriptionNumber(model.state.pomodoroNumber - 1);
  }
}

const controlReset = function() {
  if (model.state.currentState === 'not-started') return;

  if (model.state.currentState === 'active') {
    model.updateState();

    clearInterval(pomodoroInverval);
    clearTimeout(pomodoroTimeout);

    view.toggleInputs(model.state.currentState);
    view.toggleForwardButton();
  }

  model.updateRemainingTime();
  view.renderTimer(model.state.remainingTime.formatted);
  view.renderControlButton(model.state.currentState);
}

const goToNextStage = function() {
  clearInterval(pomodoroInverval);

  let nextStage = model.state.currentStage === 1 ? 2 : 1;

  controlStages(nextStage, true);
}

const controlForward = function() {
  clearTimeout(pomodoroTimeout);

  goToNextStage();
}

const controlTimer = function(nextState) {
  model.updateState(nextState);
  view.renderControlButton(model.state.currentState);

  switch (model.state.currentState) {
    case 'active':
      view.toggleInputs(model.state.currentState);
      view.toggleForwardButton();

      pomodoroInverval = setInterval(function() {
        const remainingTimeSeconds = model.state.remainingTime.totalSeconds - 1;

        model.updateRemainingTime(remainingTimeSeconds);
        view.renderTimer(model.state.remainingTime.formatted);
      }, 1000);

      pomodoroTimeout = setTimeout(function() {
        goToNextStage();
      }, model.state.remainingTime.totalSeconds * 1000);
      break;
    case 'paused':
      clearInterval(pomodoroInverval);
      clearTimeout(pomodoroTimeout);

      view.toggleInputs(model.state.currentState);
      view.toggleForwardButton();

      break;
    default:
      return;
  }
}

// Init function

const init = function() {
  // Calculating values
  model.updateRemainingTime();

  // Subscribing handlers
  view.subscribeHandlerStages(controlStages);
  view.subscribeHandlerReset(controlReset);
  view.subscribeHandlerForward(controlForward);
  view.subscribeHandlerTimer(controlTimer);
  view.subscribeHandlerPomodoroTime(controlPomodoroTime);
  view.subscribeHandlerShortBreakTime(controlShortBreakTime);
  view.subscribeHandlerLongBreakTime(controlLongBreakTime);

  // Render
  view.renderPomodoroTime(model.state.settings.pomodoroTime);
  view.renderShortBreakTime(model.state.settings.shortBreakTime);
  view.renderLongBreakTime(model.state.settings.longBreakTime);
  view.renderDescriptionNumber(model.state.pomodoroNumber);
  view.renderDescriptionText(model.state.currentStage);
  view.renderTimer(model.state.remainingTime.formatted);
  view.renderControlButton(model.state.currentState);
}

init();
