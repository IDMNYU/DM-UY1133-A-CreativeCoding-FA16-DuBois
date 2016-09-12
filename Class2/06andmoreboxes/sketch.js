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
  
  var counter = 0;
  
  // fill up the whole screen every time:
  for(r = 0;r<width;r=r+50)
  {
    for(g = 0;g<height;g=g+50)
    {
      fill(r, g, 0); // red and green and 0 for blue
      stroke(0, 0, b) // just blue
      rectMode(CORNER);
      rect(random(width), random(height), 40, 40); // square
      counter = counter + 1;
    }
  }
  

}