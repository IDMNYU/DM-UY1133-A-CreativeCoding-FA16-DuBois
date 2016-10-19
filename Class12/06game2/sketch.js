
var thestuff = new Array(50); // give me 50 of these
var drumpf, kasich;
var countdown;
var currentTime;
var isRunning = true; // yeah... the CS way
var rigged;
var winsound;
var playwinsound= false;

function preload() {
  drumpf = loadImage("trump.png");
  kasich = loadImage("kasich.png");
  rigged = loadSound("rigged.mp3");
  winsound = loadSound("who.mp3");
}

function setup() {
  createCanvas(800, 600);
  background(255);
  fill(0);
  for(var i =0;i<thestuff.length;i++)
  {
    thestuff[i] = new TrumpDraw(drumpf);
  }
  
  countdown = 30;
  currentTime = millis();
  rigged.setVolume(1.0);
  
}

function draw() {
  background(0);

  if(isRunning) {
    countdown = countdown-((millis()-currentTime)/1000.);
    currentTime=millis();
    if(countdown<0) gameOver();
    image(kasich, mouseX-25, mouseY-25, 50, 50);

    // draw everything!!!!!!!:
    for(var i in thestuff) {
      thestuff[i].doit(mouseX, mouseY);
      if(thestuff[i].killme==1) {
        rigged.play();
        thestuff.splice(i, 1);
      }
    }

  }
  else
  {
    fill(255, 0, 255);
    text("PAUSED!!!!!!!", 400, 600);
  }
  
  resetMatrix();
  textSize(24);
  if(thestuff.length==0) {
    fill(255, 0, 0);
    text("YOU WON!!!!", width/2, height/2);
    countdown=30;
    if(playwinsound==false) {
      winsound.play();
      playwinsound=true;
    }
  } else
  {
    fill(255);
    text("TRUMPS REMAINING: " + thestuff.length, 20, 20);
    text("TIME REMAINING: " + floor(countdown), 20, 45);
  }
  
}


function keyPressed()
{
  if(key=='P') isRunning = !isRunning;
  if(key=='N') gameOver();
}

function gameOver() {
  playwinsound=false;
  countdown = 30;
  thestuff = new Array(50);
  for(var i =0;i<thestuff.length;i++)
  {
    thestuff[i] = new TrumpDraw(drumpf);
  }
}

// THIS IS A CLASS:
// assign this to a variable and it'll make it an OBJECT
// e.g. var foo = new Circle();
// you can declare any function as an object
var TrumpDraw = function(_p)
{
  // these are properties:
  this.pic = _p;
  this.x = random(width);
  this.y = random(height);
  this.d = 50;
  this.dir = -1.;
  this.v = random(0.01, 0.02);
  this.killme = 0;

  // these are methods:
  this.doit = function(_mx, _my)
  {
    
    var distance = dist(_mx, _my, this.x, this.y);
    var angle = atan2(_my-this.y, _mx-this.x);

    resetMatrix();
    translate(this.x, this.y);
    rotate(angle);
    image(this.pic, 0-this.d/2, 0-this.d/2, this.d, this.d);
    
    //console.log(distance);
    if(distance<25) this.killme = 1;
    
    this.x += this.dir*this.v*(distance*cos(angle));
    this.y += this.dir*this.v*(distance*sin(angle));
    
    //this.x += random(-5, 5);
    //this.y += random(-5, 5);
    if(this.x>width) this.reset();
    if(this.x<0) this.reset();
    if(this.y>height) this.reset();
    if(this.y<0) this.reset();
    

    //this.v*=0.9; // damping function
  }
  
};

TrumpDraw.prototype.reset = function()
{
    this.x = random(width);
    this.y = random(height);
    this.v = random(0.01, 0.02);
};