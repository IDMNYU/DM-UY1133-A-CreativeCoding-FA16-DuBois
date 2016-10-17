var serial;
var data = 0;
var maximum = 0;
var minimum = 1023;

function setup() {
  createCanvas(800, 600);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1411");

  // Register some callbacks

  // When we some data from the serial port
  serial.on('data', gotData);

}


// There is data available to work with from the serial port
function gotData() {
  // read the stuff off the serial port until you hit a CR/LF
  var currentString = serial.readStringUntil("\r\n");
  if(currentString.length>0) {
    // turn the string read from the arduino into an integer:
    var tempdata = parseInt(currentString); 
    if(tempdata>maximum) maximum=tempdata;
    if(tempdata<minimum) minimum=tempdata;
      var foo = map(tempdata, minimum, maximum, 0., 1.);
      if(foo>0) {
        //console.log(foo);
        data = 0.99*data + 0.01*foo;
      }

    //console.log("received: " + data);
    
  }
}

// recalibrate:
function keyPressed()
{
  maximum = 0;
  minimum = 1023;
}

function draw() {
  // Polling method
  background(255);
  fill(0);
  //console.log(data);
  ellipse(data*width, height/2, 20, 20);
}