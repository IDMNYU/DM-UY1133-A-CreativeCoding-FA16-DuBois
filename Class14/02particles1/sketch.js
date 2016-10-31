// this is our test for p5.play
// let's make some stuff

function setup() {
  createCanvas(800, 600);
  background(0);
}

function draw() {
  background(0, 10);
  
  fill(0);

  // STEP 1 -> MAKE NEW SPRITES:

  // sometimes make them, sometimes don't:
  var spritestomake = floor(random(-5, 10)); 
  
  for(var i = 0;i<spritestomake;i++)
  {
    var s = createSprite(width/2, height, 5, 5);
    // initial velocity (pass by reference):
    s.velocity.x = random(-5, 5);
    s.velocity.y= random(-5, 5);
    // this makes a custom color:
    s.shapeColor = [random(255), random(128), 0, 100];
  }
  
  // STEP 2 -> UPDATE ALL THE SPRITES:
  for(var i = 0;i<allSprites.length;i++)
  {
    var temp = allSprites[i]; // pass by reference
    // tell the sprite to attract towards the mouse:
    temp.attractionPoint(1., mouseX, mouseY); 
    temp.addSpeed(0.1, 90); // this adds speed in a specific direction
    //temp.shapeColor = [random(255), random(128), 0, 100];
  }
  
  // MAGIC FUNCTION FOR p5.play:
  drawSprites(); // THIS WILL DRAW EVERYTHING
}

function keyPressed()
{
  background(0);
}