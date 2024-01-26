const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 1;

//size of the tiles
let tileCount = 20;
let headX = 10;
let headY = 10;

//size of snake and object
let tileSize = canvas.width / tileCount - 2;

//Initial direction of food
let foodX = 5;
let foodY = 5;

// Initial direction of snake
let dx = 0;
let dy = 0;

//game loop
function drawGame() {
  clearScreen();
  changeSnakePosition();
  checkFoodCollision();
  drawFood();
  drawSnake();
  setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
  ctx.fillStyle = "#1A2421";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "blue";
  ctx.fillRect(headX * tileCount, foodY * tileCount, tileSize, tileSize);
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
  if (foodX === headX && foodY === foodY) {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
  }
}

/*Event listener for key presses*/
document.addEventListener("keydown", handleKeyPress);

/* Function to handle key presses*/
function handleKeyPress(e) {
  /*Update direction based on the pressed key*/
  switch (e.key) {
    case "ArrowUp":
      dx = 0;
      dy = -1;
      break;
    case "ArrowDown":
      dx = 0;
      dy = 1;
      break;
    case "ArrowLeft":
      dx = -1;
      dy = 0;
      break;
    case "ArrowRight":
      dx = 1;
      dy = 0;
      break;
  }
}

drawGame();
