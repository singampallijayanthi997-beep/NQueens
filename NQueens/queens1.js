let N = 8;
const boardContainer = document.getElementById('board-container');
const slider = document.getElementById('n-slider');
const nValueLabel = document.getElementById('n-value');

function createBoard() {
    N = parseInt(slider.value);
    nValueLabel.innerText = N;
    boardContainer.style.gridTemplateColumns = `repeat(${N}, 50px)`;
    boardContainer.innerHTML = '';

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const square = document.createElement('div');
            square.id = `sq-${i}-${j}`;
            square.className = `square ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
            boardContainer.appendChild(square);
        }
    }
}

async function updateUI(row, col, action) {
    const el = document.getElementById(`sq-${row}-${col}`);
    const speed = 150; // Milliseconds

    if (action === 'trying') {
        el.classList.add('trying');
        await new Promise(r => setTimeout(r, speed));
    } else if (action === 'queen') {
        el.classList.remove('trying');
        el.innerHTML = '👑';
        el.classList.add('queen');
        await new Promise(r => setTimeout(r, speed));
    } else if (action === 'remove') {
        el.classList.remove('trying', 'queen');
        el.innerHTML = '';
        await new Promise(r => setTimeout(r, speed));
    }
}

document.getElementById('start-btn').onclick = async () => {
    const board = Array.from({ length: N }, () => Array(N).fill(0));
    document.getElementById('start-btn').disabled = true;
    await solveNQueens(board, 0, N, updateUI);
    document.getElementById('start-btn').disabled = false;
};

document.getElementById('reset-btn').onclick = createBoard;
slider.oninput = createBoard;

window.onload = createBoard;