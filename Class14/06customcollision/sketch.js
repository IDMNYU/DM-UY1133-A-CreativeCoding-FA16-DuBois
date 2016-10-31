// this is our test for p5.play
// let's make some stuff

var trumpnose; // image for trump's nose
var basketofdeplorables; // group of trumps
var basketofdeplorablesounds = new Array(20); // soundbites
var clintonimage; // image for clinton
var clintonsprite; // sprite for clinton

function preload()
{
  trumpnose = loadImage('./data/trumpnose.png');
  for(var i = 0;i<basketofdeplorablesounds.length;i++) {
    basketofdeplorablesounds[i] = loadSound('./data/rigged.mp3');
  }
  clintonimage = loadImage('./data/clinton.png');
}

function setup() {
  createCanvas(800, 600);
  background(0);
  //frameRate(5);
  
  // this will let me do stuff all at once to all the particles
  basketofdeplorables = new Group(); 

  // sounds:
  for(var i = 0;i<basketofdeplorablesounds;i++) {
    basketofdeplorablesounds[i].setVolume(0.1);
    basketofdeplorablesounds[i].play();
  }

  // one last sprite:
  clintonsprite = createSprite(width/2, height/2, 50, 50);
  clintonsprite.addImage(clintonimage);
  clintonsprite.scale = 1.0;
  clintonsprite.setCollider("rectangle", 0, 0, clintonimage.width*clintonsprite.scale, clintonimage.height*clintonsprite.scale);
  
}

function draw() {
  background(0);
  
  fill(0);
  
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
  
  clintonsprite.position.x = mouseX;
  clintonsprite.position.y = mouseY;
  clintonsprite.collide(basketofdeplorables, hillaryCollision);
  
  for(var i = 0;i<allSprites.length;i++)
  {
    var temp = allSprites[i]; // pass by reference
    // tell the sprite to attract towards the mouse:
    temp.attractionPoint(1., mouseX, mouseY); 
    temp.addSpeed(0.1, 90); // this adds speed in a specific direction
    //temp.shapeColor = [random(255), random(128), 0, 100];
    
    temp.collide(basketofdeplorables, doCollision);
    
    // OUT OF BOUNDS?:
    if(temp.position.y > height + 100 || temp.position.y < -100 || temp.position.x > width + 100 || temp.position.x < -100) 
    {
      temp.remove(); // kill the sprite
    }

  }
  
  // MAGIC FUNCTION FOR p5.play:
  drawSprites(); // THIS WILL DRAW EVERYTHING
}
function hillaryCollision(a, b)
{
  b.remove();
}

function doCollision(a, b)
{
  //a.remove();
  //b.remove();
  // when there's a collision, find me a soundfile player
  // that isn't busy right now (dynamic polyphony):
  for(var i = 0;i<basketofdeplorablesounds.length;i++)
  {
    if(!basketofdeplorablesounds[i].isPlaying()) // is it not busy?:
    {
      basketofdeplorablesounds[i].rate(random(0.75, 1.25));
      basketofdeplorablesounds[i].play();
      break;
    }
  }
  //console.log("collision!!!!!");
}

function keyPressed()
{
  background(0);
}