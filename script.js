// First position Human Score, second position CPU score
const score = [0, 0];

const rules = {
  scissors: { paper: 'cuts', lizard: 'decapitates' },
  paper: { rock: 'covers', spock: 'disproves' },
  rock: { lizard: 'crushes', scissors: 'crushes' },
  lizard: { spock: 'poisons', paper: 'eats' },
  spock: { scissors: 'smashes', rock: 'vaporizes' },
};

const getComputerPlay = () => {
  const computerChoices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  return computerChoices[Math.floor(Math.random() * 5)];
};

const checkPlayerSelection = (playerSelection) => {
  const validInputs = ['rock', 'paper', 'scissors', 'lizard', 'spock', 'exit'];
  return validInputs.includes(playerSelection) ? true : alert('Wrong choice!');
};

const getPlayerPlay = (playerSelection) => {
  // ASK for player input.
  do {
    playerSelection = prompt(
      'Choose your weapon: (Rock, Paper, Scissors, Lizard, Spock, or exit to end the game'
    );

    playerSelection = playerSelection?.toLowerCase() ?? 'exit';

    // Repeat until player input is valid
  } while (!checkPlayerSelection(playerSelection));

  return playerSelection;
};

const getWinner = (pl, cpu) => {
  // Human press cancel button or type exit
  if (pl === 'exit') return 'exit';

  if (pl === cpu) return `Both chose ${pl}. It's a tie.`;

  // Check who won and increase win counter
  if (cpu in rules[pl]) {
    score[0]++;
    return `You win! ${pl} ${rules[pl][cpu]} ${cpu}`;
  } else {
    score[1]++;
    return `You lose! ${cpu} ${rules[cpu][pl]} ${pl}`;
  }
};

const printResults = (roundResult) => {
  console.log(roundResult);
  console.log(`Human Score: ${score[0]}`);
  console.log(`Computer Score: ${score[1]}`);
  console.log('------------------------');
  if (score[0] === 5) console.log('HUMAN PLAYER WON THE GAME!!!');
  if (score[1] === 5) console.log('CPU PLAYER WON THE GAME!!!');
};

// MAIN GAME
const game = () => {
  // Game Loop until one reaches 5 wins
  while (score.every((el) => el < 5)) {
    const playerSelection = getPlayerPlay();

    const computerSelection = getComputerPlay();

    const roundResult = getWinner(playerSelection, computerSelection);

    // IF player chooses exit or press cancel, end the game,
    if (roundResult === 'exit') {
      console.log('You ended the game');
      return;
    }

    printResults(roundResult);
  }
};

game();
