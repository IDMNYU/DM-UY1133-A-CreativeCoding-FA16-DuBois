// this is a comment

/*
all this stuff
      is also
          a
              comment
*/

function setup() {
  createCanvas(800, 600); // width and height in pixels
  background(0); // background color
}

function draw() {
  // color in p5.js:
  // if you use ONE (1) number, it's just
  //      dark to light (0-255)
  // if you use THREE (3) numbers, it's
  //      red, green, blue (0-255 for each)
  // if you use FOUR (4) numbers, it's
  //      red, green, blue, alpha (0-255 for each)
  fill(mouseX, mouseY, 0); // foreground color (RGB)
  
  // console.log(mouseX); // print this out!
  
  ellipse(mouseX, mouseY, mouseX, mouseY); // draw
  
  fill(255);
  rect(255, 255, 10, 10);
  
}


