async function solveNQueens(board, row, n, visualizeStep) {
    if (row === n) return true;

    for (let col = 0; col < n; col++) {
        // Visualize the "trying" state
        await visualizeStep(row, col, 'trying');

        if (isSafe(board, row, col, n)) {
            board[row][col] = 1;
            await visualizeStep(row, col, 'queen');

            if (await solveNQueens(board, row + 1, n, visualizeStep)) {
                return true;
            }

            // Backtrack
            board[row][col] = 0;
            await visualizeStep(row, col, 'remove');
        } else {
            await new Promise(r => setTimeout(r, 50));
            await visualizeStep(row, col, 'remove');
        }
    }
    return false;
}

function isSafe(board, row, col, n) {
    // Check column
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
    }
    // Check upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }
    // Check upper right diagonal
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false;
    }
    return true;
}