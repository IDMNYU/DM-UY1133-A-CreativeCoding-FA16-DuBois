//
// this is a secondary chuck of javascript code for our breakout game:
//

// THESE ARE MY GAME VARIABLES:
var ball; // this is the breakout ball
var paddle; // this is the paddle on the bottom of the screen
var wallTop, wallBottom, wallLeft, wallRight; // these are walls
var bricks; // THIS IS GROUP OF BRICKS

var MAX_SPEED = 9; // how fast can we go?
var BRICK_W = 40; // this is how wide a brick is
var BRICK_H = 20; // this is how tall a brick is
var SPACEBETWEENBRICKS = 4; // how much space between each brick
var ROWS = 9; // rows of bricks
var COLUMNS = 16; // columns of bricks

var STARTLIVES = 5;
var lives; // NUMBER OF LIVES



function setupGame()
{
  // make a paddle
  paddle = createSprite(width/2, height-50, 100, 10);
  paddle.immovable = true; // even though it's immovable... (see below)

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


function startGame()
{
  lives = STARTLIVES; // start off with 5 lives
  
  // add the bricks:
  if(bricks!=undefined) {
    for(var i = 0;i<bricks.length;i++)
    {
      bricks[i].remove();
    }
  }

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

function drawGame()
{
  paddle.position.x = mouseX; // (from above) ...we can move the paddle

  // check for bounces on the walls:
  ball.bounce(wallTop);
  ball.bounce(wallBottom, isDead);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  // check for bounces with the bricks:
  ball.bounce(bricks, brickHit);
  // check for bounces with the paddle:
  // dumb ATARI paddle bounce hack:
  if(ball.bounce(paddle)) {
    var swing = (ball.position.x-paddle.position.x);
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
  }
  
  // MAGIC FUNCTION FOR p5.play:
  drawSprites(); // THIS WILL DRAW EVERYTHING  
}

function launchBall()
{
  if(ball.velocity.x==0 && ball.velocity.y==0)
  {
    ball.setSpeed(MAX_SPEED, random(60, 120));
  }
}

// these are collision callbacks: i know the ball is always the 'hitter'
function brickHit(hitter, hitee)
{
  hitter.shapeColor = hitee.shapeColor;
  hitee.remove(); // kill the brick we just hit
}

function isDead(hitter, hitee)
{
  hitter.position.x = width/2;
  hitter.position.y = height-200;
  hitter.setSpeed(0, 90);
  hitter.shapeColor = 255;
  lives--; // kill off a life
  if(lives<1) // YOU'RE DEAD
  {
    startGame();
  }
}