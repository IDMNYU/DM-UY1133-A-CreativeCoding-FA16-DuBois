var x = 0;
var y = 0;

var r = 0;
var g = 0;
var b = 0;

function setup() {
  createCanvas(800, 600);
  background(255); // one number 0-255 is dark to light
}

function draw() {
  // painter's algorithm
  fill(r, g, b);
  rectMode(CORNER);
  rect(x, y, 40, 40); // square
  x = x+50;
  if(x>width) { // test
    // TRUE:
    x = 0;
    y = y + 50;
  }
  if(y>height) { // another test
    // TRUE
    x = 0;
    y = 0;
  }
}