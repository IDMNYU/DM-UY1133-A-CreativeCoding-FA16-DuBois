var thex, they;
var v; // velocity
var t; // angle
var r; // rotation
var inner_r1; // inner rotation for thing1
var inner_r2; // inner rotation for thing2
var osc1, env1; // oscillator and envelope for thing1
var osc2, env2; // oscillator and envelope for thing2

var pwidth = 50; // width of paddle


function setup() {
  createCanvas(800, 600);
  
  initialize(); // get everything going
  
}

function draw() {

  hitdetect(); // are we hitting the paddle?

  background(0);

  // reset, translate, rotate, draw...
  resetMatrix();
  translate(thex, they);
  rotate(r);
  thing1();
  // reset, translate, rotate, draw...
  resetMatrix();
  translate(mouseX, mouseY);
  rotate(r);
  thing2();
  
  r = r + v/100.; // increment global rotation for everyone
  
}

function keyReleased()
{
  initialize();
}

function thing1()
{
  fill(255, 0, 0);
  ellipse(-20, -20, 40, 40);
  fill(192, 192, 0);
  rotate(inner_r1);
  rect(-5, -10, 50, 10);
  
  // polar to cartesian transformation:
  thex = thex+v*cos(t);
  they = they+v*sin(t);
  
  inner_r1+=0.1;

  // boundary detection for thing1:  
  if(thex>width) { t = PI - t; env1.play(); }
  if(thex<0) { t = PI - t; env1.play(); }
  if(they>height) { t = TWO_PI - t; env1.play(); }
  if(they<0) { t = TWO_PI - t; env1.play(); }
  
}

function thing2()
{
  fill(0, 0, 255);
  ellipse(-5, -15, 20, 40);
  fill(192, 0, 192);
  rotate(inner_r2);
  ellipse(-5, -15, 20, 10);

  inner_r2-=0.15;  
}

function initialize()
{
  thex = random(0, width);
  they = random(0, height);
  v = random(5, 10); // random velocity
  t = random(0, TWO_PI); // random angle
  r = 0; // no rotation
  inner_r1 = 0;
  inner_r2 = 0;
  
  // sound stuff:
  env1 = new p5.Env();
  env1.setADSR(0.001, 0.2, 0.2, 0.5);
  env1.setRange(1.0, 0);

  osc1 = new p5.Oscillator('triangle');
  osc1.amp(env1);
  osc1.start();
  osc1.freq(220);

  env2 = new p5.Env();
  env2.setADSR(0.5, 0.2, 0.2, 0.001);
  env2.setRange(1.0, 0);

  osc2 = new p5.Oscillator('triangle');
  osc2.amp(env2);
  osc2.start();
  osc2.freq(440);
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
    env1.play();
    env2.play();
  }
}