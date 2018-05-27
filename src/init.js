if( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer, stats;
init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.y = 400;
	scene = new THREE.Scene();
	var light, object;
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );

	var map = new THREE.TextureLoader().load( 'src/textures/UV_Grid_Sm.jpg' );
	map.wrapS = map.wrapT = THREE.RepeatWrapping;
	map.anisotropy = 16;
	var material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );

	earth.render();


	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( 0,  0 , 0 ),
		new THREE.Vector3( 100, 0 , 0 ),
		new THREE.Vector3(  100, 100 ,0 ),
		new THREE.Vector3( 0 , 100 , 0 )
	);
	geometry.faces.push(new THREE.Face3(0,1,3));
	geometry.faces.push(new THREE.Face3(1,2,3));


	var t0 = new THREE.Vector2(0,0);//图片左下角
	var t1 = new THREE.Vector2(1,0);//图片右下角
	var t2 = new THREE.Vector2(0,1);
	var t3 = new THREE.Vector2(1,1);//图片右上角
	//var t3 = new THREE.Vector2(0,1);//图片左上角

	geometry.faceVertexUvs[0].push(
		[t0,t1,t2],
		[t1,t3,t2]
	)


	object = new THREE.Mesh( geometry, material);
	object.position.set(0,0,200);
	scene.add(object);

	/*object = new THREE.Mesh( new THREE.TetrahedronBufferGeometry( 75, 0 ), material );
	object.position.set( 300, 0, 200 );
	scene.add( object );*/


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	stats = new Stats();
	document.body.appendChild( stats.dom );
	//
	window.addEventListener( 'resize', onWindowResize, false );

}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}
function render() {
	var timer = Date.now() * 0.0001;
	camera.position.x = Math.cos( timer ) * 800;
	camera.position.z = Math.sin( timer ) * 800;
	camera.lookAt( scene.position );
	scene.traverse( function( object ) {
		if ( object.isMesh === true ) {
			object.rotation.x = timer * 5;
			object.rotation.y = timer * 2.5;
		}
	} );
	renderer.render( scene, camera );
}