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
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('gameInterface').style.display = 'block';
    createTable();
    updateLiveLeaderboard();
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
            const winCheckbox = document.createElement('input');
            winCheckbox.type = 'checkbox';
            winCheckbox.style.margin = 'auto';
            if (rIndex !== currentRound) winCheckbox.disabled = true;
            if (scores[pIndex][rIndex].win === 'W') winCheckbox.checked = true;
            winCell.appendChild(winCheckbox);
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
        const winCheckbox = row.cells[currentRound * 2 + 1].querySelector('input[type="checkbox"]');    
        const pointsInput = row.cells[currentRound * 2 + 2].querySelector('input');
        scores[pIndex][currentRound] = { win: winCheckbox.checked ? 'W' : 'L', points: parseFloat(pointsInput.value) || 0 };

    }
    currentRound += direction;
    if (currentRound >= numRounds) {
        calculateFinalScores();
        return;
    }
    createTable();
    updateLiveLeaderboard();
}

function updateLiveLeaderboard() {
    const liveScores = calculateScores();
    liveScores.sort((a, b) => b.totalScore - a.totalScore);
    
    const table = document.getElementById('liveScoreTable');
    table.innerHTML = '';
    for (const score of liveScores) {
        const row = table.insertRow();
        row.insertCell().textContent = score.player;
        row.insertCell().textContent = score.totalScore.toFixed(1);
    }
    document.getElementById('liveScores').style.display = 'block';
}

function calculateScores() {
    return players.map((player, index) => {
        let totalScore = 0;
        for (const score of scores[index]) {
            totalScore += score.win === 'W' ? 1 : 0;
            totalScore += score.points * 0.1;
        }
        return { player, totalScore };
    });
}

function calculateFinalScores() {
    const finalScores = calculateScores();
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
