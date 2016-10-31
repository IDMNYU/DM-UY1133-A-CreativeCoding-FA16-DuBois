// this is our test for p5.play
// let's make some stuff

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  
  fill(0);
  textAlign(CENTER);
  text("click me!!!!", width/2, height/2);
  
  // MAGIC FUNCTION FOR p5.play:
  drawSprites(); // THIS WILL DRAW EVERYTHING
}

function mousePressed()
{
  // just like making a rect() or an ellipse(), but it's a Sprite
  // if you want to add any parameters to it, you gotta assign
  // it to a variable:
  var s = createSprite(mouseX, mouseY, 30, 30);
  s.friction = 1.; // larger than 1 accelerates, less than 1 dampens
  // initial velocity:
  s.velocity.x = random(-5, 5);
  s.velocity.y= random(-5, 5);
}