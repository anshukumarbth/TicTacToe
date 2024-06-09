document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cellIndex = parseInt(e.target.id.split('-')[1]);

        if (gameState[cellIndex] || !gameActive) return;

        gameState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer);

        if (checkWin()) {
            gameActive = false;
            message.textContent = `${currentPlayer} wins!`;
            overlay.classList.add('active');
            return;
        }

        if (checkDraw()) {
            gameActive = false;
            message.textContent = 'It\'s a draw!';
            overlay.classList.add('active');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWin = () => {
        return winningCombinations.some(combination => {
            return combination.every(index => gameState[index] === currentPlayer);
        });
    };

    const checkDraw = () => {
        return gameState.every(cell => cell !== '');
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });

        overlay.classList.remove('active');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
