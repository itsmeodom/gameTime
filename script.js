let playerNames = [];
let scores = [];

document.getElementById('addPlayer').addEventListener('click', addPlayer);
document.getElementById('startSetup').addEventListener('click', startSetup);
document.getElementById('startGame').addEventListener('click', startGame);

function addPlayer() {
  const playerDiv = document.createElement('div');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter Player Name';
  playerDiv.appendChild(input);
  document.getElementById('playerNames').appendChild(playerDiv);
}

function startSetup() {
  playerNames = [...document.getElementById('playerNames').querySelectorAll('input')].map(input => input.value);
  scores = playerNames.map(() => 0);

  document.getElementById('playerSetup').style.display = 'none';
  document.getElementById('teamSetup').style.display = 'block';
}

function startGame() {
  const numTeams = document.getElementById('numTeams').value;
  for (let i = 1; i <= numRounds; i++) {
    createRound(i, numTeams);
  }
  calculateTotalScores();
}

function createRound(roundNumber, numTeams) {
  // ...
  const teams = createRandomTeams(numTeams);
  // ...
}

function createRandomTeams(numTeams) {
  const shuffledPlayers = playerNames.sort(() => 0.5 - Math.random());
  const teamSize = Math.floor(shuffledPlayers.length / numTeams);

  let teams = [];
  for (let i = 0; i < numTeams; i++) {
    teams.push(shuffledPlayers.slice(i * teamSize, (i + 1) * teamSize));
  }
  return teams;
}

// ... rest of the code remains the same
