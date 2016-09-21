
var colors = []; // new Array
colors[0] = [255, 192, 0];
colors[1] = [192, 64, 200];
colors[2] = [0, 255, 192];
colors[3] = [192, 64, 64];
colors[4] = [0, 0, 255];

var osc;


function setup()
{
  createCanvas(800, 600);
  background(0);
  noStroke();
  rectMode(CENTER);

  
}

function draw()
{
  var w = floor(map(mouseX, 0, width, 0, 5));
  console.log(w);
  fill(colors[w]);  
  rect(mouseX, mouseY, 50, 50);

}

function keyPressed()
{
    background(0);

}

