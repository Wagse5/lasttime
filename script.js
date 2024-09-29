// Game variables
const bird = document.getElementById('bird');
const pipes = document.getElementById('pipes');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');

let birdY = 300;
let birdVelocity = 0;
let gravity = 0.5;
let score = 0;
let gameLoop;
let pipeInterval;

// Initialize game
function initGame() {
    birdY = 300;
    birdVelocity = 0;
    score = 0;
    scoreElement.textContent = score;
    bird.style.top = ${birdY}px;
    pipes.innerHTML = '';
    startButton.style.display = 'none';
}

// Start game
function startGame() {
    initGame();
    gameLoop = setInterval(updateGame, 20);
    pipeInterval = setInterval(createPipe, 1500);
}

// Update game state
function updateGame() {
    birdVelocity += gravity;
    birdY += birdVelocity;
    bird.style.top = ${birdY}px;

    if (birdY < 0 || birdY > 560) {
        gameOver();
    }

    const pipeElements = document.querySelectorAll('.pipe');
    pipeElements.forEach(pipe => {
        const pipeLeft = parseInt(pipe.style.left);
        pipe.style.left = ${pipeLeft - 2}px;

        if (pipeLeft < -60) {
            pipe.remove();
            score++;
            scoreElement.textContent = score;
        }

        if (checkCollision(pipe)) {
            gameOver();
        }
    });
}

// Create new pipe
function createPipe() {
    const pipeHeight = Math.random() * 300 + 100;
    const pipe = document.createElement('div');
    pipe.className = 'pipe';
    pipe.style.height = ${pipeHeight}px;
    pipe.style.left = '400px';
    pipe.style.bottom = '0';
    pipes.appendChild(pipe);

    const topPipe = document.createElement('div');
    topPipe.className = 'pipe';
    topPipe.style.height = ${600 - pipeHeight - 150}px;
    topPipe.style.left = '400px';
    topPipe.style.top = '0';
    pipes.appendChild(topPipe);
}

// Check collision
function checkCollision(pipe) {
    const birdRect = bird.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    return (
        birdRect.left < pipeRect.right &&
        birdRect.right > pipeRect.left &&
        birdRect.top < pipeRect.bottom &&
        birdRect.bottom > pipeRect.top
    );
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    clearInterval(pipeInterval);
    startButton.style.display = 'block';
}

// Event listeners
startButton.addEventListener('click', startGame);
gameContainer.addEventListener('click', () => {
    birdVelocity = -10;
});

// Initialize game on load
initGame();
