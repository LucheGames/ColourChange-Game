var magicNumber = 30;
var snakeLength = 65;
var circleFadeOut = true;
let gradientCirclesFore = [];
let gradientCirclesBg = [];


function setup() {
    titleText = createElement( 'h3', "Dueling Arrays ");
    infoText = createElement( 'p', "Drag to build snake | Press for circle explosion");
    createCanvas(windowWidth, windowHeight);
    ellipseMode(RADIUS);
    frameRate(30);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    randomBgHue = random(1, 360);
    circleExplosion(gradientCirclesBg, magicNumber);  
}

function draw() {
    background(100);
    background(randomBgHue, 100, 100, 0.25);
    randomBgHue = (randomBgHue+ 0.5)% 360;
    gradientCirclesBg.forEach(function(circle, index, arr) {
        circle.rolloverCheck(circle);
        circle.checkRadiusBounds(circle, index, arr);       
        circle.move();
        circle.show();
        circle.swole(random(0.005, 0.01));
        if(circleFadeOut) {
            circle.swole(random(0.5, 1));
            circle.fadeOutAlpha(random(0.0005, 0.002));
           }
    });
    gradientCirclesFore.forEach(function(circle, index, arr) {
        circle.rolloverCheck(circle);
        circle.checkRadiusBounds(circle, index, arr);       
        circle.move();
        circle.show(); 
        if(circleFadeOut) {
            circle.shrink(random(0.05, 0.75) * random(0.05, 2));
            circle.fadeOutAlpha(random(0.004, 0.0015));
           }
    });
    
    ArrayBoundsCheck (gradientCirclesFore, snakeLength);
    ArrayBoundsCheck (gradientCirclesBg, magicNumber);
}

function ArrayBoundsCheck (arrayToBeChecked, maxLength) {
    var  arr = arrayToBeChecked.length;
    if(arr > maxLength){
        arrayToBeChecked.splice(0, arr - maxLength);
    }
}

function mousePressed() {
    circleExplosion(gradientCirclesBg, magicNumber/3);
    circleFadeOut = false;   
}

function circleExplosion(targetArray, numCircles){
    for (i = 0; i < numCircles; i ++) {
        var x = random (width);
        var y = random (height);
        var radius = random (10, 250);
        var hue = random (300, 360);
        var bright = random (50, 70);
        var jitter = random (0.5, 1.5);
        var alpha = random (0.1, 0.7);
        var c = new GradientCircle(x , y, radius, hue, bright, alpha, jitter);
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
    var bright= random (10, 40);
    var alpha = random (0.3, 0.95);
    var jitter = random (2, 6);
    var c = new GradientCircle(x , y, radius, hue, bright, alpha, jitter);
    targetArray.push(c);
}

function mouseReleased() {
    setTimeout(circleFadeOut = true, 3000)
//    circleFadeOut = true;
}

class GradientCircle {
    constructor(x, y, radius, hue, bright, alpha, jitter) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.h = hue;
        this.b = bright;
        this.a = alpha;
        this.j = jitter;
    }
    
    changeBright(br) {
        this.b = br;
    }
    
    fadeOutAlpha(alph) {
        this.a -= alph;
    }
    
    shrink(rad){
        this.r -= rad;
    }
    
    swole(rad){
        this.r += rad;
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
    
//    clicked(x, y) {
//        let d = dist(x, y, this.x, this.y);
//        if (d < this.r ){
//            this.b = 100;
//        }  
//    }
//    
    move() {
        this.x = this.x + random(-this.j, this.j);
        this.y = this.y + random(-this.j, this.j);
    }
    
    showGrad() {
         for (var i =  this.r; i > 0; i -= 2) {
            fill(this.h, 100, this.b);
            this.h = (this.h + 0.075)% 360;
            ellipse(this.x, this.y, i);
        }
    }
    
    show() {
        fill(this.h, 90, this.b, this.a);
        this.h = (this.h + random(0, 5)) % 360;
        ellipse(this.x, this.y, this.r,);
        }
    
    checkRadiusBounds(currentValue, index, arr){
        if (this.r <= 0) {
            arr.splice(index, 1);
        } 
        if (this.r >= magicNumber * 20) {
            arr.splice(index, 1);
        } 
    }
}
