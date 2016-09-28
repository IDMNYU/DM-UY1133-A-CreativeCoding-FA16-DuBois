
var thefont = new Array(4); // global variable 'cause i need it elsewhere
var fsize = 9;
var insidecolor = 0;
var fontcounter = 0;

// fonts are like images... they need to be loaded
// asychronously in the preload() function:
function preload()
{
  for(var i = 0;i<thefont.length;i++)
  {
    thefont[i] = loadFont('./data/font'+i+'.otf');
  }
}


function setup() {
  createCanvas(800, 600);
  background(255);
  stroke(0);
  textFont(thefont[0], fsize); // which font and its size
}

function draw() {
  background(255);
  fill(insidecolor, 0, 0);
  text('my dog has fleas', mouseX, mouseY);
  fsize++;
  textSize(fsize);
  if(fsize>96) fsize=9;

  if(frameCount%20==0) {
    insidecolor = 255-insidecolor;
    fontcounter = (fontcounter+1) % thefont.length;
    textFont(thefont[fontcounter]);
  }
}