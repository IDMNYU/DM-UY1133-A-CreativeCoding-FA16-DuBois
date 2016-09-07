// let's move something
// use this: http://www.colorzilla.com/chrome/

var x = 0; // GLOBAL VARIABLE (everybody can get at it)
var y = 0; // GLOBAL VARIABLE (everybody can get at it)

function setup() {
  createCanvas(800, 600); // width and height in pixels
  background(217, 167, 109); // donald trump's hair
}

function draw() {
  fill(255, 217, 142, 30); // donald trump's tie
  stroke(121,97,77); // donald trump's eyes  

  ellipse(x, y, random(50), random(50)); // draw a circle - x,y,w,h
  
  x = x+random(-25, 25);
  y = y+random(-25, 25);
  
  if(x<0) x = width;
  if(y<0) y = height;
  if(x>width) x = 0;
  if(y>height) y = 0;
  
}


