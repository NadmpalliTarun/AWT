const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = []; 
snake[0] = { x: 9 * box, y: 10 * box }; 
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};
let d = 'RIGHT';
let score = 0;
let highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0;
let gameOverMessage = ""; 
document.addEventListener('keydown', direction);

function direction(event) {
    if (!started) {
        started = true;
    }
    if (event.keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
    else if (event.keyCode === 38 && d !== 'DOWN') d = 'UP';
    else if (event.keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
    else if (event.keyCode === 40 && d !== 'UP') d = 'DOWN';
}
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return false;
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white'; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;
    if (snakeX === food.x && snakeY === food.y) {
        score++; 
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }
    const newHead = {
        x: snakeX,
        y: snakeY
    };
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            gameOverMessage = "New High Score!";
        } else {
            gameOverMessage = "Chim Tapak Dum Dum";
        }
        ctx.fillStyle = "yellow";
        ctx.font = "40px Arial";
        ctx.fillText(gameOverMessage, canvas.width / 4, canvas.height / 2 - 20);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Your Score: " + score, canvas.width / 4, canvas.height / 2 + 20);
        ctx.fillText("High Score: " + highScore, canvas.width / 4, canvas.height / 2 + 50);
        return;
    }
    snake.unshift(newHead);  
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, box, 1.5 * box);
    ctx.fillText("High Score: " + highScore, box, 3 * box);
}
const game = setInterval(draw, 100);