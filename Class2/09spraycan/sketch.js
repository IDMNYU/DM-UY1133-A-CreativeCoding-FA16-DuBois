var x = 0;
var y = 0;

var r = 0;
var g = 0;
var b = 0;

var redincrementer = 200;
var greenincrementer = 200;
var sprayrange = 100;

function setup() {
  createCanvas(800, 600);
  background(255); // one number 0-255 is dark to light
}

function draw() {

  background(255, 10); // luminosity and alpha
  
  var counter = 0;
  
  // fill up the whole screen every time:
  for(r = 0;r<width;r=r+redincrementer)
  {
    for(g = 0;g<height;g=g+greenincrementer)
    {
      fill(r, g, 0, 100); // red and green and 0 for blue
      stroke(0, 0, b) // just blue
      rectMode(CORNER);
      x = (random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)) / 5;
      y = (random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)+random(-sprayrange, sprayrange)) / 5;
      rect(mouseX+x, mouseY+y, 10, 10); // square
      counter = counter + 1;
    }
  }
  

}

