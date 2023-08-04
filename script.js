let numPlayers;
let numRounds;
let players = [];
let scores = [];
let currentRound = 0;

function setupGame() {
    numPlayers = parseInt(document.getElementById('numPlayers').value);
    numRounds = parseInt(document.getElementById('numRounds').value);
    const playerNamesDiv = document.getElementById('playerNames');
    playerNamesDiv.innerHTML = '';
    for (let i = 0; i < numPlayers; i++) {
        const label = document.createElement('label');
        label.textContent = 'Player ' + (i + 1) + ': ';
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'playerName' + i;
        playerNamesDiv.appendChild(label);
        playerNamesDiv.appendChild(input);
        playerNamesDiv.appendChild(document.createElement('br'));
    }
    const button = document.createElement('button');
    button.textContent = 'Start New Game';
    button.onclick = startGame;
    playerNamesDiv.appendChild(button);
    playerNamesDiv.style.display = 'block';
}

function startGame() {
    for (let i = 0; i < numPlayers; i++) {
        players[i] = document.getElementById('playerName' + i).value || 'Player ' + (i + 1);
    }
    scores = new Array(numPlayers).fill(null).map(() => new Array(numRounds).fill({ win: '', points: 0 }));
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('gameInterface').style.display = 'block';
    createTable();
}

function createTable() {
    document.getElementById('roundIndicator').textContent = `Round ${currentRound + 1} of ${numRounds}`;
    const table = document.getElementById('scoreTable');
    table.innerHTML = '';
    const header = table.createTHead().insertRow();
    header.insertCell().textContent = 'Player Name';
    for (let i = 0; i < numRounds; i++) {
        header.insertCell().textContent = 'W/L';
        header.insertCell().textContent = 'Pts Scored';
    }
    for (let pIndex = 0; pIndex < numPlayers; pIndex++) {
        const row = table.insertRow();
        row.insertCell().textContent = players[pIndex];
        for (let rIndex = 0; rIndex < numRounds; rIndex++) {
            const winCell = row.insertCell();
            const pointsCell = row.insertCell();
            const winSelect = document.createElement('select');
            winSelect.style.width = '50px';
            winSelect.innerHTML = '<option value=""></option><option value="W">W</option><option value="L">L</option>';
            if (rIndex !== currentRound) winSelect.disabled = true;
            if (scores[pIndex][rIndex].win) winSelect.value = scores[pIndex][rIndex].win;
            winCell.appendChild(winSelect);
            const pointsInput = document.createElement('input');
            pointsInput.type = 'number';
            pointsInput.min = '0';
            pointsInput.style.width = '50px';
            if (rIndex !== currentRound) pointsInput.disabled = true;
            if (scores[pIndex][rIndex].points) pointsInput.value = scores[pIndex][rIndex].points;
            pointsCell.appendChild(pointsInput);
        }
    }
}

function changeRound(direction) {
    const table = document.getElementById('scoreTable');
    for (let pIndex = 0; pIndex < numPlayers; pIndex++) {
        const row = table.rows[pIndex + 1];
        const winSelect = row.cells[currentRound * 2 + 1].querySelector('select');
        const pointsInput = row.cells[currentRound * 2 + 2].querySelector('input');
        scores[pIndex][currentRound] = { win: winSelect.value, points: parseFloat(pointsInput.value) || 0 };
    }
    currentRound += direction;
    if (currentRound >= numRounds) {
        calculateFinalScores();
        return;
    }
    createTable();
}

function calculateFinalScores() {
    const finalScores = players.map((player, index) => {
        let totalScore = 0;
        for (const score of scores[index]) {
            totalScore += score.win === 'W' ? 1 : 0;
            totalScore += score.points * 0.1;
        }
        return { player, totalScore };
    });
    finalScores.sort((a, b) => b.totalScore - a.totalScore);
    const table = document.getElementById('finalScoreTable');
    table.innerHTML = '';
    for (const score of finalScores) {
        const row = table.insertRow();
        row.insertCell().textContent = score.player;
        row.insertCell().textContent = score.totalScore.toFixed(1);
    }
    document.getElementById('finalScores').style.display = 'block';
    document.getElementById('gameInterface').style.display = 'none';
}
