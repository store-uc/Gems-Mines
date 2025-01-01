const boardSize = 6;
let mineCount = 10;

document.getElementById('mine-slider').addEventListener('input', (event) => {
    mineCount = parseInt(event.target.value, 10);
    document.getElementById('mine-count').textContent = mineCount;
});

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
        document.getElementById('status').textContent = 'Game Over! You hit a mine!';
        revealAllTiles();
        disableBoard();
    }
}

function revealAllTiles() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
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
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.style.pointerEvents = 'none');
}

document.getElementById('reset-button').addEventListener('click', initGame);

initGame();
