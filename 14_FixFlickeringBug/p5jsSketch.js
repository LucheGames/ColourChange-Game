// Struggling to get p5js to be fulscreen without extra space and scrollbars:
// https://github.com/processing/p5.js-editor/issues/146

// 2Do:
// Make fullscreen flush with browser window, NO SIDEBARS!!!
// Colour band array: an array of pleasing ranges for the initial hue of new circles, each click starts with a different array.
// Speed effects: Elongate / smear / shrink circles depending on velocity of user drag, capturing more of the feeling of their gesture.

var magicNumber = 12;
var snakeLength = 65;
var circleFadeOut = true;
var pulseSnake = false;
let gradientCirclesFore = [];
let gradientCirclesBg = [];

function setup() {
//    titleText = createElement( 'h3', "Backwards Ripple");
//    infoText = createElement( 'p', "Drag to build snake | Press for circle explosion");
    createCanvas(windowWidth, windowHeight);
    ellipseMode(RADIUS);
    frameRate(30);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    randomBgHue = random(1, 360);
    fullscreen();
    circleExplosion(gradientCirclesBg, magicNumber);
}

function draw() {
    background(100);
    background(randomBgHue, 100, 100, 0.25); // color BG
    randomBgHue = (randomBgHue+ 0.5)% 360;
    
    gradientCirclesBg.forEach(function(circle, index, arr) {
//        circle.rolloverCheck(circle); // rollover
//        circle.checkRadiusBounds(circle, index, arr);       
        circle.move();
        circle.show();
//      circle.swole(random(0.005, 0.01));
        if(circleFadeOut) {
            circle.swole(random(0.5, 1));
            circle.fadeOutAlpha(random(0.0005, 0.002));
           }
    });
    
    gradientCirclesFore.forEach(function(circle, index, arr) {
//        circle.rolloverCheck(circle); // rollover
//        circle.checkRadiusBounds(circle, index, arr); 
        circle.move();
        circle.show();
        
        if(circleFadeOut) {
            circle.shrink(random(0.05, 0.75) * random(0.05, 2));
            circle.fadeOutAlpha(random(0.004, 0.0015));
           }        
        if (pulseSnake) {
            circle.pulse();
        }
//        extra check to prevent negative radius expansion, fixes previous flickering check
        if (circle.r < 0) { 
            circle.a = 0;
        } 
    });
    
//            if (this.r <= 0) {
//            arr.splice(index, 1);
//        } 
//        if (this.r >= magicNumber * 20) {
//            arr.splice(index, 1);
//        } 
    
    ArrayBoundsCheck (gradientCirclesFore, snakeLength);
    ArrayBoundsCheck (gradientCirclesBg, magicNumber);
    
} // end of draw

function mousePressed() {
    circleExplosion(gradientCirclesBg, magicNumber/3);
    circleFadeOut = false;
    pulseSnake = true;
}

function circleExplosion(targetArray, numCircles){
    for (i = 0; i < numCircles; i ++) {
        var x = random (width);
        var y = random (height);
        var radius = random (10, 250);
        var hue = random (300, 360);
        var saturation = random (40, 50);
        var bright = random (80, 100);
        var jitter = random (0.5, 1.5);
        var alpha = random (0.1, 0.7);
        var pulseDirection = false;
        var c = new GradientCircle(x , y, radius, hue, saturation, bright, alpha, jitter, pulseDirection);
        targetArray.push(c);
    }
}

function mouseDragged () {
    buildSnake(gradientCirclesFore);
}

function buildSnake(targetArray) {
    var x = mouseX + random(-magicNumber/5, magicNumber/5);
    var y = mouseY + random(-magicNumber/5, magicNumber/5);
    var radius = random (3, 15) * random (2, 14);
    var hue= random (300, 360); //to give hues more simalarity
    var bright= random (90, 100);
    var saturation = random (50, 80);
    var alpha = random (0.5, 0.9);
    var jitter = random (2, 4);
    var pulseDirection = false;
    var c = new GradientCircle(x , y, radius, hue, saturation, bright, alpha, jitter, pulseDirection);
    targetArray.push(c);
}

function mouseReleased() {
    circleFadeOut = true;
    pulseSnake = false;
}

class GradientCircle {
    constructor(x, y, radius, hue, saturation, bright, alpha, jitter, pulseDirection ) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.h = hue;
        this.s = saturation;
        this.b = bright;
        this.a = alpha;
        this.j = jitter;
        this.p = pulseDirection;
    }
    
    pulse() {
        if (this.p && this.b < 110) {
            this.b += 5;
        } else {
            this.p = false;
            this.b -= 1;
        }
        if (this.b < 80){
            this.p = true;
        }
    }
    
    changeBright(br) {
        this.b = br;
    }
    
    changeSaturation(sat) {
        this.s = sat;
    }
    
    fadeOutAlpha(alph) {
        this.a -= alph;
    }
    
    shrink(rad){
        this.r -= 1;
    }
    
    swole(rad){
        this.r += 1;
    }
    
     contains(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < this.r ){
            return true;
        }  else {
            return false;
        }
    } 
    
    rolloverCheck(circle) {    
        if (circle.contains(mouseX, mouseY)) {
                circle.changeBright(100); 
            } else {
                circle.changeBright(70);
            }
        }
      
    move() {
        this.x = this.x + random(-this.j, this.j);
        this.y = this.y + random(-this.j, this.j);
    }
    
    showGrad() {
         for (var i =  this.r; i > 0; i -= 2) {
            fill(this.h, 100, this.b);
            this.h = (this.h * 0.075)% 360;
            ellipse(this.x, this.y, i);
        }
    }
    
    show() {
        fill(this.h, this.s, this.b, this.a);
        this.h = (this.h + random(0, 5)) % 360; //colour change
        ellipse(this.x, this.y, this.r,);
        }
    
//    this function is janky, makes everything flicker when changing radius
//    checkRadiusBounds(currentValue, index, arr){ 
//        if (this.r <= 0) {
//            arr.splice(index, 1);
//        } 
//        if (this.r >= magicNumber * 20) {
//            arr.splice(index, 1);
//        } 
//    }
    
} //end of constructor

function ArrayBoundsCheck (arrayToBeChecked, maxLength) {
    var  arr = arrayToBeChecked.length;
    if(arr > maxLength){
        arrayToBeChecked.splice(0, arr - maxLength);
    }
}