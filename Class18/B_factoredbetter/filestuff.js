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
      //console.log('adding...' + newline.name);
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
      newstop.trip_id = thestuff[0];
      stoptimes.push(newstop);
    }
  }
}

function doroutes()
{
  for(var i =  1;i<routefile.length;i++)
  {
    var r = routefile[i].slice(0,routefile[i].indexOf(','));
    var c = routefile[i].slice(routefile[i].lastIndexOf(',')-6, routefile[i].lastIndexOf(','));
    if(c=='r.pdf,') c='FFFFFF'; // hack
    routecolors[r] = color('#'+c);
  }  
}
