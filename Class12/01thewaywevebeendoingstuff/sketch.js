
var thex = new Array(1000);
var they = new Array(1000);

function setup() {
  createCanvas(800, 600);
  for(var i =0;i<1000;i++)
  {
    thex[i] = random(width);
    they[i] = random(height);
  }
  
  
}

function draw() {
  background(255);
  fill(0);
  for(var i = 0;i<1000;i++) {
    ellipse(thex[i], they[i], 5, 5);
    thex[i] += random(-5, 5);
    they[i] += random(-5, 5);
  }
}