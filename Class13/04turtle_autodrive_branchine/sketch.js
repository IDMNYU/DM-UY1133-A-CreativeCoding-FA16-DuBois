var x = [];
var y = [];
var angle = [];
var distance = 10;
var angleamt = 30;

var string = 'FFF-F[+FFF[++FFFF]--FFF]+';
var pos = 0;

function setup() {
  createCanvas(800, 600);
  x = [width/2];
  y = [height/2];
  angle = [270];
  background(255);
}

function draw() {
  
  var c = string.charAt(pos);
  turtle(c);
  pos = (pos+1) % string.length;

  
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
    ellipse(x[curstack], y[curstack], distance/2, distance/2);
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