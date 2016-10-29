var threshold = 128;
var howwide = 50;
var howtall = 50;
var img; // this is gonna store two images

function setup() {
  createCanvas(600, 600);
  img = createImage(howwide, howtall);
  //noSmooth(); // don't smooth anything
  randomize();
}

function draw() {
  background(0, 0, 255, 10);
  image(img, 0, 0, width, height); // draw the new source
}


function keyReleased() // blow out the image with new stuff
{
  randomize();
}

// this completely recreates the simulation with binary noise (cells are on or off)
function randomize()
{
  var randthresh = 0.8; // 80% of pixels will be dead.
  img.loadPixels(); // load pixels into memory
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      var r = random()>randthresh; // true or false?
      var thered = r*255;
      var thegreen = (1-r)*255;
      img.set(i, j, [thered, thegreen, 0, 255]);
    }
  }
  img.updatePixels(); // update pixels

}

