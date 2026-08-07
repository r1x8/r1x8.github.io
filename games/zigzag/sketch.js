// colours
const backgroundcolor = "#333333";
const foregroundcolor = "#ffffff";

const normalColor = "#00ff00";
const firingColor = "#ff0000";
const enemyColor = "#c800ff"

// doesn't change.
let pagewidth;
let pageheight;

// doesn't change (obviously)
const enemySize = 15;

// enemy-related, change
let enemyX;
let enemyY;
let strokeColor = normalColor;
let direction = [1, 1]
let speed = 1.6;

// regular game, change
let running = true;
let score = 0;
let lives = 10;

function enemy() {
  enemyX += direction[0] * speed;
  enemyY += direction[1] * speed;
  enemyX = (enemyX + pagewidth) % pagewidth;
  enemyY = (enemyY + pageheight) % pageheight;
  
  noStroke();
  fill(enemyColor);
  rectMode(CENTER);
  rect(enemyX, enemyY, enemySize*2, enemySize*2);

  if (frameCount % 60 == 0) {
    direction[0] = (Math.random()*2)-1;
    direction[1] = (Math.random()*2)-1;
  }
}

function hitEnemy() {
  enemyX = Math.random()*pagewidth;
  enemyY = Math.random()*pageheight;
  direction[0] = (Math.random()*2)-1;
  direction[1] = (Math.random()*2)-1;
}

function fire() {
  lives--;
  if (Math.abs(enemyX - mouseX) < enemySize) {
    if (Math.abs(enemyY - mouseY) < enemySize) {
      score++;
      hitEnemy();
      speed += 0.2;
    }
  }
}

function mousePressed() {
  if (running) {
    strokeColor = firingColor;
    fire();
  }
}
function mouseReleased() {
  strokeColor = normalColor;
}

function setup() {
  pagewidth = windowWidth;
  pageheight = windowHeight;
  enemyX = pagewidth/2;
  enemyY = pageheight/2;
  createCanvas(pagewidth, pageheight);
}

function draw() {
  background(backgroundcolor);

  if (running) {
    enemy();
  } else {
    textSize(50);
    textFont("Inter");
    textAlign(CENTER, CENTER)
    text("GAME OVER", pagewidth/2, pageheight/2);
  }
  
  fill(strokeColor);
  stroke(strokeColor);
  strokeWeight(3);
  
  line(mouseX, 0, mouseX, windowHeight) //vertical
  line(0, mouseY, windowWidth, mouseY) //horizontal

  strokeWeight(1)
  textSize(18)
  textFont("Inter")
  textAlign(LEFT, TOP)
  text("Score: " + score + ", Lives: " + lives, pagewidth/50, pagewidth/50);

  if (lives <= 0) {
    running=false;
  }
}
