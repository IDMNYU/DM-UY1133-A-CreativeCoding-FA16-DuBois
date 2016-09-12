var x = 0;
var y = 0;

var r = 0;
var g = 0;
var b = 0;

var redincrementer = 200;
var greenincrementer = 200;

function setup() {
  createCanvas(800, 600);
  background(255); // one number 0-255 is dark to light
}

function draw() {

  //background(255);
  
  var counter = 0;
  
  // fill up the whole screen every time:
  for(r = 0;r<width;r=r+redincrementer)
  {
    for(g = 0;g<height;g=g+greenincrementer)
    {
      fill(r, g, 0); // red and green and 0 for blue
      stroke(0, 0, b) // just blue
      rectMode(CORNER);
      x = (random(width)+random(width)+random(width)+random(width)+random(width)) / 5;
      y = (random(height)+random(height)+random(height)+random(height)+random(height)) / 5;
      rect(x, y, 10, 10); // square
      counter = counter + 1;
    }
  }
  

}

