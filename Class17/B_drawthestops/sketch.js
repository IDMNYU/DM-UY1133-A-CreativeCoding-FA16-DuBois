var stopfile, linefile, stoptimefile;

var stops = []; // this is gonna be the positions of the stops
var lines = []; // this is gonna be the positions of the lines
var stoptimes = []; // this is gonna be the timetable

// boundary variables:
var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180;
var LONGMAX = -180;

var drawscale = 1.;
var drawtx = width/2;
var drawty = height/2;

function preload() {
  stopfile = loadStrings('./data/stops.txt');
  linefile = loadStrings('./data/shapes.txt');
  stoptimefile = loadStrings('./data/stop_times.txt');
}

function setup() {
  createCanvas(800, 600);
  console.log(stoptimefile.length);
  dostops();
}

function draw() {
  background(0);
  resetMatrix();
  translate(drawtx, drawty);
  scale(drawscale);
  drawthestuff();
}

function dostops() {
  // the key says the stops file has:
  // stop_id,stop_code,stop_name,stop_desc,
  // stop_lat,stop_lon,zone_id,stop_url,
  // location_type,parent_station
  
  // start at 1 because skip the key:
  for(var i = 1;i<stopfile.length;i++)
  {
    var thedata = stopfile[i].split(','); // parse CSV
    var thestop = {}; // blank object
    thestop.id = thedata[0];
    thestop.name = thedata[2];
    thestop.lat = thedata[4];
    thestop.long = thedata[5];
    
    // update boundaries:
    if(thestop.lat<LATMIN) LATMIN = thestop.lat;
    if(thestop.lat>LATMAX) LATMAX = thestop.lat;
    if(thestop.long<LONGMIN) LONGMIN = thestop.long;
    if(thestop.long>LONGMAX) LONGMAX = thestop.long;
    
    stops.push(thestop); // fill up our array
  }
}

function drawthestuff()
{
  stroke(255);
  textSize(12);
  noFill();
  // draw the stops
  for(var i =  0;i<stops.length;i++)
  {
    var pos = mtascale(stops[i]);
    ellipse(pos.x, pos.y, 5, 5);
    text(stops[i].name, pos.x+10, pos.y);
  }
}


function mtascale(thingie)
{
  var o = {};
  o.x = 10*map(thingie.long, LONGMIN, LONGMAX, width/2, -width/2);
  o.y = 10*map(thingie.lat, LATMIN, LATMAX, height/2, -height/2);
  return(o);
}
