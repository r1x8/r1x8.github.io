// env vars
const backgroundcolor = "#333333";
const foregroundcolor = "#ffffff";
const timetoplay = 60000; // one minute

// global things that don't change
let pagewidth;
let pageheight;
let font;

// elements
let startButton;
let numberInput;

// global things that do change.
let displaytext = "d10b";
let score = -1;

function startGame() {
    startButton.remove();
    console.log("Started!");

    // make the input box
    numberInput = createInput();
    numberInput.size(160, 40)
    numberInput.position(pagewidth / 2 - 80, pageheight / 2 + 80); // adjust as needed
    numberInput.style("background-color", foregroundcolor);
    numberInput.style("color", backgroundcolor);
    
    numberInput.style("box-sizing", "border-box");
    numberInput.style("border", "none");
    numberInput.style("padding", "0");
    numberInput.style("margin", "0");
    numberInput.style("font-size", "30px");
    
    setTimeout(() => numberInput.elt.focus(), 0);
    numberInput.input(onInputChange);
    startLevel()
    setTimeout(stopGame, timetoplay);
}

function onInputChange() {
    let val = numberInput.value();
    val = val.replace(/[^01]/g, "");

    if (val !== "") {
        let num = parseInt(val, 2);
        if (num > 31) val = "11111";
    }

    numberInput.value(val);
    if (parseInt(numberInput.value()) == parseInt(displaytext.toString(2))) {
        startLevel()
    }
}

function startLevel() {
    displaytext = Math.round(Math.random()*31);
    score++;
    numberInput.value("");
}

function stopGame() {
    numberInput.remove();
    displaytext = "Time's Up!\nScore: " + score;
}

function setup() {
    pagewidth = windowWidth;
    pageheight = windowHeight;
    let cnv = createCanvas(pagewidth, pageheight);
    cnv.position(0, 0);           // pin canvas to true top-left
    document.body.style.margin = "0"; // remove default browser margin
    createCanvas(pagewidth, pageheight);
    
    startButton = createButton("Start");
    startButton.size(160, 40)
    startButton.position(pagewidth / 2 - 80, pageheight / 2 + 80); // adjust as needed
    startButton.style("background-color", foregroundcolor);
    startButton.style("color", backgroundcolor);
    startButton.style("box-sizing", "border-box");
    startButton.style("border", "none");
    startButton.style("padding", "0");
    startButton.style("margin", "0");
    startButton.style("font-size", "30px");
    startButton.mousePressed(startGame); // wire it up to actually do something
}

function draw() {
    background(backgroundcolor);
    fill(foregroundcolor);
    
    textSize(80);
    textFont("Inter");
    textAlign(CENTER, CENTER)
    text(displaytext, pagewidth/2, pageheight/2);
}
