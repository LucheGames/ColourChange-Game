//Control array length:
//https://stackoverflow.com/questions/14236515/can-i-limit-the-length-of-an-array-in-javascript

var magicNumber = 50;
let gradientCircles = [];

function setup() {
    //    background(225);
    titleText = createElement( 'h3', "Disappearing Ripple | On Drag");
    createCanvas(710, 400);
    ellipseMode(RADIUS);
    frameRate(24);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    
//    for (i = 0; i < magicNumber; i ++) {
//        let x = random (width);
//        let y = random (height);
//        let radius = random (20, 400);
//        let hue= random (1, 360);
//        let bright= random (10, 40);
//        let c = new GradientCircle(x , y, radius, hue, bright);
//        gradientCircles.push(c);
//    }
    
}

function draw() {
    background(225);
    gradientCircles.forEach(function(circle) {
        if (circle.contains(mouseX, mouseY)) {
            circle.changeBright(100); 
        } else {
            circle.changeBright(10);
        }
        circle.move();
        circle.show();
    });
    var  arr = gradientCircles.length;
    if(arr > magicNumber){
//       gradientCircles.splice(0,1);
//        gradientCircles.length = Math.min(gradientCircles.length, magicNumber)
        gradientCircles.splice(0, arr - magicNumber);
    }
}

function mouseDragged() {
//        let x = random (width);
//        let y = random (height);
        let x = mouseX + random(-magicNumber/5, magicNumber/5);
        let y = mouseY + random(-magicNumber/5, magicNumber/5);
        let radius = random (20, 100);
        let hue= random (1, 360);
        let bright= random (10, 40);
        let c = new GradientCircle(x , y, radius, hue, bright);
        gradientCircles.push(c);
}

class GradientCircle {
    constructor(x, y, radius, hue, bright) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.h = hue;
        this.b = bright;
    }
    
    changeBright(br) {
        this.b = br;
    }
    
     contains(x, y) {
        let d = dist(x, y, this.x, this.y);
        if (d < this.r ){
            return true;
        }  else {
            return false;
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
        this.x = this.x + random(-magicNumber/5, magicNumber/5);
        this.y = this.y + random(-magicNumber/5, magicNumber/5);
    }
    
    showGrad() {
         for (var i =  this.r; i > 0; i -= 2) {
            fill(this.h, 90, this.b);
            this.h = (this.h + 0.075)% 360;
            ellipse(this.x, this.y, i);
        }
    }
    
    show() {
        fill(this.h, 90, this.b);
        this.h = (this.h + random(0, 5)) % 360;
        ellipse(this.x, this.y, this.r);
        }
}
