// this is our test for p5.play
// let's make some stuff

function preload() {
  thefont = loadFont('./data/TrajanPro-Bold.otf');
}

function setup() {
  createCanvas(800, 600);
  textFont(thefont);

  setupGame(); 
  setupSound();
  startGame();

}

function draw() {
  background(0);
  
  drawGame();
  drawText();
  

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