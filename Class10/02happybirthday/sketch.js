
var colors = new Array(16); // new Array

var osc1, echo1;
var sequence = [62, 62, 64, 62, 67, 66, 62, 62, 64, 62, 69, 67, 62, 62, 74, 71, 67, 66, 64, 72, 72, 71, 67, 69, 67]; // MIDI
//var sequence = [60, 63, 58, 65, 70, 67, 62, 72, 63, 60, 62, 67, 65, 70, 58, 67]; // MIDI
var step = 0; // which note am i playing out of 'sequence'

var thechain = []; // Markov Chain Array

var thecurrentnote;

function setup()
{
  createCanvas(800, 600);
  background(0);
  noStroke();
  rectMode(CENTER);
  
  for(var i = 0;i<colors.length;i++)
  {
    colors[i] = [random(255), random(255), random(255), 20];
  }
  
  osc1 = new p5.Oscillator();
  osc1.setType('square');
  osc1.freq(240);
  osc1.amp(0);
  osc1.start();

  echo1 = new p5.Delay();
  // what to echo, time (s), feedback (0-1), damping (freq)
  echo1.process(osc1, 0.25, 0.5, 5000); 
  
  domarkov();
  thecurrentnote = sequence[floor(random(sequence.length))];

  
}

function draw()
{
  var w = floor(map(mouseX, 0, width, 0, colors.length));
  var o = floor(map(mouseY, 0, height, 5, 0));

  fill(colors[w]);  
  rect(mouseX, mouseY, 50, 50);

  // add the note to the octave and convert
  osc1.amp(0.3);
  osc1.freq(midiToFreq(thecurrentnote));
  
  if(frameCount % 15 == 0) {
    var which = picknote(thecurrentnote);
    thecurrentnote = which;
  }

}

function keyPressed()
{
    background(0);
  thecurrentnote = sequence[floor(random(sequence.length))];

}

function picknote(note)
{
  var pick = floor(random(thechain[note].length));
  console.log("chain length is " + thechain[note].length + " for note " + note);
  return(thechain[note][pick]);
}

function domarkov()
{
  for(var i = 0; i<sequence.length;i++)
  {
    var current = sequence[i]; // current note in melody
    var next = sequence[(i+1)%sequence.length]; // next note in melody
    if(!thechain[current]) // first time we're seeing this note
    {
      thechain[current] = []; // make an array for it in the chain
    }
    // add the next note to the chain
    thechain[current].push(next);
  }
}

