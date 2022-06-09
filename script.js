'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const score2El = document.getElementById('score--2');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const currentScore2El = document.getElementById('current--2');
const currentScoreEl = document.querySelector('.current-score');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore2El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player2El.classList.remove('player--active');

  document.getElementById(`name--0`).textContent = `Игрок 1`;
  document.getElementById(`name--1`).textContent = `Игрок 2`;
  document.getElementById(`name--2`).textContent = `Игрок 3`;
  // btnNew.textContent = 'заново';
  // btnRoll.textContent = 'кинуть кости';
  // btnHold.textContent = 'забрать очки';
};
init();
const switchPlayer = function () {
  //switch to next player
  // 1. поменять стиль предыдущего активного игрока и нового активного
  // 2. обнулить currentScore у предыдущего активного игрока

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active'); // for 3+ players
  // activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer = activePlayer === 0 ? 1 : activePlayer === 1 ? 2 : 0; //for 3 players
  // player0El.classList.toggle('player--active'); //меняет player--active местами между 0-ым и 1-ым игроком
  // player1El.classList.toggle('player--active'); //меняет player--active местами между 0-ым и 1-ым игроком

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active'); // for 3+ players
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generate random dice number between 1...6
    let diceNumber = Math.trunc(Math.random() * 6 + 1);
    console.log(diceNumber);

    // 2. display dice picture
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;
    // 3. check if dice === 1. if true => switch to next player if false add diceNumber to current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0El.textContent = currentScore; //CHANGE LATER
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if score >= 100
    // 3. if true - active player wins - finish game
    // 4. if false - switch to the next player
    if (scores[activePlayer] >= 100) {
      // finish game
      playing = false;
      diceEl.classList.add('hidden');
      // replacing Player #... for "WINNER!" to the winner
      document.getElementById(`name--${activePlayer}`).textContent = `ПОБЕДА!`;
      // document.getElementById(`score--${activePlayer}`).textContent =
      //   scores[activePlayer] +
      //   `
      //   WIN!`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// reset the game
btnNew.addEventListener('click', function () {
  init();
  // console.log('btnNew work');
});
