// this is our test for p5.play
// let's make some stuff

function setup() {
  createCanvas(800, 600);

  setupGame();  
  startGame();

}

function draw() {
  background(0);
  
  drawGame();
}

function mousePressed()
{
  launchBall();
}

function keyPressed()
{
}

function print()
{
  
}