export const state = {
  currentStage: 1,             // 1, 2, 3
  previousStage: null,
  currentState: 'not-started', // 'not-started', 'active', 'paused'
  settings: {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15
  },
  remainingTime: {
    totalSeconds: null,
    minutes: null,
    seconds: null,
    formatted: ''
  },
  pomodoroNumber: 1,
  tasks: []
};

const calculateTimeSeconds = function(time) {
  return time * 60;
}

const formatTime = function(minutes, seconds) {
  const minutesFormatted = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  const secondsFormatted = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  return `${minutesFormatted}:${secondsFormatted}`;
}

export const updateRemainingTime = function(time = null) {
  let currentTime = time;

  if (currentTime === null) {
    switch (state.currentStage) {
      case 1:
        currentTime = state.settings.pomodoroTime;

        break;
      case 2:
        currentTime = state.settings.shortBreakTime;

        break;
      case 3:
        currentTime = state.settings.longBreakTime;

        break;
      default:
        return;
    }

    currentTime = calculateTimeSeconds(currentTime);
  }

  const totalSeconds = currentTime;
  const minutes = Math.trunc(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formatted = formatTime(minutes, seconds);

  state.remainingTime = {
    totalSeconds,
    minutes,
    seconds,
    formatted
  };
}

export const updatePomodoroTime = function(pomodoroTime) {
  state.settings.pomodoroTime = pomodoroTime;

  if (state.currentStage === 1) {
    const timeSeconds = calculateTimeSeconds(state.settings.pomodoroTime);

    updateRemainingTime(timeSeconds);
  }
}

export const updateShortBreakTime = function(shortBreakTime) {
  state.settings.shortBreakTime = shortBreakTime;

  if (state.currentStage === 2) {
    const timeSeconds = calculateTimeSeconds(state.settings.shortBreakTime);

    updateRemainingTime(timeSeconds);
  }
}

export const updateLongBreakTime = function(longBreakTime) {
  state.settings.longBreakTime = longBreakTime;

  if (state.currentStage === 3) {
    const timeSeconds = calculateTimeSeconds(state.settings.longBreakTime);

    updateRemainingTime(timeSeconds);
  }
}

export const updateStage = function(nextStage) {
  state.previousStage = state.currentStage;
  state.currentStage = nextStage;

  updateRemainingTime();
}

export const updateState = function(nextState = 'not-started') {
  state.currentState = nextState;
}

export const updatePomodoroNumber = () => state.pomodoroNumber++;
