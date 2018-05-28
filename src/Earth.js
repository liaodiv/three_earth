earth = {
	radius: 300,
	zindex: 1,
	//fun: Math.PI / (4 * this.zindex) ,
	fun:4 ,
	mymesh:Array(),
	//center://new THREE.Vector3(0,0,0),
	drawOne: function (long, lat) {
		var x = parseInt(num / 4);
		var y = num % 4;
		// 90 -
		var Lat = Math.PI / 2 - y * this.fun;
		//  -180 开始加
		var long = -Math.PI + x * this.fun;

		//var point1= new THREE.Vector3(this.radius * Math)

	},
	setIndex:function(index) {
		this.zindex = index;
		this.fun = 2 * Math.pow(2,index);
		this.mymesh.forEach(function(value){
			value.geometry.dispose();
			scene.remove(value)
		});
		this.mymesh = [];
	}
	,
	longlatToxyz: function (lng, lat) {
		var R = this.radius;

		var lng1 = lng * Math.PI;
		var lat1 = lat * Math.PI;
		/*return {
			x: R * Math.cos(lng) * Math.cos(lat),
			y: R * Math.sin(lng) * Math.cos(lat),
			z: R * Math.sin(lat)
		}*/
		return new THREE.Vector3(
			R * Math.cos(lng1) * Math.cos(lat1),
			R * Math.sin(lng1) * Math.cos(lat1),
			R * Math.sin(lat1)
		)
	},
	cratelglat: function () {
		var that = this;
		//从北极点开始
		var point = {
			long: -1,
			lat: 1 / 2
		}
		var loader = new THREE.TextureLoader().load('src/textures/UV_Grid_Sm.jpg');
		var material = new THREE.MeshPhongMaterial({map: loader, side: THREE.DoubleSide});


		var t0 = new THREE.Vector2(0, 0);//图片左下角
		var t1 = new THREE.Vector2(1, 0);//图片右下角
		var t2 = new THREE.Vector2(0, 1);
		var t3 = new THREE.Vector2(1, 1);//图片右上角

		for (var i = 0; i < 2 * that.fun ; i++) {
			for (var j = 1; j <= ( this.fun) ; j++) {
				//console.log(i, j,this.zindex,this.fun);
				(function fun(lon,lat) {
					var geometry = that.oneToFour(point.long + lon / that.fun, point.lat - lat /that.fun);

					geometry.faceVertexUvs[0].push(
						[t0, t1, t2],
						[t1, t3, t2]
					)

					var grid = new THREE.Mesh(
						geometry,
						material
					)
					that.mymesh.push(grid);
					scene.add(grid)
				})(i,j)

			}
			//this.picture(geometry,i,function (mesh) {scene.add(mesh);})
		}

	},
	oneToFour: function (long, lat) {
		var geometry = new THREE.Geometry();
		//起点开始顺时针计算
		var length = 1 / this.fun;
		geometry.vertices.push(
			this.longlatToxyz(long, lat),
			this.longlatToxyz(long + length, lat),
			this.longlatToxyz(long + length, lat + length),
			this.longlatToxyz(long, lat + length)
		)
		geometry.faces.push(new THREE.Face3(0, 1, 3));
		geometry.faces.push(new THREE.Face3(1, 2, 3));
		/*geometry.faces.push(new THREE.Face3(2,1,0));
		geometry.faces.push(new THREE.Face3(3,2,0));*/

		/*	var grid = new THREE.Mesh(
				geometry,
				new THREE.MeshBasicMaterial({color:0X0000FF})
			)
			scene.add(grid)*/

		return geometry;

	},
	render: function () {
		this.cratelglat();
	}
	//贴图

}



buttonView ={
	add:document.getElementById('add'),
	reduce:document.getElementById('reduce'),
	reset:document.getElementById('reset')

}

contorl = {
	start:function () {
		buttonView.add.addEventListener("click",function (e) {
			earth.setIndex(earth.zindex + 1);
			earth.render();
			console.log(earth.fun,earth.zindex)

		})
		buttonView.reduce.addEventListener("click",function (ev) {
			earth.setIndex(earth.zindex - 1);
			earth.render();
			console.log(earth.fun,earth.zindex)
		})
		buttonView.reset.addEventListener("click",function (ev) {
			earth.setIndex(1);
			earth.render();
		})
	}
}

contorl.start()
//earth.cratelglat();