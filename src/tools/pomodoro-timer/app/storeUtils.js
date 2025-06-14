function el(idString) {
  return document.getElementById(idString);
}

function msToString(ms) {
  return new Date(ms).toISOString().slice(14, 19);
}

let titleInterval = null;
function startTitleAlarm(str, delay) {
  titleInterval = setInterval(() => {
    document.title.startsWith('⏰')
      ? document.title = `${str} - 工具链`
      : document.title = '⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰' + ' - 工具链';
  }, delay);
}

function stopTitleAlarm() {
  // eslint-disable-next-line no-alert
  titleInterval ? clearInterval(titleInterval) : alert('错误：停止标题闹钟时出现问题。');
  document.title = '番茄钟 - 工具链';
}

function getNextTimerMode(state) {
  const currentMode = state.progress[state.progress.length - 1];
  if (currentMode === 'workInterval') {
    return state.progress.length === state.shortBreakCount * 2 + 1 ? 'longBreak' : 'shortBreak';
  }
  else {
    return 'workInterval';
  }
}

function formatModeToText(mode) {
  if (mode === 'workInterval') {
    return '工作时间';
  }
  if (mode === 'shortBreak') {
    return '短休息';
  }
  if (mode === 'longBreak') {
    return '长休息';
  }
}

function getAlarmText(nextMode) {
  if (nextMode === 'workInterval') {
    return '工作时间';
  }
  if (nextMode === 'shortBreak') {
    return '短休息时间';
  }
  if (nextMode === 'longBreak') {
    return '长休息时间';
  }
}

function startOver(state) {
  stopTimer(state);
  state.isTimerInProgress = false;
  state.progress = ['workInterval'];
  setupNextTimerMode(state);
  state.isResetDropupVisible = false;
}

function onTimerFinished(state, alarmPlayer) {
  state.counter = '00:00';
  state.time = 0;
  state.progressPercent = 100;

  const oldMode = state.progress[state.progress.length - 1];
  const newMode = getNextTimerMode(state);
  state.progress.push(newMode);

  const oldModeText = formatModeToText(oldMode);
  const newModeText = formatModeToText(newMode);
  state.finishedMessage = `${oldModeText}已结束。接下来是${newModeText}。`;
  state.isShowFinishedPopup = true;

  const titleText = getAlarmText(newMode);
  startTitleAlarm(titleText, 500);
  if (state.prefersAlarmSound) {
    alarmPlayer.play();
  }

  stopTimer(state);
}

function setupNextTimerMode(state) {
  if (state.progress.length === state.shortBreakCount * 2 + 2) {
    startOver(state);
  }
  else {
    const timerMode = state.progress[state.progress.length - 1];
    state.time = state[timerMode] * 60000;
    state.counter = msToString(state.time);
    state.progressPercent = 0;
  }
}

function stopAlarms() {
  el('alarmPlayer').pause();
  stopTitleAlarm();
}

let timerInterval = null;
function startTimer(state) {
  state.isTimerRunning = true;
  state.isTimerInProgress = true;
  const timerMode = state.progress[state.progress.length - 1];
  const totalModeTime = state[timerMode] * 60000;
  const remainingTime = state.time;
  const startTime = Date.now();
  timerInterval = setInterval(() => {
    const timeElapsed = Date.now() - startTime;
    const newRemainingTime = remainingTime - timeElapsed;
    if (newRemainingTime <= 0) {
      onTimerFinished(state, el('alarmPlayer'));
      return;
    }
    state.time = newRemainingTime;
    state.counter = msToString(newRemainingTime);
    state.progressPercent = (totalModeTime - newRemainingTime) / totalModeTime * 100;
  }, 200);
}

function stopTimer(state) {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  state.isTimerRunning = false;
}

function setAppAccentColor(hexColor) {
  const root = document.querySelector(':root');
  root.style.setProperty('--pomodoro-app-accent-color', hexColor);
}

export {
  startTimer,
  stopTimer,
  startOver,
  setupNextTimerMode,
  stopAlarms,
  setAppAccentColor,
};
