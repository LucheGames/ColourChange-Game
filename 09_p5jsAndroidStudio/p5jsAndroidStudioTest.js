//working through this doc on wrapping p5js into a closure:
//https://github.com/processing/p5.js/wiki/Global-and-instance-mode

var s = function( sketch ) {

//  var x = 100; 
//  var y = 100;
//  sketch.setup = function() {
//    sketch.createCanvas(200, 200);
//  };
//
//  sketch.draw = function() {
//    sketch.background(0);
//    sketch.fill(255);
//    sketch.rect(x,y,50,50);
//  };
    
    var magicNumber = 30;
    var gradientCircles = [];

    sketch.setup = function () {
//        sketch.titleText = sketch.createElement( 'h3', "Disappearing Ripple | On Drag");
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.ellipseMode(sketch.RADIUS);
        sketch.frameRate(24);
        sketch.colorMode(sketch.HSB, 360, 100, 100);
        sketch.noStroke();
        sketch.circleExplosion();  
    }

    sketch.draw = function () {
        sketch.background(25);

        var  arr = gradientCircles.length;
        if(arr > magicNumber){
            gradientCircles.splice(0, arr - magicNumber);
        }
        
        for (i = 0; i < gradientCircles.length; i ++) {
            var gc = gradientCircles[i];
            if (gc.contains(sketch.mouseX, sketch.mouseY)) {
                gc.changeBright(100); 
            } else {
                gc.changeBright(70);
            }
            gc.move();
            gc.show();
        }
    }

    sketch.mousePressed = function() {
        sketch.circleExplosion();
    }
    
    sketch.circleExplosion = function(){
        for (i = 0; i < magicNumber; i ++) {
            var x = sketch.random (sketch.width);
            var y = sketch.random (sketch.height);
            var radius = sketch.random (20, 200);
            var hue= sketch.random (300, 360);
            var bright= sketch.random (50, 70);
            var c = new GradientCircle(x , y, radius, hue, bright);
            gradientCircles.push(c);
        }
    }

    sketch.mouseDragged = function() {
        sketch.buildSnake();
    }
    
    sketch.buildSnake = function() {
        var x = sketch.mouseX + sketch.random(-magicNumber/5, magicNumber/5);
        var y = sketch.mouseY + sketch.random(-magicNumber/5, magicNumber/5);
        var radius = sketch.random (20, 100);
        var hue= sketch.random (300, 360); //to give hues more simalarity
        var bright= sketch.random (10, 40);
        var c = new GradientCircle(x , y, radius, hue, bright);
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
            var d = sketch.dist(x, y, this.x, this.y);
            if (d < this.r ){
                return true;
            }  else {
                return false;
            }
        } 

    //    clicked(x, y) {
    //        var d = dist(x, y, this.x, this.y);
    //        if (d < this.r ){
    //            this.b = 100;
    //        }  
    //    }
    //    
        move() {
            this.x = this.x + sketch.random(-magicNumber/5, magicNumber/5);
            this.y = this.y + sketch.random(-magicNumber/5, magicNumber/5);
        }

//        showGrad() {
//             for (var i =  this.r; i > 0; i -= 2) {
//                fill(this.h, 90, this.b);
//                this.h = (this.h + 0.075)% 360;
//                ellipse(this.x, this.y, i);
//            }
//        }

        show() {
            sketch.fill(this.h, 90, this.b);
            this.h = (this.h + sketch.random(0, 5)) % 360;
            sketch.ellipse(this.x, this.y, this.r);
            }
        }
       
}; //end closure

var myp5 = new p5(s,'p5sketch');