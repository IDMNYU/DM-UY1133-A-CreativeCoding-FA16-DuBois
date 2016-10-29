var x, y;
var angle = 270;
var distance = 10;
var angleamt = 90;

var string = 'F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F+F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F+F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F';
var pos = 0;

function setup() {
  createCanvas(800, 600);
  x = width/2;
  y = height/2;
  background(255);
}

function draw() {
  
  var c = string.charAt(pos);
  doit(c);
  pos = (pos+1) % string.length;

  
}

function doit(k) {
  if(k=='F') {
    stroke(0);
    var x1 = x + distance*cos(radians(angle));
    var y1 = y + distance*sin(radians(angle));
    line(x, y, x1, y1);
    stroke(random(255), random(255), random(255));
    ellipse(x, y, distance/2, distance/2);
    x = x1;
    y = y1;
  }
  else if(k=='f') {
    x = x + distance*cos(radians(angle));
    y = y + distance*sin(radians(angle));
  }
  else if(k=='+') angle+=angleamt;
  else if(k=='-') angle-=angleamt;
  else if(k=='C') background(255);
}