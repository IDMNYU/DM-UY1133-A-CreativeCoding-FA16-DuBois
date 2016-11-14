var stopfile, linefile, stoptimefile;

var stops = []; // this is gonna be the positions of the stops
var lines = []; // this is gonna be the positions of the lines
var stoptimes = []; // this is gonna be the timetable

function preload() {
  stopfile = loadStrings('./data/stops.txt');
  linefile = loadStrings('./data/shapes.txt');
  stoptimefile = loadStrings('./data/stop_times.txt');
}

function setup() {
  createCanvas(800, 600);
  console.log(stoptimefile.length);
}

function draw() {
  
}