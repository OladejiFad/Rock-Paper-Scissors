/*converting JSON string back to javascript*/
let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};
/* TO SHOW SCORE ON HTML*/
updateScoreElement();

/* if (!score) {
  score = {
    WIns: 0,
    Losses: 0,
    Ties : 0
  }

}; */

/* MY AUTO BUTTON */
let isAutoplaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
}


pickComputerMove = () => {
  randomNumber = Math.random();

  computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';

  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';

  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
  });

/*I USED EVENTLISTENER TO CONTROL D GAME FROM KEYBOARD*/
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
});

function playGame(playerMove) {
  computerMove = pickComputerMove();

  result = '';

  /* CHESSCODE ROCK*/
  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You win.';
    }
    /* CHESSCODE PAPER*/
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
    /* CHESSCODE SCISSORS*/
  } else if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You win.';
    } else if (computerMove === 'Scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You win.') {
    score.Wins++;

  } else if (result === 'You lose.') {
    score.Losses++;

  } else if (result === 'Tie.') {
    score.Ties++;
  }

  /*I saved Result to local storage*/
  localStorage.setItem('score', JSON.stringify(score));

  //  updateMovesElement ()
  document.querySelector('.js-moves').innerHTML = ` You
<img src="image/${playerMove}.png" class="move-icon">
<img src="image/${computerMove}.png" class="move-icon">
computer`;

  //  updateResultElement ()
  document.querySelector('.js-result').innerHTML = result;

  /* TO SHOW SCORE ON HTML*/
  updateScoreElement();

}

/*FUNCTION TO SHOW SCORE ON HTML*/
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins ${score.Wins}  Loses ${score.Losses}  Ties ${score.Ties}`;
}
