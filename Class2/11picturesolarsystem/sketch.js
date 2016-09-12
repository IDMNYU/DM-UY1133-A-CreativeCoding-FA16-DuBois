// fun with polar coordinates:

var pic;

var distance = 60;
var angle = 0;
var angleincrement = 0.1; // THIS NUMBER IS IN RADIANS!!!

var xplot, yplot;

// preload() runs before setup... synchronously
function preload()
{
  pic = loadImage("trump.png");
}

function setup() {
  createCanvas(800, 600);
  background(255); // one number 0-255 is dark to light
  stroke(0, 0, 0)
  noFill();
  
  xplot = width/2 + 100;
  yplot = height/2 + 100;
}

function draw() {

  background(255, 10); // luminosity and alpha
  
  angleincrement = mouseX/(width*4);
  
  var x = distance * cos(angle);
  var y = distance * sin(angle);
  
  image(pic, width/2-30, height/2-30, 60, 60); // sun
  image(pic, width/2+x, height/2+y, 10, 10); // earth
  
  angle = angle + angleincrement;
  
  image(pic, xplot, height/2 + y, 10, 10);
  image(pic, width/2 + x, yplot, 10, 10);
  
  xplot = xplot+1;
  yplot = yplot+1;
  if(xplot>width) xplot = width/2 + 100;
  if(yplot>height) yplot = height/2 + 100;
  
  if(angle>TWO_PI) angle=0;

}

