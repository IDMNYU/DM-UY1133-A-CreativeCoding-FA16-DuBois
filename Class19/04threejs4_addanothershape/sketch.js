var container; // this represents the canvas

var renderer; // this represent the world / renderer
var camera; // this is a viewport
var scene; // this is a list of things to render

init(); // kick off everything (equiv to setup())
animate(); // start animating (equivish to draw())

var fc = 0; // frame counter

var thesphere; // global variable for sphere
var sdist; // how far from the donut is the sphere?
var sangle; // what's the angle?

var redlight, greenlight, bluelight; // global vars for lights
var rww, gww, bww;

function init() {
  
  setupCamera(); // get the camera happening
  makeScene(); // lights, textures, materials, objects
  setupRenderer(); // tell the main renderer what to do
  addToWebPage(renderer); // add the WebGL to the web page

}

// THE ANIMATE FUNCTION GETS THE RENDERER MOVING:
function animate() {
  // hey, web browser, when you reload a new frame:
	requestAnimationFrame( animate );

  // run the renderer:
	render();

}

// THE RENDER() FUNCTION ACTUALLY DOES THE DRAWING
// FRAME BY FRAME... EQUIV TO DRAW() IN P5:
function render() {
  
  for(var i = 0;i<scene.children.length;i++)
  {
    var object = scene.children[i];
    object.rotation.x = fc * 0.05;
    object.rotation.y = fc * 0.02;
    object.rotation.z = fc * 0.03;
  }
  
  // orbit the sphere
  var s_x = sdist*Math.cos(sangle);
  var s_z = sdist*Math.sin(sangle);
  thesphere.position.set(s_x, 0, s_z);
  sangle += 0.025;
  
  // tweak the lights
  redlight.intensity+=rww;
  greenlight.intensity+=gww;
  bluelight.intensity+=bww;
  if(redlight.intensity>10) rww*=-1;
  if(greenlight.intensity>10) gww*=-1;
  if(bluelight.intensity>10) bww*=-1;
  if(redlight.intensity<0) rww*=-1;
  if(greenlight.intensity<0) gww*=-1;
  if(bluelight.intensity<0) bww*=-1;

  // THIS DOES THE DRAWING:
	renderer.render( scene, camera );
	
	fc++;

}

// this adds everything to the scene:
function makeScene()
{
  // set up the scene graph:
	scene = new THREE.Scene();

  // placeholder variables for a single light and an object:
	var light, object;

  // ambient light goes EVERYWHERE.  the result is 
  // to multiply every color in the scene with the ambient
  // light color:
  // YOU NEED ONE LIGHT:
  light = new THREE.AmbientLight( 0x333333 );
	scene.add( light );

  // direction light shines on one spot:
	redlight = new THREE.DirectionalLight( 0xff0000, 1 );
	redlight.position.set( 0, -1, 0 );
	scene.add( redlight );
	greenlight = new THREE.DirectionalLight( 0x00ff000, 1 );
	greenlight.position.set( 0, 1, 0 );
	scene.add( greenlight );
	bluelight = new THREE.DirectionalLight( 0x0000ff, 1 );
	bluelight.position.set( 1, 0, 0 );
	scene.add( bluelight );
	
	rww = 0.1;
	gww = -0.05;
	bww = 0.32;

  // texture consists of an image, an image mapping scheme, and a resolution:
  // load a picture:

	var thetexture = new THREE.TextureLoader().load( './data/derp_romney.png' );
  // tell the texture to repeat:
	thetexture.wrapS = thetexture.wrapT = THREE.RepeatWrapping;
	// resolution of the texture:
	thetexture.anisotropy = 16;

  // this binds the texture to a material:
	//var material = new THREE.MeshLambertMaterial( { wireframe: true, map: thetexture, side: THREE.DoubleSide } );
	var material = new THREE.MeshLambertMaterial( { map: thetexture, side: THREE.DoubleSide } );

	// ADD ALL THE 3D DATA AS OBJECTS TO THE SCENE:

	object = new THREE.Mesh( new THREE.TorusGeometry( 50, 20, 20, 20 ), material );
	object.position.set( 0, 0, 0 );
	scene.add( object );

  var sradius = 50;
  var wsegs = 20;
  var hsegs = 20;
  sdist = 200; // assign it here
  sangle = 0;
	thesphere = new THREE.Mesh( new THREE.SphereGeometry( sradius, wsegs, hsegs ), material );
	thesphere.position.set( sdist, 0, 0 );
	scene.add( thesphere );

}

//
// THESE FUNCTIONS MIGHT BE TWEAKED:
//

function setupCamera()
{
  // camera stuff:
  var fieldofview = 45;
  var aspectratio = window.innerWidth / window.innerHeight;
  var near_clip = 1;
  var far_clip = 2000;
  // set up the camera based on the stuff above:
	camera = new THREE.PerspectiveCamera( fieldofview, aspectratio, near_clip, far_clip );
  // camera lookat and position:
  camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 800;
	camera.lookAt( 0, 0, 0 );
}

function setupRenderer()
{
  // THIS IS THE MAIN EVENT OF THE RENDERER:
  
  // initialize the render:
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
}

//
// THESE FUNCTIONS ARE ALMOST NEVER TWEAKED:
//

// this adds the webGL to the web page:
function addToWebPage(_r)
{
  // makes the container for the canvas:
	container = document.createElement( 'div' );
	document.body.appendChild( container );
  // add the renderer as a webGL canvas to the webpage:
	container.appendChild( _r.domElement );
	// add the callback function for resizing the window:
	window.addEventListener( 'resize', onWindowResize, false );
  
}

// this resets the camera and renderer 
// when you resize the window:
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

