const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, idx) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.textContent = cell;
    div.dataset.index = idx;
    if (!cell && gameActive) {
      div.onclick = handleClick;
    }
    boardEl.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;
  board[index] = currentPlayer;
  playSound(clickSound);
  renderBoard();
  if (checkWin(currentPlayer)) {
    statusEl.textContent = `${
      currentPlayer === "X" ? "Fluffy" : "Algorithm"
    } wins!`;
    playSound(winSound);
    gameActive = false;
  } else if (board.every((cell) => cell)) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = `${
      currentPlayer === "X" ? "Fluffy" : "Algorithm"
    }'s turn`;
    if (currentPlayer === "O") {
      setTimeout(botMoveMedium, 500);
    }
  }
}

function botMoveMedium() {
  const empty = board
    .map((c, i) => (c === "" ? i : null))
    .filter((i) => i !== null);
  let move;

  if (Math.random() < 0.5) {
    // Random move (50% chance)
    move = empty[Math.floor(Math.random() * empty.length)];
  } else {
    // Simple logic: try to win or block
    move =
      findBestMove("O") ||
      findBestMove("X") ||
      empty[Math.floor(Math.random() * empty.length)];
  }

  board[move] = "O";
  playSound(clickSound);
  renderBoard();

  if (checkWin("O")) {
    statusEl.textContent = "Algorithm wins!";
    playSound(winSound);
    gameActive = false;
  } else if (board.every((cell) => cell)) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = "X";
    statusEl.textContent = "Fluffy's turn";
  }
}

function findBestMove(player) {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const cells = [board[a], board[b], board[c]];
    if (
      cells.filter((val) => val === player).length === 2 &&
      cells.includes("")
    ) {
      return pattern[cells.indexOf("")];
    }
  }
  return null;
}

function checkWin(player) {
  return winPatterns.some((p) => p.every((i) => board[i] === player));
}

function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

resetBtn.onclick = () => {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusEl.textContent = "Fluffy's turn";
  renderBoard();
};

renderBoard();
