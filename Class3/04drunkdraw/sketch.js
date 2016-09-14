//
// ASCII - AMERICAN STANDARD CODE FOR INFORMATION INTERCHANGE
//

var x = 0; // GLOBAL VARIABLE
var y = 0; // GLOBAL VARIABLE

function setup() {
  createCanvas(800, 600);
  background(0);
  stroke(255, 0, 0, 255);
  fill(255, 20);
  x = random(width);
  y = random(height);
}

function draw() {
  ellipse(x, y, 10, 10);
  // brownian motion - drunk behavior
  var dx = mouseX-x;
  var dy = mouseY-y;
  x = x + random(0, 0.2)*dx + random(-10, 10);
  y = y + random(0, 0.2)*dy + random(-10, 10);
  if(x>width) x = 0;
  if(y>height) y = 0;
  if(x<0) x=width;
  if(y<0) y=height;
}


function keyPressed()
{
  background(0);
  x = random(width);
  y = random(height);
}

