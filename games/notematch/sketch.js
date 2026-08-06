const backgroundcolor = "#333333";
const foregroundcolor = "#ffffff";

let pagewidth;
let pageheight;

let osc;
let freq = "?"
let guess = 440;
let lastGuess = 440;
let lastError = "?";
let gameStarted = false;
let gameRunning = false;

function setup() {
  pagewidth = windowWidth;
  pageheight = windowHeight;
  createCanvas(pagewidth, pageheight);

  textSize(18);
  textAlign(CENTER, CENTER);
  
  osc = new p5.Oscillator('sawtooth');
  osc.amp(0);
}

function calculateGuess() {
  guess = Math.round((mouseX/pagewidth*1001)+300)
}

function getText() {
  if (gameStarted) {
    if (gameRunning) {
      return "Current Guess: " + guess + " Hz";
    } else {
      return "Your guess: " + lastGuess + " Hz\nActual: " + freq + " Hz\nError: " + lastError + "%";
    }
  } else {
    return "Click to play the tone.\nMove the mouse left and right to guess.\nClick again to guess.";
  }
}

function mousePressed() {
  gameStarted = true;
  if (!gameRunning) {
    gameRunning = true;
    freq = Math.round((Math.random()*1000)+300); // random between 300Hz and 1300Hz (300+1000)
    osc.freq(freq);
    osc.start();
    osc.amp(0.2, 0.4);
    osc.amp(0, 0.8);
    osc.stop(1);
  } else {
    lastGuess = guess;
    lastError = Math.round((Math.abs(guess-freq)/freq)*1000)/10;
    gameRunning = false;
  }
}

function draw() {
  calculateGuess();
  background(backgroundcolor);
  fill(foregroundcolor);

  textSize(40)
  textFont("Inter");
  text(getText(), pagewidth/2, pageheight/2);

}