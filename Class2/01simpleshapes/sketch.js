function setup() {
  createCanvas(800, 600);
  background(255); // one number 0-255 is dark to light
  fill(0); // black interior
  //noFill();
  stroke(255, 0, 0); // three numbers (RGB) - red edges
  strokeWeight(30); // thickness of the line
  //noStroke();
}

function draw() {
  ellipse(50, 50, 100, 100); // circle
  rect(150, 150, 100, 100); // square
  line(400, 0, 400, 300); // line
  point(450, 450); // dot
}