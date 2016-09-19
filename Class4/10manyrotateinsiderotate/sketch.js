
var r = new Array(100);

var RDIVIDER = 1000;
var RDISTANCE = 10;
var RSIZE = 5;
var RALPHA = 10;

function setup()
{
  createCanvas(800, 600);
  background(0);
  noStroke();
  
  for(var i = 0;i<r.length;i++)
  {
    console.log(i);
    r[i] = 0;
  }
  
}

function draw()
{
  background(0, RALPHA);
  fill(255);

  for(var i = 0;i<r.length;i++)
  {
    resetMatrix();
    translate(width/2, height/2);
    rotate(r[i]);
    translate(i*RDISTANCE, 0);
    ellipse(0, 0, RSIZE, RSIZE);
    r[i]+=i/RDIVIDER;
  }
  
}