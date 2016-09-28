
var thefont = new Array(4); // global variable 'cause i need it elsewhere



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
  fill(0, 0, 255);
}

function draw() {
  background(255);
  var thex = 50;
  var they = height/2;
  textFont(thefont[0], 36);
  text('my', thex, they);
  thex+=textWidth('my ');
  textFont(thefont[1], 36);
  text('dog', thex, they);
  thex+=textWidth('dog ');
  textFont(thefont[2], 36);
  text('has', thex, they);
  thex+=textWidth('has ');
  textFont(thefont[3], 36);
  text('fleas', thex, they);
  thex+=textWidth('fleas '); // this is optional
  
  
}