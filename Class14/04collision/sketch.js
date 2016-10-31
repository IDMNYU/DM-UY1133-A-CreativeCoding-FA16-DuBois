// this is our test for p5.play
// let's make some stuff

var trumpnose; // image for trump's nose
var basketofdeplorables; // group of trumps

function preload()
{
  trumpnose = loadImage('./data/trumpnose.png');
}

function setup() {
  createCanvas(800, 600);
  background(0);
  //frameRate(5);
  
  // this will let me do stuff all at once to all the particles
  basketofdeplorables = new Group(); 
}

function draw() {
  background(0);
  
  fill(0);
  
  // STEP 0 -> COLLISION DETECT FOR EVERYONE:
  basketofdeplorables.bounce(basketofdeplorables);

  // STEP 1 -> MAKE NEW SPRITES:

  // sometimes make them, sometimes don't:
  var spritestomake = floor(random(-5, 2)); 
  
  for(var i = 0;i<spritestomake;i++)
  {
    var s = createSprite(width/2, height, 5, 5);
    // initial velocity (pass by reference):
    s.velocity.x = random(-5, 5);
    s.velocity.y= random(-5, 5);
    s.scale = 0.5; // small nose
    s.life = 200; // only last 200 frames at most
    s.rotateToDirection = 1; // spin towards attractor
    // this makes a custom image:
    s.addImage(trumpnose);

    // collision stuff:
    s.friction = 1.; // this is the damping
    s.mass = s.scale;
    // this sets up how the sprite handles collisions:
    s.setCollider("rectangle", 0, 0, trumpnose.width*s.scale, trumpnose.height*s.scale);

    
    basketofdeplorables.add(s); // add our new particle to the group
  }
  
  // STEP 2 -> UPDATE ALL THE SPRITES:
  for(var i = 0;i<allSprites.length;i++)
  {
    var temp = allSprites[i]; // pass by reference
    // tell the sprite to attract towards the mouse:
    temp.attractionPoint(1., mouseX, mouseY); 
    temp.addSpeed(0.1, 90); // this adds speed in a specific direction
    //temp.shapeColor = [random(255), random(128), 0, 100];
    
    // OUT OF BOUNDS?:
    if(temp.position.y > height + 100 || temp.position.y < -100 || temp.position.x > width + 100 || temp.position.x < -100) 
    {
      temp.remove(); // kill the sprite
    }

  }
  
  // MAGIC FUNCTION FOR p5.play:
  drawSprites(); // THIS WILL DRAW EVERYTHING
}

function doCollision(a, b)
{
  console.log("collision!!!!!");
}

function keyPressed()
{
  background(0);
}