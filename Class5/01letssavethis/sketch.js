
var r = new Array(100);

var RDIVIDER = 1000;
var RDISTANCE = 15;
var RSIZE = 5;
var RALPHA = 10;

var framenumber = 0;

function setup()
{
  createCanvas(800, 600);
  background(0);
  noStroke();
  
  for(var i = 0;i<r.length;i++)
  {
    //console.log(i);
    r[i] = 0;
  }
  
}

function draw()
{
  RDISTANCE = map(mouseX, 0, width, 5, 50);
  RDIVIDER = map(mouseY, 0, height, 1000, 10);


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

function keyPressed()
{
  if(key=='S')
  {
    saveCanvas('./saves/'+framenumber+'.png', 'png');
    framenumber++;
  }
}