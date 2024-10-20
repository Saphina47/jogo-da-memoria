const imageSet = [
    './assets/1.jpeg', './assets/2.jpeg',
    './assets/3.jpeg', './assets/4.jpeg',
    './assets/5.jpeg', './assets/6.jpeg',
    './assets/7.jpeg', './assets/8.jpeg',
];

const images = [...imageSet, ...imageSet];  // Gera pares

let board = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let seconds = 0;

const gameContainer = document.getElementById('game-container');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('misturar');

function initializeBoard() {
    board = shuffleArray(images);
    gameContainer.innerHTML = '';

    board.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index);
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        const index = this.getAttribute('data-index');
        this.innerHTML = `<img src="${board[index]}" alt="card" style="width: 100%; height: 100%;" />`;
        this.classList.add('flipped');
        flippedCards.push({ card: this, index });

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (board[firstCard.index] === board[secondCard.index]) {
        matchedPairs++;
        firstCard.card.removeEventListener('click', flipCard);
        secondCard.card.removeEventListener('click', flipCard);
    } else {
        firstCard.card.innerHTML = '';
        firstCard.card.classList.remove('flipped');
        secondCard.card.innerHTML = '';
        secondCard.card.classList.remove('flipped');
    }

    flippedCards = [];
    checkGameOver();
}

function checkGameOver() {
    if (matchedPairs === imageSet.length) {  // Considera o número de pares
        clearInterval(timer);
        alert('Parabéns! Você encontrou todos os pares!');
        restartButton.style.display = 'block';
    }
}

function startTimer() {
    seconds = 0;
    timeDisplay.textContent = formatTime(seconds);
    timer = setInterval(() => {
        seconds++;
        timeDisplay.textContent = formatTime(seconds);
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function restartGame() {
    matchedPairs = 0;
    clearInterval(timer);
    startTimer();
    initializeBoard();
    restartButton.style.display = 'none';
}

restartButton.addEventListener('click', restartGame);
initializeBoard();
startTimer();
