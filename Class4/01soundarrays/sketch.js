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

function draw() {
  background(0);
  // brownian motion - drunk behavior
  for(var i = 0;i<NUMSTUFF;i++)
  {
    ellipse(xstuff[i], ystuff[i], 10, 10);
    var dx = mouseX-xstuff[i];
    var dy = mouseY-ystuff[i];
    xstuff[i] = xstuff[i] + random(0, 0.05)*dx + random(-10, 10);
    ystuff[i] = ystuff[i] + random(0, 0.05)*dy + random(-10, 10);
    osc[i].amp((ystuff[i]/height)/NUMSTUFF);
    osc[i].freq(xstuff[i]*2);
    if(xstuff[i]>width) xstuff[i] = 0;
    if(ystuff[i]>height) ystuff[i] = 0;
    if(xstuff[i]<0) xstuff[i]=width;
    if(ystuff[i]<0) ystuff[i]=height;
  }

}


function keyPressed()
{
  background(0);
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

