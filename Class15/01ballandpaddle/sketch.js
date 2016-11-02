// this is our test for p5.play
// let's make some stuff

var ball; // this is the breakout ball
var wallTop, wallBottom, wallLeft, wallRight; // these are walls

var MAX_SPEED = 9; // how fast can we go?

function setup() {
  createCanvas(800, 600);

  // make some walls (immovable)
  wallTop = createSprite(width/2, 0, width, 15);
  wallTop.immovable = true; // don't move
  wallBottom = createSprite(width/2, height, width, 15);
  wallBottom.immovable = true; // don't move
  wallLeft = createSprite(0, height/2, 15, height);
  wallLeft.immovable = true; // don't move
  wallRight = createSprite(width, height/2, 15, height);
  wallRight.immovable = true; // don't move

  // make a ball
  ball = createSprite(width/2, height-200, 11, 11);
  ball.maxSpeed = MAX_SPEED;
  ball.shapeColor = 255;

}

function draw() {
  background(0);
  
  // check for bounces:
  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  

  // MAGIC FUNCTION FOR p5.play:
  drawSprites(); // THIS WILL DRAW EVERYTHING
}

function mousePressed()
{
    ball.setSpeed(MAX_SPEED, random(60, 120));
}

function keyPressed()
{
}

function print()
{
  
}