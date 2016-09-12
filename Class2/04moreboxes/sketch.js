var x = 0;
var y = 0;

var r = 0;
var g = 0;
var b = 0;

function setup() {
  createCanvas(800, 600);
  background(255); // one number 0-255 is dark to light
  strokeWeight(5);
}

function draw() {

  //background(255);
  fill(r, g, 0); // red and green and 0 for blue
  stroke(0, 0, b) // just blue
  rectMode(CORNER);
  rect(x, y, 40, 40); // square

  x = x+50; // go right
  r = r+50; // make redder
  
  if(x>width) { // test for when the x runs off the right
    // TRUE (carriage return):
    x = 0; // slam to the left
    y = y + 50; // up the y
    r = 0; // reset the damn red
    g = g+50; // up the green
  }
  if(y>height) { // another test for when we hit rock bottom
    // TRUE
    x = 0; // go to the left
    y = 0; // go to the top
    r = 0; // reset the red
    g = 0; // reset the green
    b = b+50; // up the blue
    if(b>255) b = 0; // if the blue hits top, zero the blue
  }
}