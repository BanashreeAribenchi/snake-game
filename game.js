const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 2;

//size of the tiles
let tileCount = 20;
let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

//size of snake and object
let tileSize = canvas.width / tileCount - 2;

//Initial direction of food
let foodX = 5;
let foodY = 5;

// Initial direction of snake
let dx = 0;
let dy = 0;

//score board
let score = 0;

//game loop
function drawGame() {
  changeSnakePosition();

  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkFoodCollision();
  drawFood();
  drawSnake();
  drawScore();

  if (score > 2) {
    speed = 4;
  } else if (score > 4) {
    speed = 6;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (dx === 0 && dy === 0) {
    return false;
  }

  //walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText("Game over!!!", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText(`Score ${score}`, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "#1A2421";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new SnakePart(headX, headY)); //put item at the end of the snake body(tail)
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); //remove the last item(tail) from the snake body
  }
  ctx.fillStyle = "blue";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + dx;
  headY = headY + dy;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function checkFoodCollision() {
  if (foodX === headX && foodY === headY) {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

/*Event listener for key presses*/
document.addEventListener("keydown", handleKeyPress);

/* Function to handle key presses*/
function handleKeyPress(e) {
  /*Update direction based on the pressed key*/
  switch (e.key) {
    case "ArrowUp":
      if (dy !== 1) {
        // Prevent moving down if currently moving up
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy !== -1) {
        // Prevent moving up if currently moving down
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx !== 1) {
        // Prevent moving right if currently moving left
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -1) {
        // Prevent moving left if currently moving right
        dx = 1;
        dy = 0;
      }
      break;
  }
}

drawGame();
