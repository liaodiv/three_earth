var camera,scene,renderer;

var cameraControls;
var clock = new THREE.Clock();
//初始化场景
function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;

	var canvasRatio = canvasWidth/canvasHeight;
	camera = new THREE.PerspectiveCamera(45,canvasRatio,0.1 , 20000);
	camera.position.set(-600,1000,2000);
	fillScecne();




	drawGround();

	renderer = new THREE.WebGLRenderer({ antialias : true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth,canvasHeight);
	document.body.appendChild(renderer.domElement);
	cameraControls = new THREE.OrbitAndPanControls(camera,renderer.domElement);
	cameraControls.target.set(0,400,0);

	renderer.setClearColor(scene.fog.color,1);
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	fillScecne();
	renderer.render(scene,camera);
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function createDemo() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
}

function drawGround() {
	//params = params || {};
	var size = 100;
	var color = 0xFFFFFF;
	var ground = new THREE.Mesh(
		new THREE.PlaneGeometry(size, size),
		// When we use a ground plane we use directional lights, so illuminating
		// just the corners is sufficient.
		// Use MeshPhongMaterial if you want to capture per-pixel lighting:
		// new THREE.MeshPhongMaterial({ color: color, specular: 0x000000,
		new THREE.MeshLambertMaterial({ color: color,
			// polygonOffset moves the plane back from the eye a bit, so that the lines on top of
			// the grid do not have z-fighting with the grid:
			// Factor == 1 moves it back relative to the slope (more on-edge means move back farther)
			// Units == 4 is a fixed amount to move back, and 4 is usually a good value
			polygonOffset: true, polygonOffsetFactor: 1.0, polygonOffsetUnits: 4.0
		}));
	ground.rotation.x = - Math.PI / 2;

	scene.add(ground);
}
function TestGeometry(y) {
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( 0,  0 + y, 0 ),
		new THREE.Vector3( 400, 0 + y, 0 ),
		new THREE.Vector3(  400, 400 + y,0 ),
		new THREE.Vector3( 0 , 400 + y, 0 )

	);
	//geometry.faces.push(new THREE.Face3(0,1,2));

	geometry.faces.push(new THREE.Face3(0,1,3));
	geometry.faces.push(new THREE.Face3(1,2,3));


	/*var geometry = new THREE.CircleGeometry(400,32,0,Math.PI * 2  );
   */

	var grid = new THREE.Mesh(
		geometry,
		new THREE.MeshBasicMaterial({color:0x0000FF})
	)
	scene.add(grid);

}
function fillScecne() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 3000, 6000 );
	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );
	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 400, 500 );

	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -400, 200, -300 );

	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);
	//drawGround();
	//TestGeometry(100);
	///earth.render();


}

try {
	init();
	animate();
	//createDemo();
	drawGround();
} catch (e) {
	console.error('程序运行有误',e)
}