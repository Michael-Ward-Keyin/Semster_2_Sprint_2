let score = 0;
let timeLeft = 10;
let gameStarted = false;
let timerInterval;


const button = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const highScoreDisplay = document.getElementById('highScore');
const affirmingMessage = document.getElementById('affirmingMessage');

let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
highScoreDisplay.textContent = `High Score: ${highScore}`;


startButton.addEventListener('click', function() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        timeLeft = 10;
        scoreDisplay.textContent = 'Energy Collected: ' + score;
        timerDisplay.textContent = 'Time Left: ' + timeLeft;

        button.style.display = 'inline-block';
        startButton.style.display = 'none'; 

        affirmingMessage.textContent = ''; 

        timerInterval = setInterval(function() {
            timeLeft--;
            timerDisplay.textContent = 'Time Left: ' + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval); 
                gameOver();
            }
        }, 1000);
    }
});


button.addEventListener('click', function() {
    if (gameStarted) {
        score++;
        scoreDisplay.textContent = 'Energy Collected: ' + score;
    }
});

function gameOver() {
    button.style.display = 'none'; 
    startButton.style.display = 'inline-block';
    alert('Test Over! Your final energy score is: ' + score); 

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        affirmingMessage.textContent = "Well done, young wizard! You've beaten the high score! Your magic is quite powerful! ";
    } else {
        affirmingMessage.textContent = "Great effort! Keep growing your magic power and you'll beat the high score next time! ";
    }

    gameStarted = false;
    startButton.textContent = 'Restart the Test';
}