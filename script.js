document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resultScreen = document.getElementById('result-screen');
    const resultText = document.getElementById('result-text');
    const newGameBtn = document.getElementById('new-game-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to check for a winner
    function checkWinner() {
        console.log('checking winner. please wait');
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                return gameBoard[a];
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            return 'T'; // Tie
        }

        return null;
    }

    // Function to handle cell click
    function handleCellClick(index) {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            const cell = document.getElementById(`cell${index}`);
            cell.textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                showResultScreen(winner);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to display result screen
    function showResultScreen(result) {
        let resultMessage = '';
        if (result === 'T') {
            resultMessage = 'It\'s a tie!';
        } else {
            resultMessage = `Player ${result} wins!`;
        }
        resultText.textContent = resultMessage;
        resultScreen.style.display = 'flex';
    }

    // Function to start a new game
    function startNewGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        resultScreen.style.display = 'none';

        // Reset the board
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });

        // Reset the status
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Dynamically generate the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell${i}`;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Event listener for the new game button
    newGameBtn.addEventListener('click', startNewGame);
});
