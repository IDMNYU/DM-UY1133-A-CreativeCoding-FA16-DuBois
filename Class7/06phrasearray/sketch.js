
var thefont = new Array(4); // global variable 'cause i need it elsewhere

var fphases = new Array(4);

var testphase = 0;
var speed = 0.01;

var phrase = 'my dog has fleas';
var phrasearray = phrase.split(' '); // make an array out of a string

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
  
  for(var i = 0;i<phrasearray.length;i++)
  {
    s = map(sin(fphases[i]), -1., 1., 9, 64);
    textFont(thefont[i], s);
    text(phrasearray[i], thex, they);
    thex+=textWidth(phrasearray[i]+' ');
    fphases[i] = (fphases[i] + speed) % TWO_PI;
    
  }

}