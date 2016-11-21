var h = 0;

function setup() {
  createCanvas(800, 600, WEBGL);
  // instead of red green blue 0-255, we're now gonna talk about
  // color as hue, saturation, brightness.
  // hue is in degrees 0 - 360.
  // saturation and brightness are in percentages 0-100.
  colorMode(HSB);
  textSize(48);
}

function draw() {
  background(0);
  var dirX = (mouseX / width - 0.5) *2;
  var dirY = (mouseY / height - 0.5) *(-2);
 
  directionalLight(250, 250, 250, dirX, dirY, 0.25);
  var s = mouseX/width*100;
  var b = 100-mouseY/height*100;
  fill(h, s, b);
  rotateX(radians(h));
  rotateY(radians(s/100*360));
  rotateZ(radians(b/100*360));
  box(200, 200, 200);
  
  h = (h+1) % 360.
}