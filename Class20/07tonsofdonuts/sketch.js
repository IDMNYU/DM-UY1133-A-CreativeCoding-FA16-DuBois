var container; // this represents the canvas

var renderer; // this represent the world / renderer
var camera; // this is a viewport
var scene; // this is a list of things to render

var controls; // this is the trackball

var donuts; // this is all the fucking toruses

var particle1, particle2, particle4, particle4, particle5, particle6,
			light1, light2, light3, light4, light5, light6;
			
var FAR = 3000;

var clock = new THREE.Clock();

var showmesh = false;
var whichgeometry = 0;

init(); // kick off everything (equiv to setup())
animate(); // start animating (equivish to draw())

function init() {
  setupCamera(); // get the camera happening
  makeScene(); // lights, textures, materials, objects
  setupRenderer(); // the main renderer
  addToWebPage(renderer); // add the WebGL to the web page

	window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener('keypress', onDocumentKeyPressed, false); 
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

	var time = Date.now() * 0.00025;
	var z = 20, d = 150;
	
	donuts.rotation.x+=0.0011;
	donuts.rotation.y+=0.001;
	donuts.rotation.z+=0.0009;
	
	for(var i = 0;i<donuts.children.length;i++)
	{
	  var tmp = donuts.children[i];
  	tmp.rotation.x-=0.0041;
  	tmp.rotation.y-=0.004;
  	tmp.rotation.z-=0.0039;
	}

	light1.position.x = Math.sin( time * 0.7 ) * d;
	light1.position.z = Math.cos( time * 0.3 ) * d;

	light2.position.x = Math.cos( time * 0.3 ) * d;
	light2.position.z = Math.sin( time * 0.7 ) * d;

	light3.position.x = Math.sin( time * 0.7 ) * d;
	light3.position.z = Math.sin( time * 0.5 ) * d;

	light4.position.x = Math.sin( time * 0.3 ) * d;
	light4.position.z = Math.sin( time * 0.5 ) * d;

	light5.position.x = Math.cos( time * 0.3 ) * d;
	light5.position.z = Math.sin( time * 0.5 ) * d;

	light6.position.x = Math.cos( time * 0.7 ) * d;
	light6.position.z = Math.cos( time * 0.5 ) * d;

	controls.update( clock.getDelta() );

	renderer.render( scene, camera );
	
}

function setupCamera()
{
  // camera stuff:
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, FAR );
	camera.position.set( 0, 15, 350 );
	camera.lookAt( new THREE.Vector3() );
}

function setupRenderer()
{
	// RENDERER

	renderer = new THREE.WebGLRenderer( { antialias: false } );
	//renderer.setClearColor( scene.fog.color );
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
}

function makeScene()
{
  // set up the scene graph:
	scene = new THREE.Scene();
//	scene.fog = new THREE.Fog( 0x040306, 10, FAR );

	var fly = false;

	if ( !fly ) {

		controls = new THREE.TrackballControls( camera );
		controls.target.set( 0, 0, 0 );

		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;

		controls.noZoom = false;
		controls.noPan = false;

		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.15;

		controls.keys = [ 65, 83, 68 ];

	} else {

		controls = new THREE.FirstPersonControls( camera );

		controls.movementSpeed = 25;
		controls.lookSpeed = 0.05;
		controls.lookVertical = true;

		controls.lon = -90;

	}


	// TEXTURES

	var texture = THREE.ImageUtils.loadTexture( './data/UV_Grid_Sm.jpg' );
	texture.repeat.set( 20, 10 );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.format = THREE.RGBFormat;


	// MATERIALS

	var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );
	//var objectMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0xffffff, metal: true, map: texture2 } );
	var objectMaterial = new THREE.MeshPhongMaterial( { color: 0xfffffff, specular: 0xffffff } );

	// GROUND

// 	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 800, 400, 2, 2 ), groundMaterial );
// 	mesh.position.y = -5;
// 	mesh.rotation.x = - Math.PI / 2;
// 	scene.add( mesh );

	// OBJECTS

	donuts = new THREE.Object3D();
	scene.add( donuts );

	var objectGeometry = new THREE.TorusGeometry( 10, 3, 8, 16 );

	for ( var i = 0; i < 500; i ++ ) {

		var mesh = new THREE.Mesh( objectGeometry, objectMaterial );

		mesh.position.x = 200 * ( 0.5 - Math.random() );
		mesh.position.y = 200 * ( 0.5 - Math.random() );
		mesh.position.z = 200 * ( 0.5 - Math.random() );

		mesh.rotation.y = 3.14 * ( 0.5 - Math.random() );
		mesh.rotation.x = 3.14 * ( 0.5 - Math.random() );

		mesh.matrixAutoUpdate = true;
		mesh.updateMatrix();
		donuts.add( mesh );

	}

	// LIGHTS

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	var intensity = 2.5;
	var distance = 100;
	var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
	//var c1 = 0xffffff, c2 = 0xffffff, c3 = 0xffffff, c4 = 0xffffff, c5 = 0xffffff, c6 = 0xffffff;

	var sphere = new THREE.SphereGeometry( 4, 16, 8 );

	light1 = new THREE.PointLight( c1, intensity, distance );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
	scene.add( light1 );

	light2 = new THREE.PointLight( c2, intensity, distance );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
	scene.add( light2 );

	light3 = new THREE.PointLight( c3, intensity, distance );
	light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
	scene.add( light3 );

	light4 = new THREE.PointLight( c4, intensity, distance );
	light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
	scene.add( light4 );

	light5 = new THREE.PointLight( c5, intensity, distance );
	light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
	scene.add( light5 );

	light6 = new THREE.PointLight( c6, intensity, distance );
	light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
	scene.add( light6 );

	var dlight = new THREE.DirectionalLight( 0xffffff, 0.1 );
	dlight.position.set( 0.5, -1, 0 ).normalize();
	scene.add( dlight );
	

}

// STUFF BELOW HERE YOU DON'T CHANGE OFTEN:

// this resets the camera and renderer 
// when you resize the window:
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();
}

// add to web page:
function addToWebPage(_r)
{
  // makes the html container for the canvas:
	container = document.createElement( 'div' );
	document.body.appendChild( container );
  // add the renderer as a webGL canvas to the webpage:
	container.appendChild( _r.domElement );

}

function onDocumentMouseDown()
{
}

function onDocumentKeyPressed(event)
{
  var keyCode = event.which; 
  
  if(keyCode==32) {
    whichgeometry = (whichgeometry+1) % 3;
    for(var i = 0;i<donuts.children.length;i++)
    {
      var tmp = donuts.children[i]; // pass by reference
      if(whichgeometry==0) tmp.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    	else if(whichgeometry==1) tmp.geometry = new THREE.SphereGeometry( 10, 20, 20 );
    	else if(whichgeometry==2) tmp.geometry = new THREE.TorusGeometry( 10, 3, 8, 16 );
    }  
    
  }
  if(keyCode==119) {
      showmesh = !showmesh;
      for(var i = 0;i<donuts.children.length;i++)
      {
        var tmp = donuts.children[i]; // pass by reference
        tmp.material.wireframe = showmesh;
      }
  }

}
