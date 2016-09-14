//
// ASCII - AMERICAN STANDARD CODE FOR INFORMATION INTERCHANGE
//

var go = 0;


function setup() {
  createCanvas(800, 600);
}

function draw() {
  if(go==1) ellipse(random(width), random(height), random(width), random(height)); // a specific key is down; use the keycode.
  
}


// CALLBACK FUNCTIONS:

// keyTyped cares about the actual character you typed,
// however many keys it took to do that
// keyTyped wont fire on meta keys (shift, ctrl, alt, fn)
function keyTyped() {
  console.log('TYPED: ' + key + ' ' + keyCode);
}

// keyPressed cares about the physical key you hit
function keyPressed() {
  console.log('down: ' + key + ' ' + keyCode);
  if(key=='F') go=1; // this will fire on any press of the physical key F
}

// keyReleased cares about the physical key you hit
function keyReleased() {
  console.log('up ' + key + ' ' + keyCode);
  if(key=='F') go=0; // this will fire on any press of the physical key F
}