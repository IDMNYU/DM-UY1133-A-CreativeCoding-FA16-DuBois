var r;

var baseurl = 'https://data.cityofnewyork.us/resource/9w7m-hzhe.json'; // API endpoint

var geocodeurl = 'https://maps.googleapis.com/maps/api/geocode/json?address='; // URL for google geocoding

var whichrestaurant = 0;

var AREWEREADY = false;

var LATMAX = -180;
var LATMIN = 180;
var LONGMAX = -180;
var LONGMIN = 180;


function preload() {
  var url = baseurl+'?$limit=100';
  r = loadJSON(url); // grab the stuff
}

function dogeocode()
{
  var url = geocodeurl + r[whichrestaurant].building + ' ' + r[whichrestaurant].street + ' ' + r[whichrestaurant].zipcode;
  loadJSON(url, parsetherat);
}

function parsetherat(v)
{
  r[whichrestaurant].lat = v.results[0].geometry.location.lat;
  r[whichrestaurant].long = v.results[0].geometry.location.lng;
  if(r[whichrestaurant].lat<LATMIN) LATMIN = r[whichrestaurant].lat;
  if(r[whichrestaurant].lat>LATMAX) LATMAX = r[whichrestaurant].lat;
  if(r[whichrestaurant].long<LONGMIN) LONGMIN = r[whichrestaurant].long;
  if(r[whichrestaurant].long>LONGMAX) LONGMAX = r[whichrestaurant].long;
  

  background(255);
  text("geocoded: " + whichrestaurant, 20, 40);
  text("geocoded: " + r[whichrestaurant].dba, 20, 60);
  text("geocoded: " + r[whichrestaurant].lat + " by " + r[whichrestaurant].long, 20, 80);

  
  whichrestaurant++;
  if(whichrestaurant<r.length) {
    dogeocode();
  }
  else {
    AREWEREADY=true;
    loop();
  }
}

function setup() {
  createCanvas(800, 600);
//  noLoop();
  frameRate(5);
  console.log("hi there");
  console.log(r);
}

function draw() {
  background(255);
  if(AREWEREADY==false)
  {
    noLoop();
    dogeocode();
  }
  else {
    
    for(var i = 0;i<r.length;i++)
    {
      var x = map(r[i].long, LONGMIN, LONGMAX, height-20, 20);
      var y = map(r[i].lat, LATMIN, LATMAX, 20, width-20);
      fill(255, 0, 0);
      ellipse(x, y, 5, 5);
      fill(0);
      textAlign(CENTER);
      text(r[i].dba, x, y);
    }
    
    
    // text("we are ready!", 20, 20); 
    // text("LAT: " + LATMIN + " " + LATMAX, 20, 40);
    // text("LONG: " + LONGMIN + " " + LONGMAX, 20, 60);
    
    
  }


  // var d = r[whichrestaurant].dba;
  // text(d, 20, 20);
  // if(r[whichrestaurant].violation_description) {
  //   var s = r[whichrestaurant].violation_description;
  //   text(s, 20, 40);
  // }

  // whichrestaurant = (whichrestaurant+1)%(r.length);
}