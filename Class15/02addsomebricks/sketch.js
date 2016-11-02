// this is our test for p5.play
// let's make some stuff

var ball; // this is the breakout ball
var wallTop, wallBottom, wallLeft, wallRight; // these are walls
var bricks; // THIS IS GROUP OF BRICKS

var MAX_SPEED = 9; // how fast can we go?
var BRICK_W = 40; // this is how wide a brick is
var BRICK_H = 20; // this is how tall a brick is
var SPACEBETWEENBRICKS = 4; // how much space between each brick
var ROWS = 9; // rows of bricks
var COLUMNS = 16; // columns of bricks

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
  
  // make the bricks
  bricks = new Group(); // group of bricks
  var xoffset = 20+(width-(BRICK_W+SPACEBETWEENBRICKS)*COLUMNS) / 2;
  var yoffset = 50;
  
  for(var i = 0;i<COLUMNS;i++)
  {
    for(var j = 0;j<ROWS;j++)
    {
      var xpos = xoffset+(BRICK_W+SPACEBETWEENBRICKS)*i;
      var ypos = yoffset+(BRICK_H+SPACEBETWEENBRICKS)*j;
      
      var onebrick = createSprite(xpos, ypos, BRICK_W, BRICK_H);
      onebrick.immovable = true;
      bricks.add(onebrick);
    }
  }

}

function draw() {
  background(0);
  
  // check for bounces:
  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  // one more bounce:
  ball.bounce(bricks, brickHit);
  
  // MAGIC FUNCTION FOR p5.play:
  drawSprites(); // THIS WILL DRAW EVERYTHING
}

function mousePressed()
{
  if(ball.velocity.x==0 && ball.velocity.y==0)
  {
    ball.setSpeed(MAX_SPEED, random(60, 120));
  }
}

function keyPressed()
{
}

function brickHit(hitter, hitee)
{
  hitter.shapeColor = hitee.shapeColor;
  hitee.remove(); // kill the brick we just hit
}

function print()
{
  
}