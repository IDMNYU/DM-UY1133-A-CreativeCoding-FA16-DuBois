
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

function keyPressed()
{
  for(var i in thestuff) {
    thestuff[i].reset();
  }
}

// THIS IS A CLASS:
// assign this to a variable and it'll make it an OBJECT
// e.g. var foo = new Circle();
// you can declare any function as an object
var Circle = function()
{
  // these are properties:
  this.x = random(width);
  this.y = random(height);
  this.d = random(1, 20);
  this.dir = 1.;
  
  // these are methods:
  this.doit = function()
  {
    ellipse(this.x, this.y, this.d, this.d);
    this.x += random(-5, 5);
    this.y += random(-5, 5);
    if(this.dir==1) this.d++; else this.d--;
    if(this.d<1) this.dir=1;
    if(this.d>20) this.dir=-1;
  }
  
  this.reset = function()
  {
    this.x = random(width);
    this.y = random(height);
    this.d = random(1, 20);
    this.dir = 1.;
  }
}