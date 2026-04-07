// Game State
let yourScore = 0;
let computerScore = 0;
let streak = 0;

const emojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
  draw: "🤝",
};

// DOM Elements
const yourScoreEl = document.getElementById("yourscore");
const computerScoreEl = document.getElementById("computerscore");
const streakEl = document.getElementById("streakscore");
const yourChoiceEl = document.getElementById("yourchoice");
const computerChoiceEl = document.getElementById("computerchoice");
const statusEl = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Helper: Get Computer Choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Logic: Determine Winner
function getWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }
  return "computer";
}

// Action: Play Round
function playGame(yourChoice) {
  const computerChoice = getComputerChoice();
  const winner = getWinner(yourChoice, computerChoice);

  // Update UI Choices
  yourChoiceEl.textContent = emojis[yourChoice];
  computerChoiceEl.textContent = emojis[computerChoice];

  // Add subtle animation hit
  [yourChoiceEl, computerChoiceEl].forEach((el) => {
    el.style.transform = "scale(1.2)";
    setTimeout(() => (el.style.transform = "scale(1)"), 200);
  });

  // Handle Logic
  if (winner === "player") {
    yourScore++;
    streak++;
    statusEl.textContent = "You Win! 🎉";
    statusEl.style.color = "var(--accent-win)";
  } else if (winner === "computer") {
    computerScore++;
    streak = 0; // Reset streak on loss
    statusEl.textContent = "Computer Wins! 🤖";
    statusEl.style.color = "var(--accent-loss)";
  } else {
    statusEl.textContent = "It's a Draw! 🤝";
    statusEl.style.color = "var(--text)";
  }

  // Update Score UI
  yourScoreEl.textContent = yourScore;
  computerScoreEl.textContent = computerScore;
  streakEl.textContent = streak;
}

// Event Listeners
document
  .getElementById("rock")
  .addEventListener("click", () => playGame("rock"));
document
  .getElementById("paper")
  .addEventListener("click", () => playGame("paper"));
document
  .getElementById("scissors")
  .addEventListener("click", () => playGame("scissors"));

resetButton.addEventListener("click", () => {
  yourScore = 0;
  computerScore = 0;
  streak = 0;
  yourScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  streakEl.textContent = "0";
  yourChoiceEl.textContent = "❔";
  computerChoiceEl.textContent = "❔";
  statusEl.textContent = "Records wiped! New game?";
  statusEl.style.color = "var(--text)";
});
