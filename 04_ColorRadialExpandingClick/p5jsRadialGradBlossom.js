//Explains how to measure an interval between clicks:
//https://stackoverflow.com/questions/1360818/how-to-measure-the-milliseconds-between-mousedown-and-mouseup

var pressTime, releaseTime, frameCountText, clickLengthText, mouseLocationX, mouseLocationY;
var magicNumber = 10;

function setup() {
    createCanvas(710, 400);
    background(225);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    ellipseMode(CENTER);
    frameRate(24);
    titleText = createElement( 'h3', "Radial Blossoms");
    frameCountText = createElement( 'p', 0);
    clickLengthText = createElement( 'p', 0);
    //    noLoop();
}

function draw() {
    frameCountText.html("frameRate: " + frameCount);
       
    }

function mousePressed() {
    mouseLocationX = mouseX;
    mouseLocationY = mouseY;   
    pressTime = frameCount;
    
//    drawGradient(mouseX, mouseY, 200);
    
     for(var i = 1; i <= 200; ++i){
         ellipse(mouseLocationX , mouseLocationY, i)
     }   
} 

function mouseReleased() {
    releaseTime = frameCount;
    var clickLength = releaseTime - pressTime;
    clickLengthText.html("clickLength: " + clickLength);
    drawGradient(mouseLocationX, mouseLocationY, clickLength);
} 

function drawGradient(x, y, radius) {
    var h = random(0, 360);
//    var s = random(20, 100);
//    var b = random(20, 100);
    for (var r = radius * magicNumber; r > 0; --r) {
        fill(h, 90, 90);
        ellipse(x, y, r, r);
        h = (h + 1) % 360;
//        s = (s + 1) % 100 +50;
//        b = (b + 1) % 10;
    }
}