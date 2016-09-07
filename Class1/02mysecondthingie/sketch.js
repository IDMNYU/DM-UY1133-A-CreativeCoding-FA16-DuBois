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
  // color in p5.js
  fill(128, 206, 30); // foreground color (RGB)
  
  // console.log(mouseX); // print this out!
  
  ellipse(mouseX, mouseY, mouseX, mouseY); // draw
}


