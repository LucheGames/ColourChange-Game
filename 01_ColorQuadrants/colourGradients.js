var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;

var hue = 0;
var fade = 150;

function setup() {
    createElement( 'h2', 'Colour Quadrants');
    createElement( 'p', 'move mouse to change colour');
    createElement( 'p', 'LMB to change colour range');
//    createCanvas(255, 255);

    
    createCanvas(400, 400);
    background(255, 150, 150);

  // Define colors
  b1 = color(255, 255, 100);
  b2 = color(0);
  c1 = color(255, 100, 100);
  c2 = color(0, 100, 255);

//  noLoop();
}

function draw() {
    r = map( mouseY, 0, width, 50, 255, true);
    g = hue;
    b = map( mouseX, 0, height, 50, 255, true);
    
    b1 = color(r, g, b);
    b2 = color(r + fade, g + fade, b + fade);

//  background(r, g, b);
   
    setGradient(0, 0, width / 2, height, b1, b2, Y_AXIS);
    setGradient(width/2, 0, width/2, height, b2, b1, X_AXIS);
//
//    setGradient(50, 90, 240, 80, c1, c2, Y_AXIS);
//    setGradient(50, 190, 240, 80, c2, c1, X_AXIS);

}

function mousePressed() {
  if (hue === 0) {
    hue = 225;
  } else {
    hue = 0;
  }
}


function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

