//
// ASCII - AMERICAN STANDARD CODE FOR INFORMATION INTERCHANGE
//


function setup() {
  createCanvas(800, 600);
}

function draw() {
  if(keyIsPressed) rect(width/2, height/2, 100, 100); // any key is down.  don't care which one.
  if(keyIsDown(74)) ellipse(random(width), random(height), random(width), random(height)); // a specific key is down; use the keycode.
  
}


// CALLBACK FUNCTIONS:

// keyTyped cares about the actual character you typed,
// however many keys it took to do that
// keyTyped wont fire on meta keys (shift, ctrl, alt, fn)
function keyTyped() {
  console.log('TYPED: ' + key + ' ' + keyCode);
  if(key=='C') background(0); // will only fire on capital C
  if(keyCode=='67') background(0); // this is the same thing as the line above
}

// keyPressed cares about the physical key you hit
function keyPressed() {
  console.log('down: ' + key + ' ' + keyCode);
  if(key=='F') background(0); // this will fire on any press of the physical key F
}

// keyReleased cares about the physical key you hit
function keyReleased() {
  console.log('up ' + key + ' ' + keyCode);
}