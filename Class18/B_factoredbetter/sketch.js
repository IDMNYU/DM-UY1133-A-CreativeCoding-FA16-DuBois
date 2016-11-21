var stopfile, linefile, stoptimefile, routefile;

var stops = []; // this is gonna be the positions of the stops
var lines = []; // this is gonna be the positions of the lines
var stoptimes = []; // this is gonna be the timetable
var routecolors = {}; // colors for routes

// boundary variables:
var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180;
var LONGMAX = -180;

var drawscale;
var drawtx;
var drawty;

// timer variables
var NOW = 0;
var SOON = 60;
var MIDNIGHT = 60*60*24; // how many seconds are in a day
var INTERVAL = 60; // how fast we going

// STEP 1 -> loads all the MTA data files:
function preload() {
  stopfile = loadStrings('./data/stops.txt');
  linefile = loadStrings('./data/shapes.txt');
  stoptimefile = loadStrings('./data/stop_times.txt');
  routefile = loadStrings('./data/routes.txt');
}

// STEP 2 -> make sense of all the MTA data files:
function setup() {
  createCanvas(800, 600);
  // parse the files:
  dostops();
  dolines();
  dostoptimes();
  doroutes();
  
  // setup the graphics:
  drawscale = 1.;
  drawtx = width/2;
  drawty = height/2;
}

function draw() {
  background(0);
  
  stroke(255);
  noFill();
  strokeWeight(1);
  textSize(48);
  // luke dubois famous time format hack:
  var pad = '00';
  var hour = (pad+floor(NOW/3600)).slice(-pad.length);
  var minute = (pad+floor(NOW/60)%60).slice(-pad.length);
  var second = (pad+floor(NOW%60)).slice(-pad.length);
  text(hour+':'+minute+':'+second, 40, 75);
  
  resetMatrix();
  translate(drawtx, drawty);
  scale(drawscale);
  drawthestuff();
  
  // update clock
  NOW = (NOW+INTERVAL) % MIDNIGHT;
  SOON = NOW+INTERVAL;
}



function keyPressed()
{
  if(keyCode==187) drawscale*=1.25; // '+' --- zoom in
  if(keyCode==189) drawscale*=0.8; // '-' --- zoom out
  if(keyCode==39) drawtx-=10; // 'left' --- pan left
  if(keyCode==37) drawtx+=10; // 'right' --- pan right
  if(keyCode==38) drawty+=10; // 'up' --- pan up
  if(keyCode==40) drawty-=10; // 'down' --- pan down
}
