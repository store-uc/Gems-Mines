let boardSize = 5; // 5x5 board
let mineCount = 10; // Default number of mines

document.getElementById('set-mines-button').addEventListener('click', () => {
    const mineSelection = document.getElementById('mine-selection');
    mineSelection.style.display = mineSelection.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('mine-count-select').addEventListener('change', (event) => {
    mineCount = parseInt(event.target.value, 10);
});

document.getElementById('start-button').addEventListener('click', initGame);

function initGame() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    document.getElementById('status').textContent = '';

    const totalTiles = boardSize * boardSize;
    const mines = new Set();

    while (mines.size < mineCount) {
        const randomIndex = Math.floor(Math.random() * totalTiles);
        mines.add(randomIndex);
    }

    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.type = mines.has(i) ? 'mine' : 'gem';
        tile.addEventListener('click', () => revealTile(tile));
        boardElement.appendChild(tile);
    }
}

function revealTile(tile) {
    if (tile.dataset.revealed) return;

    tile.dataset.revealed = true;
    const type = tile.dataset.type;

    if (type === 'gem') {
        tile.classList.add('gem');
        tile.textContent = '💎';
    } else if (type === 'mine') {
        tile.classList.add('mine');
        tile.textContent = '💣';
        document.getElementById('status').textContent = '💥 Game Over!';
        document.getElementById('status').classList.add('game-over');
        revealAllTiles();
        disableBoard();
    }
}

function revealAllTiles() {
    document.querySelectorAll('.tile').forEach(tile => {
        if (!tile.dataset.revealed) {
            tile.dataset.revealed = true;
            const type = tile.dataset.type;
            if (type === 'gem') {
                tile.classList.add('gem');
                tile.textContent = '💎';
            } else if (type === 'mine') {
                tile.classList.add('mine');
                tile.textContent = '💣';
            }
        }
    });
}

function disableBoard() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.style.pointerEvents = 'none';
    });
}

// Populate mine selection dropdown
const selectElement = document.getElementById('mine-count-select');
for (let i = 1; i <= 20; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
}
