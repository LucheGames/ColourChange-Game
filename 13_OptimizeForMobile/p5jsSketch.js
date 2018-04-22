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
//    background(randomBgHue, 100, 100, 0.25);
//    randomBgHue = (randomBgHue+ 0.5)% 360;
    
    gradientCirclesBg.forEach(function(circle, index, arr) {
//        circle.rolloverCheck(circle);
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
//        circle.rolloverCheck(circle); // rollover
        circle.checkRadiusBounds(circle, index, arr); //kill if too big or small  
        circle.move();
        circle.show();
        
        if(circleFadeOut) {
            circle.shrink(random(0.05, 0.75) * random(0.05, 2));
            circle.fadeOutAlpha(random(0.004, 0.0015));
           }
        
        if (pulseSnake) {
            circle.pulse();
        }
        
    });
    
    ArrayBoundsCheck (gradientCirclesFore, snakeLength);
    ArrayBoundsCheck (gradientCirclesBg, magicNumber);
    
//    if (pulseSnake && gradientCirclesFore.length > 1 ) {
//        for(i = gradientCirclesFore.length; i > 0; i-- ){
//        var intervalTime = 500;
//        var intensity = 100;
//        var arr = gradientCirclesFore;
//        var arrLen = arr.length;
//        var counter = arrLen -2;
//        setInterval(changeBrightness (arr, counter, intensity), intervalTime);
//        (counter--) % i;
//        setInterval(changeBrightness (arr, counter, 10), 500);
        }
        
        
//        pulse(gradientCirclesFore, 100, 500);
//        var intervalTime = 500;
//        var intensity = 100;
//        var arr = gradientCirclesFore;
//        var arrLen = arr.length;
//        var counter = arrLen -1;
//        setInterval(changeBrightness (arr, counter, intensity), intervalTime);
//        (counter--) % arrLen -1;
//        setInterval(changeBrightness (arr, counter, 10), 500);
//    }
//}

//function changeBrightness(arr, counter, intensity){
//    var currentBright = arr[counter].b
//    var currentSaturation = arr[counter].b 
//    arr[counter].changeBright(intensity);
//    arr[counter].changeSaturation(intensity);
//    setInterval(revertBrightness (arr, counter, 10, 10), 500);
////    counter = (counter - 1) % arrLen;        
//    }
//
//function revertBrightness(arr, counter, ogBright, ogSaturation){
//    arr[counter].changeBright(ogBright);
//    arr[counter].changeSaturation(ogSaturation);
//    setInterval(changeBrightness (arr, counter, 100), 500);
////    counter = (counter - 1) % arrLen;        
//    }
    
function ArrayBoundsCheck (arrayToBeChecked, maxLength) {
    var  arr = arrayToBeChecked.length;
    if(arr > maxLength){
        arrayToBeChecked.splice(0, arr - maxLength);
    }
}

function mousePressed() {
    circleExplosion(gradientCirclesBg, magicNumber/3);
    circleFadeOut = false;
    pulseSnake = true;
//    if (mouseIsPressed) {
//        pulse(gradientCirclesFore, 100, 500);
//    }
}

//function pulse(arr, intensity, intervalTime) {
//    var arrLen = arr.length;
//    var counter = 0;
//    setInterval(changeBrightness, intervalTime);
//    function changeBrightness(arr, intensity){   
//        arr[counter].changeBright(intensity);
//        arr[counter].changeSaturation(intensity);
//        counter = (counter - 1) % arrLen;
//    }
//}

//function pulseSnake(arr) {
//        var arrLength = arr.length;
//        var it = arrLength -1;
//        arr[it].changeBright(100);
//        arr[it].changeSaturation(100);
//        setTimeout(function(){ arr[it].changeSaturation(50).changeBright(100) }, 2000);
//        it = (it - 1) % arrLength -1;
//}

//function pulseSnake02(arr) {
//        var arrLength = arr.length;
//        pulseCounter = arrLength;
//        arr[pulseCounter02].changeBright(50);
//        arr[pulseCounter02].changeSaturation(50);
//        pulseCounter02 = (pulseCounter02 - 1) % arrLength;
//}

function circleExplosion(targetArray, numCircles){
    for (i = 0; i < numCircles; i ++) {
        var x = random (width);
        var y = random (height);
        var radius = random (10, 250);
        var hue = random (300, 360);
        var saturation = random (10, 50);
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
//    pulseSnake(gradientCirclesFore);
//    interval01 = setInterval(pulseSnake02(gradientCirclesFore), 500);
//    interval02 = setInterval(pulseSnake01(gradientCirclesFore), 500);
//    if(mouseIsPressed){
//         pulse(gradientCirclesFore, 100, 100);
//    }  
}

function buildSnake(targetArray) {
    var x = mouseX + random(-magicNumber/5, magicNumber/5);
    var y = mouseY + random(-magicNumber/5, magicNumber/5);
    var radius = random (3, 15) * random (2, 14);
    var hue= random (300, 360); //to give hues more simalarity
    var bright= random (90, 100);
    var saturation = random (60, 80);
    var alpha = random (0.3, 0.9);
    var jitter = random (2, 4);
    var pulseDirection = false;
    var c = new GradientCircle(x , y, radius, hue, saturation, bright, alpha, jitter, pulseDirection);
    targetArray.push(c);
}

function mouseReleased() {
    setTimeout(circleFadeOut = true, 3000)
//    circleFadeOut = true;
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
        if (this.p && this.b < 100) {
            this.b += 10;
        } else {
            this.p = false;
            this.b -= 2;
        }
        if (this.b < 60){
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
    
    checkRadiusBounds(currentValue, index, arr){ //kill if too big or small
        if (this.r <= 0) {
            arr.splice(index, 1);
        } 
        if (this.r >= magicNumber * 20) {
            arr.splice(index, 1);
        } 
    }
}
