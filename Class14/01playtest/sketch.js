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
  
  drawSprites();
}

function mousePressed()
{
  var s = createSprite(mouseX, mouseY, 30, 30);
  s.friction = 1.;
  s.velocity.x = random(-5, 5);
  s.velocity.y= random(-5, 5);
}