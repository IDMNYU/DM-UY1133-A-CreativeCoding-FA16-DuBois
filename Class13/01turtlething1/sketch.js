var x, y;
var angle = 270;
var distance = 10;
var angleamt = 30;

function setup() {
  createCanvas(800, 600);
  x = width/2;
  y = height/2;
  background(255);
}

function draw() {

  stroke(random(255), random(255), random(255));
  ellipse(x, y, distance/2, distance/2);
  
}

// the keyTyped() function 
// *actually* gives you the right key values:
function keyTyped() {
  if(key=='F') {
    stroke(0);
    var x1 = x + distance*cos(radians(angle));
    var y1 = y + distance*sin(radians(angle));
    line(x, y, x1, y1);
    x = x1;
    y = y1;
  }
  else if(key=='+') angle+=angleamt;
  else if(key=='-') angle-=angleamt;
  else if(key=='C') background(255);
}