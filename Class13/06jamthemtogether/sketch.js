var x = [];
var y = [];
var angle = [];

var string = 'F';
var rules = [['F', 'F−G+F+G−F'],['G', 'GG']];
//var rules = [['F', 'F+F−F−F+F']];
var distance = 30;
var angleamt = 60;
var numproductions = 3;

var pos = 0;

function setup() {
  createCanvas(800, 600);
  x = [width/2];
  y = [height/2];
  angle = [270];
  background(255);
  
  for(i = 0;i<numproductions;i++) {
    string = linden(string);
    console.log(string);
  }
  
}

function draw() {
  
  var c = string.charAt(pos);
  //console.log(c);
  // do something!
  if(pos<string.length) turtle(c);
  
  pos = (pos+1);
  
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

function keyTyped() {
  turtle(key);
}

// TURTLE GRAPHICS INTERPRETER:
function turtle(k) {
  var curstack = x.length-1;
  if(k=='F') {
    stroke(0);
    var x1 = x[curstack] + distance*cos(radians(angle[curstack]));
    var y1 = y[curstack] + distance*sin(radians(angle[curstack]));
    line(x[curstack], y[curstack], x1, y1);
    stroke(random(255), random(255), random(255));
    ellipse(x[curstack], y[curstack], distance/4, distance/4);
    x[curstack] = x1;
    y[curstack] = y1;
  }
  else if(k=='f') {
    x[curstack] = x[curstack] + distance*cos(radians(angle[curstack]));
    y[curstack] = y[curstack] + distance*sin(radians(angle[curstack]));
  }
  else if(k=='+') angle[curstack]+=angleamt;
  else if(k=='-') angle[curstack]-=angleamt;
  else if(k=='[') // start a branch
  {
    x[curstack+1] = x[curstack];
    y[curstack+1] = y[curstack];
    angle[curstack+1] = angle[curstack];
  }
  else if(k==']') // end a branch
  {
    x.pop();
    y.pop();
    angle.pop();
  }
  else if(k=='C') background(255);
}