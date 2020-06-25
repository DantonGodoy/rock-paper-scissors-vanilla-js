'use strict';

const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const restartButton = document.querySelector('#restart');
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌️',
    beats: 'paper'
  }
];

window.addEventListener('DOMContentLoaded', getCurrentYear());
restartButton.addEventListener('click', removeSelectionResult());

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', () => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    makeSelection(selection);
  })
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const youWin = isWinner(selection, computerSelection);
  const computerWin = isWinner(computerSelection, selection);
  
  addSelectionResult(computerSelection, computerWin);
  addSelectionResult(selection, youWin);

  if (youWin) incrementScore(yourScoreSpan);
  if (computerWin) incrementScore(computerScoreSpan);
};

function incrementScore(scoreSpan) {
  return scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  const article = document.createElement('article');
  article.innerText = selection.emoji;
  article.classList.add('result-selection');
  if (winner) article.classList.add('winner');
  finalColumn.after(article);
};

function removeSelectionResult() {
  const articleRemoved = document.querySelectorAll('.result-selection');
  articleRemoved.forEach(elm => {
    if (elm) {
      elm.remove();
      yourScoreSpan.innerText = 0;
      computerScoreSpan.innerText = 0;
    }
  });
}

function isWinner(userSelection, opponentSelection) {
  return userSelection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

function getCurrentYear() {
  const year = new Date().getFullYear();
  const timerWrapper = document.querySelector('#currentYear');
  return timerWrapper.innerText = year;
}