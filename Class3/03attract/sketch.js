//
// ASCII - AMERICAN STANDARD CODE FOR INFORMATION INTERCHANGE
//

var notfirstline = 0; // GLOBAL VARIABLE

function setup() {
  createCanvas(800, 600);
  background(0);
}

function draw() {
  if(mouseIsPressed) {
    strokeWeight(1);
    stroke(255, 255, 0, 30);
    if(notfirstline) line(0, 0, mouseX, mouseY);
    strokeWeight(5);
    stroke(255, 0, 0, 100);
    if(notfirstline) line(pmouseX, pmouseY, mouseX, mouseY);
    
    var circlesize = dist(pmouseX, pmouseY, mouseX, mouseY);
    strokeWeight(circlesize);
    stroke(0, 255, 255, 100);
    ellipse(mouseX, mouseY, 5, 5);
    notfirstline = 1;
  }
}

function mousePressed()
{
  notfirstline = 0;
}


function keyPressed()
{
  background(0);
}

