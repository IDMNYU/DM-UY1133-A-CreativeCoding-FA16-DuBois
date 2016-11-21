var h = 0;

function setup() {
  createCanvas(800, 600);
  // instead of red green blue 0-255, we're now gonna talk about
  // color as hue, saturation, brightness.
  // hue is in degrees 0 - 360.
  // saturation and brightness are in percentages 0-100.
  colorMode(HSB);
  textSize(48);
}

function draw() {
  background(255);
  var s = mouseX/width*100;
  var b = 100-mouseY/height*100;
  fill(h, s, b);
  
  text(h, 20, 40);
  ellipse(width/2, height/2, 250, 250);
  
  h = (h+1) % 360.
}