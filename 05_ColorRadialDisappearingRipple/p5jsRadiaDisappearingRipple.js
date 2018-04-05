// Learned about the compound operator. eg: x += 4

// Took some code hints from here on expanding circles:
// https://forum.processing.org/two/discussion/5615/coding-noob-needs-help-how-do-i-draw-an-expanding-circle-that-triggers-with-a-mouse-click

var grow = false;
var magicNumber = 50;
var magicNumberOG;
var pressTime, releaseTime, frameCountText, clickLengthText, clickLocationX, clickLocationY;

function setup() {
    magicNumberOG = magicNumber;
    titleText = createElement( 'h3', "Expanding Click | Radial Blossoms");
    createCanvas(710, 400);
    background(225);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    ellipseMode(CENTER);
    frameRate(24);
    frameCountText = createElement( 'p', 0);
    clickLengthText = createElement( 'p', 0);
    //    noLoop();
}

function draw() {
    expandingClick() 
    frameCountText.html("frameCount: " + frameCount);   
    }

function mousePressed() {
    grow = true;
    magicNumber = magicNumberOG;
    clickLocationX = mouseX;
    clickLocationY = mouseY;
    pressTime = frameCount;
    
} 

function mouseReleased() {
    grow = false;
    releaseTime = frameCount;
    var clickLength = releaseTime - pressTime;
    clickLengthText.html("clickLength: " + clickLength);
    drawGradient(clickLocationX, clickLocationY, clickLength);
}

function expandingClick() {
  if (grow) {
      magicNumber += 4;
    ellipse(clickLocationX, clickLocationY, magicNumber / 2);
//    ellipse(clickLocationX, clickLocationY, magicNumber / 4);
//    ellipse(clickLocationX, clickLocationY, magicNumber / 8);      
  }
}

function drawGradient(x, y, radius) {
    var h = random(0, 360);
//    var s = random(20, 100);
//    var b = random(20, 100);
    for (var r = constrain(radius, 1, 5) * (magicNumber / 2); r > 0; --r) {
        fill(h, 90, 90);
        ellipse(x, y, r, r);
        h = (h + random(0.001, 2)) % 360;
//        s = (s + 1) % 100 +50;
//        b = (b + 1) % 10;
    }
}