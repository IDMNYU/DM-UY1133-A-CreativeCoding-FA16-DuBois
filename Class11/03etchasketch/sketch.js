var serial;
var x = 0;
var y = 0;

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
    var tempdata = currentString.split(' ');
    // turn the string read from the arduino into an integer:
    x = parseInt(tempdata[0]); 
    y = parseInt(tempdata[1]); 

    //console.log("received: " + data);
    
  }
}

// recalibrate:
function keyPressed()
{

  background(255);
}

function draw() {
  // Polling method
  //background(255);
  noStroke();
  fill(0, 10);
  //console.log(data);
  ellipse(x/1023*width, y/1023*height, 10, 10);
}