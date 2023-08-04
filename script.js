const numRounds = 5;
const numPlayers = 9;
const playerNames = [...Array(numPlayers).keys()].map((i) => `Player ${i+1}`);
const scores = Array(numPlayers).fill().map(() => Array(numRounds).fill({ win: null, points: 0 }));

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('nextRound').addEventListener('click', nextRound);

let currentRound = 0;

function startGame() {
    createTable();
    document.getElementById('nextRound').style.display = 'block';
}

function createTable() {
    const table = document.getElementById('scoreTable');
    table.innerHTML = '';

    // Header row
    const headerRow = document.createElement('tr');
    for (let i = 0; i < numRounds; i++) {
        headerRow.appendChild(createCell(`W/L`, true));
        headerRow.appendChild(createCell(`Pts Scored`, true));
    }
    table.appendChild(headerRow);

    // Player rows
    playerNames.forEach((player, index) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(player, true));
        for (let i = 0; i < numRounds; i++) {
            const winCell = createCell('');
            const pointsCell = createCell('');

            if (i === currentRound) {
                const winSelect = document.createElement('select');
                winSelect.appendChild(new Option('W', 'W'));
                winSelect.appendChild(new Option('L', 'L'));
                winSelect.addEventListener('change', (e) => updateScore(index, i, e.target.value, null));
                winCell.appendChild(winSelect);

                const pointsInput = document.createElement('input');
                pointsInput.type = 'number';
                pointsInput.value = 0;
                pointsInput.addEventListener('input', (e) => updateScore(index, i, null, Number(e.target.value)));
                pointsCell.appendChild(pointsInput);
            }
            row.appendChild(winCell);
            row.appendChild(pointsCell);
        }
        table.appendChild(row);
    });
}

function createCell(content, isHeader = false) {
    const cell = document.createElement(isHeader ? 'th' : 'td');
    cell.innerHTML = content;
    return cell;
}

function updateScore(playerIndex, roundIndex, win, points) {
    if (win !== null) scores[playerIndex][roundIndex].win = win;
    if (points !== null) scores[playerIndex][roundIndex].points = points;
}

function nextRound() {
    currentRound++;
    if (currentRound >= numRounds) {
        document.getElementById('nextRound').style.display = 'none';
        calculateTotalScores();
    } else {
        createTable();
    }
}

function calculateTotalScores() {
    const totalScoresDiv = document.getElementById('totalScores');
    totalScoresDiv.innerHTML = '';
    playerNames.forEach((player, index) => {
        const totalScore = scores[index].reduce((total, round) => {
            return total + (round.win === 'W' ? 1 : 0) + (round.points * 0.1);
        }, 0);
        totalScoresDiv.innerHTML += `<div>${player}: ${totalScore}</div>`;
    });
}
