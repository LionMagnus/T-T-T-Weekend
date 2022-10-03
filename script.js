// constants
const COLOR_LOOKUP = {
  '1': 'blue',
  '-1': 'red',
  'null': 'white'
};
// only 9 possible winning conditions in 3x3
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board, turn, winner;

// cached element references
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

// event listeners
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', init);

// functions
init();

function init() {
  board = new Array(9).fill(null);
  turn = 1;
  winner = null;
  render();
}

function handleMove(evt) {
  // obtain index of square
  const idx = parseInt(evt.target.id);
  // guards
  if (
    // didn't click <div> in grid
    isNaN(idx) ||
    // square already taken
    board[idx] ||
    // game over
    winner
  ) return;
  // update state
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
  if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
  if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
  if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
  if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
  if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
  if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
  if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
  if (board.includes(null)) return null;
  return 'T';
}

function render() {
  renderBoard();
  renderMessage();
  // hide/show PLAY AGAIN button
  playAgainBtn.disabled = !winner;
}

function renderBoard() {
  board.forEach(function(sqVal, idx) {
    const squareEl = document.getElementById(`${idx}`);
    squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
    // add class of each player color if square available for hover effect
    if (turn > 0) {
      squareEl.className = !sqVal ? 'avail' : '';
    } else {
      squareEl.className = !sqVal ? 'avail2' : '';
    }
  });
}

function renderMessage() {
  if (winner === 'T') {
    messageEl.innerHTML = 'Its a tie!';
  } else if (winner) {
    messageEl.innerHTML = `Congrats <span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span>!`;
  } else {
    messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s Turn`;
  }
}