
var thestuff = new Array(1000);

function setup() {
  createCanvas(800, 600);
  background(255);
  fill(0);
  for(var i =0;i<thestuff.length;i++)
  {
    thestuff[i] = new Circle();
  }
  
}

function draw() {
  background(255, 20);
  fill(0, 20);
  for(var i in thestuff) {
    thestuff[i].doit();
  }
}

// THIS IS A CLASS:
var Circle = function()
{
  this.x = random(width);
  this.y = random(height);
  
  this.doit = function()
  {
    ellipse(this.x, this.y, 5, 5);
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }
}