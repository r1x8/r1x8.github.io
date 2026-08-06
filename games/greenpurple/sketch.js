// env vars
const backgroundcolor = "#333333";
const foregroundcolor = "#ffffff";
const green = "#00cc00";
const purple = "#BF40BF";
const red = "#ff0000";
const timeLimit = 120000; // two minutes

// global, doesn't change
let pagewidth;
let pageheight;
let greenRect;
let purpleRect;

// global, changes
let score = 0;
let levelInProgress;
let answer; // focus on what the text says, not what colour it is.
let textColor;
let textContent;

function loadLevel() {
  textColor = Math.random() > 0.5 ? green : purple;
  textContent = Math.random() > 0.5 ? "green" : "purple";
  answer = textContent;
  levelInProgress = true;
}

function handleClick(button) {
  switch (button) {
    case 1:
      answer == "green" ? win() : lose();
      break;
    case 2:
      answer == "purple" ? win() : lose();
      break;
  }
}

function win() {
  score++;
  levelInProgress = false;
  loadLevel();
}

function lose() {
  textContent = "Score: " + score;
  textColor = red;
  levelInProgress = false;
}

function isInside(r, x, y) {
  return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
}

function setup() {
  pagewidth = windowWidth;
  pageheight = windowHeight;
  greenRect = { x: 0, y: pageheight/2, w: pagewidth/2, h: pageheight/2, c: green}
  purpleRect = { x: pagewidth/2, y: pageheight/2, w: pagewidth/2, h: pageheight/2, c: purple}
  createCanvas(pagewidth, pageheight);
  loadLevel();
  setTimeout(lose, timeLimit)
}

function draw() {
  background(backgroundcolor);
  textSize(80);
  textFont("Inter");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  fill(textColor);
  text(textContent, pagewidth/2, pageheight/6);

  fill(greenRect.c);
  rect(greenRect.x, greenRect.y, greenRect.w, greenRect.h, 10);

  
  fill(purpleRect.c);
  rect(purpleRect.x, purpleRect.y, purpleRect.w, purpleRect.h, 10);
}

function mousePressed() {
  if (!levelInProgress) return;
  if (isInside(greenRect, mouseX, mouseY)) {
    handleClick(1)
  }
  if (isInside(purpleRect, mouseX, mouseY)) {
    handleClick(2)
  }
}