var thex, they;
var v; // velocity
var t; // angle
var r; // rotation

var chris, donald;

var pwidth = 50; // paddle

function preload()
{
  chris = loadImage("chris.png");
  donald = loadImage("trump.png");
}

function setup() {
  createCanvas(800, 600);
  
  initialize();
  
}

function draw() {

  hitdetect(); // are we hitting the mouse?

  background(0);
  fill(255);
  resetMatrix();
  translate(thex, they)
  rotate(r);
  image(chris, -15, -15, 30, 30);
  fill(255, 0, 0);
  resetMatrix();
  translate(mouseX, mouseY);
  rotate(r);
  image(donald, -pwidth/2, -pwidth/2, pwidth, pwidth);

  
  
  // polar to cartesian transformation:
  thex = thex+v*cos(t);
  they = they+v*sin(t);
  
  r = r + v/100.;
  
  //v = v*0.99;
  
  if(thex>width) t = PI - t;
  if(thex<0) t = PI - t;
  if(they>height) t = TWO_PI - t;
  if(they<0) t = TWO_PI - t;
  
}

function keyReleased()
{
  initialize();
}

function initialize()
{
  thex = random(0, width);
  they = random(0, height);
  v = random(5, 10); // random velocity
  t = random(0, TWO_PI); // random angle
  r = 0; // no rotation
}

function hitdetect()
{
  var r = pwidth/2;
  if(thex>mouseX-r && thex<mouseX+r && they>mouseY-r && they<mouseY+r)
  {
    if(thex<mouseX) t = PI - t;
    if(thex>mouseX) t = PI - t;
    if(they<mouseY) t = TWO_PI - t;
    if(they>mouseY) t = TWO_PI - t;
    v = v*1.05;
    console.log("PONG:  " + mouseX + " " + mouseY);
  }
}