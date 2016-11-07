var r;

var baseurl = 'https://data.cityofnewyork.us/resource/9w7m-hzhe.json'; // API endpoint

var whichrestaurant = 0;

function preload() {
  var url = baseurl;
  r = loadJSON(url);
}

function setup() {
  createCanvas(400, 400);
//  noLoop();
  console.log(r);
  frameRate(5);
}

function draw() {
  background(255);

  var d = r[whichrestaurant].dba;
  text(d, 20, 20);
  if(r[whichrestaurant].violation_description) {
    var s = r[whichrestaurant].violation_description;
    text(s, 20, 40);
  }

  whichrestaurant = (whichrestaurant+1)%(r.length);
}