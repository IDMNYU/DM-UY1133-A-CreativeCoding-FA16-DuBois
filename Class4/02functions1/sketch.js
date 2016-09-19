//
// particle system
//
var NUMSTUFF = 100;
var xstuff = new Array(NUMSTUFF);
var ystuff = new Array(NUMSTUFF);
var osc = new Array(NUMSTUFF);

function setup() {
  createCanvas(800, 600);
  background(0);
  stroke(255, 0, 0, 255);
  fill(255, 100);
  
  initialize(); // get everybody rolling
}

function draw() {
  background(0);
  // brownian motion - drunk behavior
  for(var i = 0;i<NUMSTUFF;i++)
  {
    update(i); // update all the particles, one by one
  }

}

function keyPressed()
{
  background(0);
  
  initialize();
}

// this function initializes all the groovy particles
function initialize()
{
  for(var i = 0;i<NUMSTUFF;i++)
  {
    xstuff[i] = random(width);
    ystuff[i] = random(height);
    osc[i] = new p5.Oscillator();
    osc[i].setType('sine');
    osc[i].freq(240);
    osc[i].amp(0);
    osc[i].start();
  }

}

// this function updates and draws and sonifies a SINGLE particle
function update(particle)
{
    ellipse(xstuff[particle], ystuff[particle], 10, 10);
    var dx = mouseX-xstuff[particle];
    var dy = mouseY-ystuff[particle];
    xstuff[particle] = xstuff[particle] + random(0, 0.05)*dx + random(-10, 10);
    ystuff[particle] = ystuff[particle] + random(0, 0.05)*dy + random(-10, 10);
    osc[particle].amp((ystuff[particle]/height)/NUMSTUFF);
    osc[particle].freq(xstuff[particle]*2);
    if(xstuff[particle]>width) xstuff[particle] = 0;
    if(ystuff[particle]>height) ystuff[particle] = 0;
    if(xstuff[particle]<0) xstuff[particle]=width;
    if(ystuff[particle]<0) ystuff[particle]=height;
  
}
