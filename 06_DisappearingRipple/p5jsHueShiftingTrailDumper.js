//learned about difference between let and var in js:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

//took much knowledge on arrays and classes from here:
//https://www.youtube.com/watch?v=fBqaA7zRO58

var grow = false;
var magicNumber = 10;
var pressTime, releaseTime, clickLocationX, clickLocationY;
let gradientCircles = [];

function setup() {
    titleText = createElement( 'h3', "Hue Shifting Trail Dumper");
    createCanvas(710, 400);
    background(225);
    frameRate(24);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    
    for (i = 0; i < magicNumber; i ++) {
        let x = random (width);
        let y = random (height);
        let radius = random (20, 500);
        let hue= random (1, 360);
        gradientCircles[i] = new GradientCircle(x , y, radius, hue);
    }
}

function draw() {
    for (i = 0; i < gradientCircles.length; i ++) {
            gradientCircles[i].move();
//            gradientCircles[i].show();
            gradientCircles[i].showGrad();
    }
}

class GradientCircle {
    constructor(x, y, radius, hue) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.h = hue;
    }
    move() {
        this.x = this.x + random(-magicNumber/5, magicNumber/5);
        this.y = this.y + random(-magicNumber/5, magicNumber/5);
    }
    showGrad() {
         for (var i =  this.r; i > 0; i -= 2) {
            fill(this.h, 90, 90);
            this.h = (this.h + 0.075)% 360;
            ellipse(this.x, this.y, i);
        }
    }
    show() {
        fill(this.h, 90, 90);
//        this.h = (this.h + 1) % 360;
        this.h = (this.h + random(0, 5)) % 360;
        ellipse(this.x, this.y, this.r);
        }
}

//function expandingCircle() {
//  if (grow) {
//      magicNumber += 4;
//      ellipse(clickLocationX, clickLocationY, magicNumber / 2);    
//  }
//}
//



//if (mouseIsPressed) {
////    new expandingCircle() in circles;
//    if (mouseButton === LEFT) {
//      ellipse(50, 50, 50, 50);
//    }
//    if (mouseButton === RIGHT) {
//      rect(25, 25, 50, 50);
//    }
//    if (mouseButton === CENTER) {
//      triangle(23, 75, 50, 20, 78, 75);
//    }
//}
