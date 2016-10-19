
var thestuff = new Array(1000); // give me 1000 of these

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
  // draw everything!!!!!!!:
  for(var i in thestuff) thestuff[i].doit(mouseX, mouseY);
}

function keyPressed() {
  for(var i in thestuff) thestuff[i].reset();
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
  this.v = random(0.01, 0.9);
  this.stroke = 90;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  
  // these are methods:
  this.doit = function(_mx, _my)
  {
    stroke(this.stroke, 50);
    fill(this.r, this.g, this.b, 20);

    ellipse(this.x, this.y, this.d, this.d);
    
    var distance = dist(_mx, _my, this.x, this.y);
    this.d = 10-distance;
    var angle = atan2(_my-this.y, _mx-this.x);
    
    this.x += this.dir*this.v*(distance*cos(angle));
    this.y += this.dir*this.v*(distance*sin(angle));
    
    this.x += random(-5, 5);
    this.y += random(-5, 5);
    if(this.dir==1) this.d++; else this.d--;
    if(this.d<1) this.dir=1;
    if(this.d>20) this.dir=-1;
    
    //this.v*=0.9; // damping function
  }
  
  this.reset = function()
  {
    this.x = random(width);
    this.y = random(height);
    this.d = random(1, 20);
    this.dir = 1.;
    this.v = random(0.01, 0.9);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
}