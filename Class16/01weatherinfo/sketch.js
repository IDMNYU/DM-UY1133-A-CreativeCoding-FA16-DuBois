var w;

var baseurl = 'http://api.openweathermap.org/data/2.5/weather'; // API endpoint
var city = 'San Jose, Costa Rica';
var appid = 'APPID=7bbbb47522848e8b9c26ba35c226c734';
var units = 'units=imperial'

function preload() {
  var url = baseurl+'?q='+city+'&'+units+'&'+appid;
  w = loadJSON(url);
}

function setup() {
  createCanvas(400, 400);
//  noLoop();
}

function draw() {
  background(255);

  if(w.weather)
  {
    text(city, 20, 20);
    text(w.weather[0].description, 20, 40);
    text(w.main.temp + ' deg. Fahrenheit', 20, 60);
    text(w.coord.lat + " by " + w.coord.lon, 20, 80);
  }
  else
  {
    text("something is amiss!", 20, 40);
  }
  
  
}