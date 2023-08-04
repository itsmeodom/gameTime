const numRounds = 5;
const numPlayers = 9;
const playerNames = [...Array(numPlayers).keys()].map((i) => `Player ${i+1}`);
const scores = playerNames.map(() => 0);

function startGame() {
    for (let i = 1; i <= numRounds; i++) {
        createRound(i);
    }
    calculateTotalScores();
}

function createRound(roundNumber) {
    const roundDiv = document.createElement('div');
    roundDiv.innerHTML = `<h2>Round ${roundNumber}</h2>`;
    document.getElementById('rounds').appendChild(roundDiv);

    const teams = createRandomTeams();
    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.innerHTML = `<h3>Team ${index+1}</h3>`;
        roundDiv.appendChild(teamDiv);
        
        team.forEach(player => {
            const scoreDiv = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'number';
            input.value = 0;
            input.className = 'score';
            input.addEventListener('input', (e) => updateScore(player, roundNumber, Number(e.target.value)));
            teamDiv.appendChild(document.createTextNode(player));
            teamDiv.appendChild(input);
            teamDiv.appendChild(document.createElement('br'));
        });
    });
}

function createRandomTeams() {
    const shuffledPlayers = playerNames.sort(() => 0.5 - Math.random());
    return [shuffledPlayers.slice(0, shuffledPlayers.length / 2), shuffledPlayers.slice(shuffledPlayers.length / 2)];
}

function updateScore(player, round, points) {
    // Assuming a win is 1 point and every scored point is 0.1
    scores[playerNames.indexOf(player)] += points * 0.1;
    calculateTotalScores();
}

function calculateTotalScores() {
    const totalScoresDiv = document.getElementById('totalScores');
    totalScoresDiv.innerHTML = '';
    playerNames.forEach((player, index) => {
        totalScoresDiv.innerHTML += `<div>${player}: ${scores[index]}</div>`;
    });
}

document.getElementById('startGame').addEventListener('click', startGame);
