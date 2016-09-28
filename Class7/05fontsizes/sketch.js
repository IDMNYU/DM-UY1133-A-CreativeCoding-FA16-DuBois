
var thefont = new Array(4); // global variable 'cause i need it elsewhere

var fphases = new Array(4);

var testphase = 0;
var speed = 0.01;

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
  for(var i = 0;i<fphases.length;i++)
  {
    fphases[i] = random(0., TWO_PI);
  }
}

function draw() {
  background(255);
  var thex = 50;
  var they = height/2;
  
  speed = mouseX/width * 0.5;
  
  testphase = (testphase + speed) % TWO_PI;
  var h = map(sin(testphase), -1., 1., height, 0);
  ellipse(width/2, h, 20, 20);
  
  var s;
  
  
  s = map(sin(fphases[0]), -1., 1., 9, 64);
  textFont(thefont[0], s);
  text('my', thex, they);
  thex+=textWidth('my ');
  fphases[0] = (fphases[0] + speed) % TWO_PI;

  s = map(sin(fphases[1]), -1., 1., 9, 64);
  textFont(thefont[1], s);
  text('dog', thex, they);
  thex+=textWidth('dog ');
  fphases[1] = (fphases[1] + speed) % TWO_PI;

  s = map(sin(fphases[2]), -1., 1., 9, 64);
  textFont(thefont[2], s);
  text('has', thex, they);
  thex+=textWidth('has ');
  fphases[2] = (fphases[2] + speed) % TWO_PI;

  s = map(sin(fphases[3]), -1., 1., 9, 64);
  textFont(thefont[3], s);
  text('fleas', thex, they);
  thex+=textWidth('fleas '); // this is optional
  fphases[3] = (fphases[3] + speed) % TWO_PI;
  
  
}