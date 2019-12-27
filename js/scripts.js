const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pairs = 0;
let mistakes = 0



function flipCard() {
  if (lockBoard) return; //prevents flipping cards whenever there are two cards flipped
  if (this === firstCard) return; //prevents clicking the same card twice

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.got === secondCard.dataset.got;

  isMatch ? disableCards() : unflipCards();
}

//if both flipped cards are the same we removed clickevent on both
function disableCards() {
  pairs++;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  if(pairs === cards.length/2 ){
    let field = document.querySelector('.memory-game');
    field.style.display = "none";
  }
}
//if unmatch cards we unflip them and resets variables
function unflipCards() {
  lockBoard = true;
  mistakes++;
  printMistakes();
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//shuffling cards places by using flex's flex order
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

//background audio
(function audioBG() {
  document.getElementById('audio').addEventListener('click', () => {
    let mus = document.getElementById('mute');
    let aud = document.getElementById('musicb');
    if (mus.className == 'fas fa-volume-mute') {
      mus.className = 'fas fa-volume-up';
      aud.play();
    }
    else {
      mus.className = 'fas fa-volume-mute';
      aud.pause();
    }
  })})();

function printMistakes(){
  let mistake = document.getElementById('mistakes');
  mistake.innerHTML = `Mistakes: ${mistakes}`;
};



