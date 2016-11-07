var result;

function preload() {
  result = loadStrings('http://lukedubois.com', finished());

  
}

function finished(v)
{
  console.log(result);
  console.log("finished");
}

function setup() {
  //console.log(result);
  
}

function draw() {
  
}