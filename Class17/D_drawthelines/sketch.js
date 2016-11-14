var stopfile, linefile, stoptimefile;

var stops = []; // this is gonna be the positions of the stops
var lines = []; // this is gonna be the positions of the lines
var stoptimes = []; // this is gonna be the timetable

// boundary variables:
var LATMIN = 180;
var LATMAX = -180;
var LONGMIN = 180;
var LONGMAX = -180;

var drawscale;
var drawtx;
var drawty;

function preload() {
  stopfile = loadStrings('./data/stops.txt');
  linefile = loadStrings('./data/shapes.txt');
  stoptimefile = loadStrings('./data/stop_times.txt');
}

function setup() {
  createCanvas(800, 600);
  console.log(stoptimefile.length);
  dostops();
  dolines();
  drawscale = 1.;
  drawtx = width/2;
  drawty = height/2;
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

function dolines()
{
  // go through the entire line file:
  // start at 1 because skip the key:
  for(var i = 1;i<linefile.length;i++)
  {
    var thedata = linefile[i].split(','); // parse CSV
    var linename = thedata[0]; // this is the line we're talking about
    var linelat = thedata[1]; // latitude
    var linelong = thedata[2]; // longitude
    var linepos = thedata[3]; // order
    
    var ismatch = 0; // have i seen this line yet in my database?
    for(var j = 0;j<lines.length;j++) // loop through existing lines
    {
      if(lines[j].name==linename) // we've already seen this line
      {
        ismatch = 1;
        newposition = {};
        newposition.lat = linelat;
        newposition.long = linelong;
        lines[j].points[linepos] = newposition;
        break;
      }
    }

    if(ismatch==0) // this is a new line we've never seen before
    {
      var newline = {};
      newline.name = linename;
      console.log('adding...' + newline.name);
      newline.points = [];
      newposition = {};
      newposition.lat = linelat;
      newposition.long = linelong;
      newline.points[linepos] = newposition;
      lines.push(newline);
    }
    newposition = {};
    newposition.lat = linelat;
    newposition.long = linelong;
    lines[j].points[linepos] = newposition;
    
  }  
}


function drawthestuff()
{
  
  // this draws lines:
  stroke(0, 128, 255);
  for(var i =  0;i<lines.length;i++)
  {
    beginShape();
    for(var j =  0;j<lines[i].points.length;j++)
    {
      pos = mtascale(lines[i].points[j]);
      vertex(pos.x, pos.y);
    }
    endShape();
  }
  
  // this draws stops:
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

function keyPressed()
{
  if(keyCode==187) drawscale*=1.25; // '+' --- zoom in
  if(keyCode==189) drawscale*=0.8; // '-' --- zoom out
  if(keyCode==39) drawtx-=10; // 'left' --- pan left
  if(keyCode==37) drawtx+=10; // 'right' --- pan right
  if(keyCode==38) drawty+=10; // 'up' --- pan up
  if(keyCode==40) drawty-=10; // 'down' --- pan down
}
