let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const turnInfo = document.getElementById('turn-info');
const winnerInfo = document.getElementById('winner-info');
const cells = document.getElementsByTagName('td');

function handleCellClick(e) {
    const cellIndex = e.target.id.split('-')[1];
    if (gameState[cellIndex] !== '') {
        alert('This cell has already been played.');
        return;
    }
    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
        winnerInfo.textContent = `Player ${currentPlayer} wins!`;
        disableCells();
        return;
    }
    if (checkDraw()) {
        winnerInfo.textContent = 'Game ends in a draw.';
        disableCells();
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnInfo.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function disableCells() {
    for (const cell of cells) {
        cell.removeEventListener('click', handleCellClick);
    }
}

function enableCells() {
    for (const cell of cells) {
        cell.addEventListener('click', handleCellClick);
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    turnInfo.textContent = `Player ${currentPlayer}'s turn`;
    winnerInfo.textContent = '';
    for (const cell of cells) {
        cell.textContent = '';
    }
    enableCells();
}

enableCells();
document.getElementById('restart-button').addEventListener('click', restartGame);