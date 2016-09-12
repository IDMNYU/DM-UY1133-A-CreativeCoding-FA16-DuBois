function setup() {
  createCanvas(800, 600);
}

function draw() {
  // painter's algorithm
  background(255); // one number 0-255 is dark to light
  fill(255, 0, 255);
  rectMode(RADIUS);
  rect(mouseX, mouseY, 50, 50); // square
  rectMode(CORNER);
  fill(0);
  rect(mouseX, mouseY, 50, 50); // square
  rectMode(CENTER);
  fill(255, 255, 0);
  rect(mouseX, mouseY, 50, 50); // square
}