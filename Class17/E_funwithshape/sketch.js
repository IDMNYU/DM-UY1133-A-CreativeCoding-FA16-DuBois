function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  stroke(0);
  beginShape();
  vertex(50, 50);
  vertex(70, 100);
  vertex(20, 30);
  endShape();
}