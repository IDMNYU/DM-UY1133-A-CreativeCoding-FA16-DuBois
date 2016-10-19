
var thestuff = new Array(50); // give me 50 of these
var drumpf, kasich;

function preload() {
  drumpf = loadImage("trump.png");
  kasich = loadImage("kasich.png");
}

function setup() {
  createCanvas(800, 600);
  background(255);
  fill(0);
  for(var i =0;i<thestuff.length;i++)
  {
    thestuff[i] = new PicDraw(drumpf);
  }
  
}

function draw() {
  background(255);
  image(kasich, mouseX-25, mouseY-25, 50, 50);
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
var PicDraw = function(_p)
{
  // these are properties:
  this.pic = _p;
  this.x = random(width);
  this.y = random(height);
  this.d = 20;
  this.dir = -1.;
  this.v = random(0.01, 0.02);
  this.killme = 0;

  // these are methods:
  this.doit = function(_mx, _my)
  {

    image(this.pic, this.x, this.y, this.d, this.d);
    
    var distance = dist(_mx, _my, this.x, this.y);
    var angle = atan2(_my-this.y, _mx-this.x);
    
    this.x += this.dir*this.v*(distance*cos(angle));
    this.y += this.dir*this.v*(distance*sin(angle));
    
    this.x += random(-5, 5);
    this.y += random(-5, 5);
    if(this.x>width) this.reset();
    if(this.x<0) this.reset();
    if(this.y>height) this.reset();
    if(this.y<0) this.reset();
    

    //this.v*=0.9; // damping function
  }
  
  this.reset = function()
  {
    this.x = random(width);
    this.y = random(height);
    this.v = random(0.01, 0.02);
  }
}