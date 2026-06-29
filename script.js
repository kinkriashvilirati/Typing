// Add another typing test by copying one whole object: { title: "...", text: "..." }.
const TEST_TEXTS = [
  {
    title: "I Am Enough",
    text: "I am enough. Right now as I am I am enough. I do not need to change to be enough. I do not need to do more to be enough. I am enough just by existing. I am enough because I exist. I stop trying to prove myself. I am already enough. Others may not see it but I am enough. I have always been enough. I will always be enough. I believe it now. I am enough. I say it again. I am enough. I let it sink in. I am enough."
  },
  {
    title: "Second test",
    text: "I am happy now. I do not wait for things to change. I am happy now and things will change. My state of being comes first. Reality comes second. I am happy now and I watch what happens. I do not wait to be happy. I do not say I will be happy when this or that happens. I know it works the other way. I am happy now. I choose to be happy now. I am happy now and the world follows. I am happy now. This is the secret. I am happy now."
  },
  {
    title: "Third test",
    text: "Now is all there is. Now is the only moment. The past is a memory I am having now. The future is a dream I am having now. Everything is now. All my power is now. I can only change things now. I can only feel now. I can only act now. So I am present now. I do not live in the past. I do not wait for the future. I am here now. Now is all there is. Now is where life happens. I am here now. I am present now."
  }
];
const TEST_DURATION_SECONDS = 180;

const textTitle = document.getElementById("textTitle");
const textPoolCount = document.getElementById("textPoolCount");
const textChoices = document.getElementById("textChoices");
const textDisplay = document.getElementById("textDisplay");
const timeRemaining = document.getElementById("timeRemaining");
const wpmValue = document.getElementById("wpmValue");
const accuracyValue = document.getElementById("accuracyValue");
const progressPercent = document.getElementById("progressPercent");
const progressCount = document.getElementById("progressCount");
const progressFill = document.getElementById("progressFill");
const resultsPanel = document.getElementById("resultsPanel");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalCorrect = document.getElementById("finalCorrect");
const finalMistakes = document.getElementById("finalMistakes");
const finalElapsed = document.getElementById("finalElapsed");
const restartButton = document.getElementById("restartButton");
const previousTextButton = document.getElementById("previousTextButton");
const randomTextButton = document.getElementById("randomTextButton");
const nextTextButton = document.getElementById("nextTextButton");

let selectedTextIndex = getRandomTextIndex();
let selectedTest = TEST_TEXTS[selectedTextIndex];
let charSpans = [];
let currentIndex = 0;
let mistakes = 0;
let started = false;
let finished = false;
let startTime = null;
let timerId = null;

const ignoredKeys = new Set([
  "Shift",
  "CapsLock",
  "Tab",
  "Alt",
  "Control",
  "Meta",
  "Escape",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown"
]);

function renderText() {
  const targetText = selectedTest.text;

  textDisplay.innerHTML = "";
  charSpans = [];
  updateTextMeta();
  renderTextChoices();

  let wordWrapper = document.createElement("span");
  wordWrapper.className = "word";

  for (const char of targetText) {
    const charSpan = document.createElement("span");
    charSpan.className = char === " " ? "char space" : "char";
    charSpan.textContent = char;
    charSpans.push(charSpan);

    if (char === " ") {
      if (wordWrapper.childNodes.length > 0) {
        textDisplay.appendChild(wordWrapper);
      }

      textDisplay.appendChild(charSpan);
      wordWrapper = document.createElement("span");
      wordWrapper.className = "word";
    } else {
      wordWrapper.appendChild(charSpan);
    }
  }

  if (wordWrapper.childNodes.length > 0) {
    textDisplay.appendChild(wordWrapper);
  }

  updateActiveCharacter();
}

function handleKeydown(event) {
  if (event.key === " " || event.key === "Backspace" || event.key === "Tab") {
    event.preventDefault();
  }

  if (finished) {
    return;
  }

  if (event.key === "Backspace") {
    handleBackspace();
    return;
  }

  if (shouldIgnoreKey(event)) {
    return;
  }

  if (!isTypingKey(event.key)) {
    return;
  }

  if (!started) {
    startTimer();
  }

  const targetText = selectedTest.text;
  const expectedCharacter = targetText[currentIndex];
  const currentSpan = charSpans[currentIndex];

  if (event.key === expectedCharacter) {
    currentSpan.classList.remove("wrong");
    currentSpan.classList.add("correct");
    currentIndex += 1;

    if (currentIndex === targetText.length) {
      endTest();
      return;
    }
  } else {
    mistakes += 1;
    currentSpan.classList.add("wrong");
  }

  updateActiveCharacter();
  updateStats();
}

function handleBackspace() {
  if (currentIndex === 0) {
    return;
  }

  if (charSpans[currentIndex]) {
    charSpans[currentIndex].classList.remove("wrong");
  }

  currentIndex -= 1;
  charSpans[currentIndex].classList.remove("correct", "wrong");
  updateActiveCharacter();
  updateStats();
}

function shouldIgnoreKey(event) {
  if (event.ctrlKey || event.altKey || event.metaKey) {
    return true;
  }

  return ignoredKeys.has(event.key) || /^F\d{1,2}$/.test(event.key);
}

function isTypingKey(key) {
  return key.length === 1;
}

function startTimer() {
  started = true;
  startTime = Date.now();
  timerId = window.setInterval(() => {
    updateStats();

    if (getElapsedSeconds() >= TEST_DURATION_SECONDS) {
      endTest();
    }
  }, 250);
}

function endTest() {
  finished = true;
  window.clearInterval(timerId);
  timerId = null;
  updateActiveCharacter();
  updateStats();
  updateResults();
  resultsPanel.hidden = false;
}

function resetTest() {
  resetCurrentTest();
}

function resetCurrentTest() {
  window.clearInterval(timerId);
  timerId = null;
  currentIndex = 0;
  mistakes = 0;
  started = false;
  finished = false;
  startTime = null;
  resultsPanel.hidden = true;
  renderText();
  updateStats();
}

function chooseText(index) {
  selectedTextIndex = wrapTextIndex(index);
  selectedTest = TEST_TEXTS[selectedTextIndex];
  resetCurrentTest();
}

function chooseRandomText() {
  selectedTextIndex = getRandomTextIndex(selectedTextIndex);
  selectedTest = TEST_TEXTS[selectedTextIndex];
  resetCurrentTest();
}

function choosePreviousText() {
  chooseText(selectedTextIndex - 1);
}

function chooseNextText() {
  chooseText(selectedTextIndex + 1);
}

function updateActiveCharacter() {
  for (const charSpan of charSpans) {
    charSpan.classList.remove("active");
  }

  if (!finished && currentIndex < charSpans.length) {
    charSpans[currentIndex].classList.add("active");
  }
}

function updateStats() {
  const targetText = selectedTest.text;
  const elapsedSeconds = getElapsedSeconds();
  const remainingSeconds = Math.max(0, TEST_DURATION_SECONDS - Math.floor(elapsedSeconds));
  const accuracy = calculateAccuracy();
  const progress = (currentIndex / targetText.length) * 100;

  timeRemaining.textContent = formatTime(remainingSeconds);
  wpmValue.textContent = calculateWpm(elapsedSeconds);
  accuracyValue.textContent = `${accuracy}%`;
  progressPercent.textContent = `${Math.round(progress)}%`;
  progressCount.textContent = `${currentIndex} / ${targetText.length} characters`;
  progressFill.style.width = `${progress}%`;
}

function updateResults() {
  const elapsedSeconds = getElapsedSeconds();

  finalWpm.textContent = calculateWpm(elapsedSeconds);
  finalAccuracy.textContent = `${calculateAccuracy()}%`;
  finalCorrect.textContent = currentIndex;
  finalMistakes.textContent = mistakes;
  finalElapsed.textContent = formatTime(Math.floor(elapsedSeconds));
}

function calculateWpm(elapsedSeconds) {
  if (!started || elapsedSeconds <= 0) {
    return 0;
  }

  const elapsedMinutes = Math.max(elapsedSeconds / 60, 1 / 60);
  return Math.round((currentIndex / 5) / elapsedMinutes);
}

function calculateAccuracy() {
  const totalAttempts = currentIndex + mistakes;

  if (totalAttempts === 0) {
    return 100;
  }

  return Math.round((currentIndex / totalAttempts) * 100);
}

function getElapsedSeconds() {
  if (!started || !startTime) {
    return 0;
  }

  return Math.min((Date.now() - startTime) / 1000, TEST_DURATION_SECONDS);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.max(0, Math.floor(totalSeconds % 60));
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getRandomTextIndex(previousIndex = null) {
  if (TEST_TEXTS.length === 1) {
    return 0;
  }

  const choices = TEST_TEXTS
    .map((test, index) => index)
    .filter((index) => index !== previousIndex);

  return choices[Math.floor(Math.random() * choices.length)];
}

function wrapTextIndex(index) {
  return (index + TEST_TEXTS.length) % TEST_TEXTS.length;
}

function updateTextMeta() {
  textTitle.textContent = selectedTest.title;
  const textLabel = TEST_TEXTS.length === 1 ? "text" : "texts";
  textPoolCount.textContent = `${TEST_TEXTS.length} ${textLabel} available`;
}

function renderTextChoices() {
  textChoices.innerHTML = "";

  TEST_TEXTS.forEach((test, index) => {
    const button = document.createElement("button");
    const title = document.createElement("span");
    const meta = document.createElement("span");

    button.type = "button";
    button.className = index === selectedTextIndex ? "text-choice active" : "text-choice";
    title.className = "text-choice-title";
    meta.className = "text-choice-meta";
    title.textContent = test.title;
    meta.textContent = `${test.text.length} characters`;

    button.appendChild(title);
    button.appendChild(meta);
    button.addEventListener("click", () => {
      chooseText(index);
      button.blur();
    });

    textChoices.appendChild(button);
  });
}

renderText();
updateStats();

document.addEventListener("keydown", handleKeydown);
restartButton.addEventListener("click", resetTest);
previousTextButton.addEventListener("click", () => {
  choosePreviousText();
  previousTextButton.blur();
});
randomTextButton.addEventListener("click", () => {
  chooseRandomText();
  randomTextButton.blur();
});
nextTextButton.addEventListener("click", () => {
  chooseNextText();
  nextTextButton.blur();
});
