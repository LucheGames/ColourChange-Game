var altHue = 0;
var r, g, b;

function setup() {
    createElement( 'h2', 'Colour Quadrants OG');
    createElement( 'p', 'move mouse to change colour');
    createElement( 'p', 'LMB to change colour range');
   
    createCanvas(400, 400);
    background(255, 150, 150);

}

function draw() {
    r = map( mouseY, 0, width, 50, 255, true);
    g = altHue;
    b = map( mouseX, 0, height, 50, 255, true);
    
    background(r, g, b);
  
}

function mousePressed() {
  if (altHue === 0) {
    altHue = 225;
  } else {
    altHue = 0;
  }
}

