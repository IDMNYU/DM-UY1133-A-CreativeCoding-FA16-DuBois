
// a bunch of fonts:
var thefont = new Array(4); 

// a phrase i want to typeset:
var phrase = 'now is the winter of our discontent';
var phrasearray = phrase.split(' '); // make an array out of a string

// a holding tank for phases for the size of each word:
var fphases = new Array();

// how fast am in resizing the type:
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
  
  // initialize the array of phases:
  fphases = new Array(phrasearray.length); // how many words am i drawing?
  for(var i = 0;i<fphases.length;i++)
  {
    fphases[i] = random(0., TWO_PI); // randomize everything
  }
}

function draw() {
  background(255);
  var thex = 0; // start at the left
  var they = height/2; // draw in the middle
  
  speed = mouseX/width * 0.5; // how fast are the phases moving
  

  var s; // temporary variable for the text size
  var fcounter = 0; // this is a counter going through the available fonts
  for(var i = 0;i<phrasearray.length;i++) // go through my phrase
  {
    s = map(sin(fphases[i]), -1., 1., 9, 64); // how BIG is the word?
    textFont(thefont[fcounter], s); // switch to the current font
    text(phrasearray[i], thex, they); // draw the word
    thex+=textWidth(phrasearray[i]+' '); // move the X over a bit
    fphases[i] = (fphases[i] + speed) % TWO_PI; // increment the sine function
    fcounter = (fcounter+1) % thefont.length; // increment which font i'm using
  }

}