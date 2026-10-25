// ----- Game settings -----
const MIN = 1;
const MAX = 100;

// ----- Game state -----
let target;
let attempts;
let gameOver;

// ----- DOM elements -----
const form = document.getElementById("guessForm");
const input = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const feedback = document.getElementById("feedback");
const attemptsEl = document.getElementById("attempts");
const bestEl = document.getElementById("best");
const historyList = document.getElementById("historyList");
const playAgainBtn = document.getElementById("playAgain");

document.getElementById("rangeMin").textContent = MIN;
document.getElementById("rangeMax").textContent = MAX;

// ----- Best score (saved in the browser) -----
function getBest() {
  try {
    return Number(localStorage.getItem("guessBest")) || null;
  } catch (e) {
    return null;
  }
}

function saveBest(score) {
  try {
    localStorage.setItem("guessBest", score);
  } catch (e) {
    /* storage unavailable, ignore */
  }
}

function showBest() {
  const best = getBest();
  bestEl.textContent = best ? best : "–";
}

// ----- Helpers -----
function randomInt(min, max) {
  // Random whole number from min to max (both included)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setFeedback(message, type = "") {
  feedback.textContent = message;
  feedback.className = "feedback " + type;
}

function addToHistory(value, isWin = false) {
  const li = document.createElement("li");
  li.textContent = value;
  if (isWin) li.classList.add("win");
  historyList.appendChild(li);
}

// ----- Start / reset the game -----
function startGame() {
  target = randomInt(MIN, MAX);
  attempts = 0;
  gameOver = false;

  attemptsEl.textContent = attempts;
  historyList.innerHTML = "";
  setFeedback("Make your first guess!");

  input.value = "";
  input.disabled = false;
  guessBtn.disabled = false;
  playAgainBtn.classList.add("hidden");
  input.focus();
  showBest();
}

// ----- Handle a guess -----
function handleGuess(event) {
  event.preventDefault();
  if (gameOver) return;

  const raw = input.value.trim();
  const guess = Number(raw);

  // Validation: must be a whole number inside the range
  if (raw === "" || Number.isNaN(guess)) {
    setFeedback("Please enter a number.", "error");
    return;
  }
  if (!Number.isInteger(guess)) {
    setFeedback("Please enter a whole number.", "error");
    return;
  }
  if (guess < MIN || guess > MAX) {
    setFeedback(`Out of range! Pick a number between ${MIN} and ${MAX}.`, "error");
    return;
  }

  // Valid guess: count it
  attempts++;
  attemptsEl.textContent = attempts;

  if (guess === target) {
    addToHistory(guess, true);
    setFeedback(`🎉 Correct! The number was ${target}. You got it in ${attempts} ${attempts === 1 ? "attempt" : "attempts"}.`, "win");
    endGame();
  } else if (guess < target) {
    addToHistory(guess);
    setFeedback(`${guess} is too low. Go higher! ⬆️`, "higher");
  } else {
    addToHistory(guess);
    setFeedback(`${guess} is too high. Go lower! ⬇️`, "lower");
  }

  input.value = "";
  if (!gameOver) input.focus();
}

function endGame() {
  gameOver = true;
  input.disabled = true;
  guessBtn.disabled = true;
  playAgainBtn.classList.remove("hidden");
  playAgainBtn.focus();

  const best = getBest();
  if (!best || attempts < best) {
    saveBest(attempts);
    showBest();
  }
}

// ----- Events -----
form.addEventListener("submit", handleGuess);
playAgainBtn.addEventListener("click", startGame);

startGame();