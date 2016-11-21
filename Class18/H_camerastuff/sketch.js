var cam;

function setup() {
  createCanvas(800, 600);
  cam = createCapture(VIDEO);
  cam.size(40, 40);
  cam.hide();
}

function draw() {
  background(0);
  cam.loadPixels();
  console.log(cam.width + " " + cam.height);
  // for(var i = 0;i<cam.width;i++)
  // {
  //   for(var j = 0;j<cam.height;j++)
  //   {
  //     var c = cam.get(i, j);
  //     var avg = (c[0]+c[1]+c[2])/3;
  //     cam.set(i,j, color(avg, avg, avg));
  //   }
  // }
  
  cam.updatePixels();

  image(cam, 0, 0, width, height);
}

function keyPressed()
{

}