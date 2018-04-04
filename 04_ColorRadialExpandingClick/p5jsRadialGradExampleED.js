// colour models:
// http://www.wowarea.com/english/help/color.htm

//Ellipse options in processing:
//https://processing.org/reference/ellipseMode_.html

//gradients in processing are a bit hard on the CPU:
//http://rectangleworld.com/blog/archives/996

var dim;

function setup() {
    createCanvas(710, 400);
    dim = width/3;
    background(0);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    ellipseMode(CENTER);
//    frameRate(1);
    noLoop();
}

function draw() {
    background(0);
    for (var x = 0; x <= width; x+=dim) {
        drawGradient(x, height/2);
    } 
}

function drawGradient(x, y) {
    var radius = dim;
    var h = random(0, 360);
    var s = random(20, 100);
    var b = random(20, 100);
    for (var r = radius; r > 0; --r) {
        fill(h, s, b);
        ellipse(x + 50, y, r, r);
        h = (h + 1) % 360;
        s = (s + 1) % 100 +50;
        b = (b + 1) % 10;
    }
}