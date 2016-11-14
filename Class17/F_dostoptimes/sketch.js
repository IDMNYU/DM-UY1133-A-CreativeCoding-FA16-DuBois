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

// timer variables
var NOW = 0;
var SOON = 60;
var MIDNIGHT = 60*60*24; // how many seconds are in a day
var INTERVAL = 60; // how fast we going

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
  dostoptimes();
  drawscale = 1.;
  drawtx = width/2;
  drawty = height/2;
}

function draw() {
  background(0);
  
  stroke(255);
  noFill();
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

function dostoptimes()
{
  // go through the entire line file:
  // start at 1 because skip the key:
  for(var i =  1;i<stoptimefile.length;i++)
  {
    if(stoptimefile[i].search('WKD')>-1) // if 'WKD' is in the line...
    {
      var thestuff = stoptimefile[i].split(',');
      var newstop = {};
      
      // parse the time
      var departure = thestuff[2].split(':'); // get me HH MM SS
      var thetime = 0;
      thetime+=parseInt(departure[0])*3600; // hours
      thetime+=parseInt(departure[1])*60; // minutes
      thetime+=parseInt(departure[2])*1; // seconds
      newstop.departure = thetime;
      newstop.stopname = thestuff[3];
      stoptimes.push(newstop);
    }
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
  // draw the stops
  for(var i =  0;i<stops.length;i++)
  {
    var pos = mtascale(stops[i]);
    ellipse(pos.x, pos.y, 5, 5);
    text(stops[i].name, pos.x+10, pos.y);
  }
  
  // draw the trains
  stroke(255, 255, 0);
  fill(255, 128, 0);
  for(var i = 0;i<stoptimes.length;i++)
  {
    if(stoptimes[i].departure>=NOW && stoptimes[i].departure<=SOON)
    {
      for(var j=0;j<stops.length;j++)
      {
        if(stoptimes[i].stopname==stops[j].id)
        {
          pos = mtascale(stops[j]);
          ellipse(pos.x, pos.y, 40, 40);
        }
      }
    }
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
