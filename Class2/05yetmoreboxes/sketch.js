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

  background(255);
  strokeWeight(mouseX/20);
  
  // fill up the whole screen every time:
  for(x = 0;x<width;x=x+50)
  {
    for(y = 0;y<height;y=y+50)
    {
      r = x; // red maps to the x axis
      g = y; // green maps to the y axis
      fill(r, g, 0); // red and green and 0 for blue
      stroke(0, 0, b) // just blue
      rectMode(CORNER);
      rect(x, y, 40, 40); // square
    }
  }
  
  
}