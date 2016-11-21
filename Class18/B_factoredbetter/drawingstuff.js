function drawthestuff()
{
  
  // this draws lines:
  stroke(0, 128, 255);
  for(var i =  0;i<lines.length;i++)
  {
    var l = lines[i].name.slice(0, lines[i].name.indexOf('.'));
    checkcolor2(l);
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
  noFill();
  strokeWeight(5);
  for(var i = 0;i<stoptimes.length;i++)
  {
    if(stoptimes[i].departure>=NOW && stoptimes[i].departure<=SOON)
    {
      for(var j=0;j<stops.length;j++)
      {
        if(stoptimes[i].stopname==stops[j].id)
        {
          pos = mtascale(stops[j]);
          checkcolor(stoptimes[i].trip_id);
          ellipse(pos.x, pos.y, 40, 40);
        }
      }
    }
  }
}

function checkcolor2(id)
{
  for(var i in routecolors)
  {
    if(i==id) stroke(routecolors[i]);
  }
}

function checkcolor(id)
{
  for(var i in routecolors)
  {
    if(id.indexOf('_'+i+'.')>-1)
    {
      stroke(routecolors[i]);
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
