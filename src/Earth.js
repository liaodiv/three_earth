 earth = {
	radius:300,
	fun:Math.PI/4,
	//center://new THREE.Vector3(0,0,0),
	drawOne:function (long,lat) {
		var x = parseInt(num / 4);
		var y = num % 4;
		// 90 -
		var Lat = Math.PI / 2 - y * this.fun;
		//  -180 开始加
		var long = - Math.PI + x * this.fun;

		//var point1= new THREE.Vector3(this.radius * Math)

	},
	longlatToxyz:function (lng,lat) {
		var R= this.radius;
		/*return {
			x: R * Math.cos(lng) * Math.cos(lat),
			y: R * Math.sin(lng) * Math.cos(lat),
			z: R * Math.sin(lat)
		}*/
		return new THREE.Vector3(
			R * Math.cos(lng) * Math.cos(lat),
			R * Math.sin(lng) * Math.cos(lat),
			R * Math.sin(lat)
		)
	},
	cratelglat:function () {
		//从北极点开始
		var point ={
			long:- Math.PI,
			lat:Math.PI / 2
		}
		var loader = new THREE.TextureLoader().load( 'src/textures/UV_Grid_Sm.jpg' );
		var material = new THREE.MeshPhongMaterial( { map: loader, side: THREE.DoubleSide } );


		var t0 = new THREE.Vector2(0,0);//图片左下角
		var t1 = new THREE.Vector2(1,0);//图片右下角
		var t2 = new THREE.Vector2(0,1);
		var t3 = new THREE.Vector2(1,1);//图片右上角

		for(var i=0;i<8;i++){
			for(var j=1;  j <= 4 ;j++) {
				console.log(i,j);
				var geometry = this.oneToFour(point.long + i*this.fun ,point.lat - j * this.fun);

				geometry.faceVertexUvs[0].push(
					[t0, t1, t2],
					[t1, t3, t2]
				)

				var grid = new THREE.Mesh(
					geometry,
					material
				)
				scene.add(grid)
			}
			//this.picture(geometry,i,function (mesh) {scene.add(mesh);})
		}

	},
	oneToFour:function (long,lat) {
		var geometry = new THREE.Geometry();
		//起点开始顺时针计算
		var length =this.fun;
		geometry.vertices.push(
			this.longlatToxyz(long,lat),
			this.longlatToxyz(long + length,lat),
			this.longlatToxyz(long + length,lat + length),
			this.longlatToxyz(long,lat + length)
		)
		geometry.faces.push(new THREE.Face3(0,1,3));
		geometry.faces.push(new THREE.Face3(1,2,3));
		/*geometry.faces.push(new THREE.Face3(2,1,0));
		geometry.faces.push(new THREE.Face3(3,2,0));*/

	/*	var grid = new THREE.Mesh(
			geometry,
			new THREE.MeshBasicMaterial({color:0X0000FF})
		)
		scene.add(grid)*/

		return geometry;

	},
	render:function () {
		this.cratelglat();
	}
	//贴图

}

//earth.cratelglat();