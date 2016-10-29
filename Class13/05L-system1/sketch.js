
var string = 'A';
var rules = [['A', 'BA'], ['B', 'A']];
var pos = 0;
var osc;

function setup() {
  createCanvas(800, 600);
  x = [width/2];
  y = [height/2];
  angle = [270];
  background(255);
  
  for(i = 0;i<10;i++) {
    string = linden(string);
    console.log(string);
  }
  
  // sound stuff:
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();
  
  frameRate(5);
}

function draw() {
  
  var c = string.charAt(pos);
  // do something!
  if(c=='A') osc.amp(0.5, 0.5); else osc.amp(0, 0.1);
  
  pos = (pos+1) % string.length;
  
}

function linden(s) {
  var outstring = '';
  for(var i = 0;i<s.length;i++)
  {
    var letter = s.charAt(i);
    var match = 0;
    for(var j=0;j<rules.length;j++)
    {
      if(letter==rules[j][0])
      {
        match = 1;
        outstring+=rules[j][1];
        break;
      }
    }
    if(match==0) outstring+=letter;
  }
  return(outstring);
}