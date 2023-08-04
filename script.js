let numRounds;
let numPlayers;
let scores;
let currentRound = 0;

document.getElementById('setupGame').addEventListener('click', setupGame);
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('nextRound').addEventListener('click', () => changeRound(1));
document.getElementById('prevRound').addEventListener('click', () => changeRound(-1));

function setupGame() {
    numRounds = document.getElementById('numRounds').value;
    numPlayers = document.getElementById('numPlayers').value;
    scores = Array(numPlayers).fill().map(() => Array(numRounds).fill({ win: null, points: 0 }));
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('startGame').style.display = 'block';
}

function startGame() {
    createTable();
    document.getElementById('nextRound').style.display = 'block';
    document.getElementById('prevRound').style.display = 'block';
}

function createTable() {
    const table = document.getElementById('scoreTable');
    table.innerHTML = '';
    const header = table.insertRow();
    header.insertCell().textContent = 'Player Name';
    for (let i = 0; i < numRounds; i++) {
        const cell = header.insertCell();
        cell.colSpan = '2';
        cell.textContent = `Round ${i + 1}`;
    }

    for (let pIndex = 0; pIndex < numPlayers; pIndex++) {
        const row = table.insertRow();
        row.insertCell().textContent = `Player ${pIndex + 1}`;
        for (let rIndex = 0; rIndex < numRounds; rIndex++) {
            const winCell = row.insertCell();
            const pointsCell = row.insertCell();
            const winSelect = document.createElement('select');
            winSelect.innerHTML = '<option value=""></option><option value="W">W</option><option value="L">L</option>';
            winCell.appendChild(winSelect);
            const pointsInput = document.createElement('input');
            pointsInput.type = 'number';
            pointsInput.min = '0';
            pointsCell.appendChild(pointsInput);
        }
    }
}

function changeRound(direction) {
    currentRound += direction;
    if (currentRound < numRounds) {
        // Reset current round to defaults
        scores.forEach((playerScores) => {
            playerScores[currentRound] = { win: null, points: 0 };
        });
    }
    createTable();
}

// Call setupGame on page load
setupGame();
