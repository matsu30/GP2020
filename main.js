
//---------素材並べる----------------------

var camera, scene, light, renderer;

var objects = [];

var vertex = new THREE.Vector3();
var color = new THREE.Color();

const starring = new Starring();
// const obstacle = new Obstacle({
//     x: 20,
//     y: 0,
//     z: 0
// });

// console.log(obstacle);


//---------素材並べた----------------------

init();
animate();

function init() {

        camera = new THREE.OrthographicCamera(-120, +120, +67.5, -67.5, 1, 100);
        camera.position.z = 100;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

        light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        starring.load();
        // starring.body.position.x = 20;
        // starring.body.position.y = 640;
        starring.body.position.x = 900;
        starring.body.position.y = 300;
        scene.add(starring.body);
        // scene.add(obstacle.mesh);

        // objects.push(obstacle.mesh);


        //--------開始-----------------------------------------------------------

        //ボタンを押す
        var onKeyDown = function ( event ) {

            switch ( event.keyCode ) {

                // case 38: // up
                // case 87: // w
                //     starring.moveForward = true;
                //     break;

                case 37: // left
                case 65: // a
                    starring.moveLeft = true;
                    break;

                // case 40: // down
                // case 83: // s
                //     starring.moveBackward = true;
                //     break;

                case 39: // right
                case 68: // d
                    starring.moveRight = true;
                    break;

                case 32: // space
                    starring.jump();
                    break;

            }

        };

        //ボタンを離す
        var onKeyUp = function ( event ) {

            switch ( event.keyCode ) {

                // case 38: // up
                // case 87: // w
                //     starring.moveForward = false;
                //     break;

                case 37: // left
                case 65: // a
                    starring.moveLeft = false;
                    break;

                // case 40: // down
                // case 83: // s
                //     starring.moveBackward = false;
                //     break;

                case 39: // right
                case 68: // d
                    starring.moveRight = false;
                    break;

            }

        };

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );
    
   
        //--------------床----------------------------------------
　      var floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
        floorGeometry.rotateX( - Math.PI / 2 );


        // 頂点を変える
        var position = floorGeometry.attributes.position;

        for ( var i = 0, l = position.count; i < l; i ++ ) {

            vertex.fromBufferAttribute( position, i );

            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

            position.setXYZ( i, vertex.x, vertex.y, vertex.z );

        }

        // 各面に一点の頂点がある。
        floorGeometry = floorGeometry.toNonIndexed(); 
        position = floorGeometry.attributes.position;

        var colors = [];
        for ( var i = 0, l = position.count; i < l; i ++ ) {

            color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            colors.push( color.r, color.g, color.b );

        }
        floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
        var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );
        var floor = new THREE.Mesh( floorGeometry, floorMaterial );
        scene.add( floor );


        //--------object--------------------------------------
        // var boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

        // // 各面に一点の頂点があるのは床と同じ。色も同じように定義する。
        // boxGeometry = boxGeometry.toNonIndexed();
        // position = boxGeometry.attributes.position;

        // colors = [];
        // for ( var i = 0, l = position.count; i < l; i ++ ) {

        //     color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        //     colors.push( color.r, color.g, color.b );

        // }
        // boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        // for ( var i = 0; i < 50; i ++ ) {

        //     var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
        //     boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

        //     var box = new THREE.Mesh( boxGeometry, boxMaterial );
        //     box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
        //     box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
        //     box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

        //     scene.add( box );
        //     objects.push( box );

        // }

        const obstacleKeydata = {
            width: 20,
            height: 20,
            depth: 20,
        };

        const maxY = obstacleKeydata.height * (MAP.length - 1);
        const offsetY = obstacleKeydata.height / 2;

        for (let i = 0; i < MAP.length; i++){
            for (let j = 0; j < MAP[0].length; j++){
                const value = MAP[i][j];

                if (value === 1){
                    //障害物を作る
                    const obstacle = new Obstacle({
                        width: obstacleKeydata.width,
                        height: obstacleKeydata.height,
                        depth: obstacleKeydata.depth,
                        x: obstacleKeydata.width * j,
                        y: maxY - obstacleKeydata.height * i + offsetY,
                        z: -10,                        
                    });
                    scene.add(obstacle.mesh);
                    objects.push(obstacle.mesh);
                }

                //console.log(`${i}番目の配列の${j}番目 値は${MAP[i][j]}`)
            }
        }

        const StepObstacleKeydata = {
            width: 20,
            height: 10,
            depth: 20,
        };

        const StepMaxY = StepObstacleKeydata.height * (STEP.length - 1);
        const StepOffsetY = StepObstacleKeydata.height / 2;

        for (let i = 0; i < STEP.length; i++){
            for (let j = 0; j <STEP[0].length; j++){
                const value = STEP[i][j];

                if (value === 1){
                    //障害物を作る
                    const obstacle = new Obstacle({
                        width: StepObstacleKeydata.width,
                        height: StepObstacleKeydata.height,
                        depth: StepObstacleKeydata.depth,
                        x: StepObstacleKeydata.width * j,
                        y: StepMaxY - StepObstacleKeydata.height * i + StepOffsetY,
                        z: -10,                        
                    });
                    scene.add(obstacle.mesh);
                    objects.push(obstacle.mesh);
                }

                //console.log(`${i}番目の配列の${j}番目 値は${STEP[i][j]}`)
            }
        }

        const S1 = new Obstacle({
            height: 60,
            y: 230+440,
        })
        const S2 = new Obstacle({
            height: 5,
            x: 119,
            y: 202+440,
        })
        const S3 = new Obstacle({
            width: 5,
            height: 75,
            x: 153,
            y: 220+440,
        })
        const S4 = new Obstacle({
            width: 52,
            depth: 2,
            x: 130,
            y: 262+440,
        })

        const S5 = new Obstacle({
            width: 30,
            height: 2,
            depth: 2,
            x: 89,
            y: 239+440,
            // z: 80,
            // opacity: 1,
            // color: 0xfff66f,
        })

        scene.add(S1.mesh);
        objects.push(S1.mesh);
        scene.add(S2.mesh);
        objects.push(S2.mesh);
        scene.add(S3.mesh);
        objects.push(S3.mesh);
        scene.add(S4.mesh);
        objects.push(S4.mesh);
        scene.add(S5.mesh);
        objects.push(S5.mesh);

        //---------texture-------------------------------------
        // var texture111  = new THREE.ImageUtils.loadTexture('img/1-1-1-2.png');
        // var Geometry111 = new THREE.PlaneBufferGeometry( 580, 656 );
        // var Material111 = new THREE.MeshBasicMaterial( {map: texture111, transparent: true} );
        // var Img111 = new THREE.Mesh( Geometry111, Material111 );
        // Img111.position.x = 91;
        // Img111.position.y = 328;
        // Img111.position.z = 90;
        // scene.add( Img111 );

        // var texture111b  = new THREE.ImageUtils.loadTexture('img/1-1-1-3.png');
        // var Geometry111b = new THREE.PlaneBufferGeometry( 580, 656 );
        // var Material111b = new THREE.MeshBasicMaterial( {map: texture111b, transparent: true} );
        // var Img111b = new THREE.Mesh( Geometry111b, Material111b );
        // Img111b.position.x = 91;
        // Img111b.position.y = 328;
        // Img111b.position.z = 2;
        // scene.add( Img111b );

        // var texture112  = new THREE.ImageUtils.loadTexture('img/1-1-2.png');
        // var Geometry112 = new THREE.PlaneBufferGeometry( 25, 33 );
        // var Material112 = new THREE.MeshBasicMaterial( {map: texture112, transparent: true} );
        // var Img112 = new THREE.Mesh( Geometry112, Material112 );
        // Img112.position.x = 119;
        // Img112.position.y = 215+440;
        // Img112.position.z = 80;
        // scene.add( Img112 );

        // var texture113f  = new THREE.ImageUtils.loadTexture('img/1-1-3-1.png');
        // var Geometry113f = new THREE.PlaneBufferGeometry( 100, 125 );
        // var Material113f = new THREE.MeshBasicMaterial( {map: texture113f, transparent: true} );
        // var Img113f = new THREE.Mesh( Geometry113f, Material113f );
        // Img113f.position.x = 130;
        // Img113f.position.y = 260+440;
        // Img113f.position.z = 30;
        // scene.add( Img113f );

        // var texture113b  = new THREE.ImageUtils.loadTexture('img/1-1-3-2.png');
        // var Geometry113b = new THREE.PlaneBufferGeometry( 130, 130 );
        // var Material113b = new THREE.MeshBasicMaterial( {map: texture113b, transparent: true} );
        // var Img113b = new THREE.Mesh( Geometry113b, Material113b );
        // Img113b.position.x = 107;
        // Img113b.position.y = 226.5+440;
        // Img113b.position.z = 2;
        // scene.add( Img113b );

        // var texture113  = new THREE.ImageUtils.loadTexture('img/1-1-3.png');
        // var Geometry113 = new THREE.PlaneBufferGeometry( 100, 125 );
        // var Material113 = new THREE.MeshBasicMaterial( {map: texture113, transparent: true} );
        // var Img113 = new THREE.Mesh( Geometry113, Material113 );
        // Img113.position.x = 130;
        // Img113.position.y = 260+440;
        // Img113.position.z = 3;
        // scene.add( Img113 );

        // var texture114  = new THREE.ImageUtils.loadTexture('img/1-1-4.png');
        // var Geometry114 = new THREE.PlaneBufferGeometry( 40, 50 );
        // var Material114 = new THREE.MeshBasicMaterial( {map: texture114, transparent: true} );
        // var Img114 = new THREE.Mesh( Geometry114, Material114 );
        // Img114.position.x = 120;
        // Img114.position.y = 220+440;
        // Img114.position.z = 0;
        // scene.add( Img114 );

        // var texture121  = new THREE.ImageUtils.loadTexture('img/1-2-1.png');
        // var Geometry121 = new THREE.PlaneBufferGeometry( 580, 658 );
        // var Material121 = new THREE.MeshBasicMaterial( {map: texture121, transparent: true} );
        // var Img121 = new THREE.Mesh( Geometry121, Material121 );
        // Img121.position.x = 230;
        // Img121.position.y = 328;
        // Img121.position.z = 89;
        // scene.add( Img121 );

        var texture122  = new THREE.ImageUtils.loadTexture('img/1-2-2.png');
        var Geometry122 = new THREE.PlaneBufferGeometry( 200, 200);
        var Material122 = new THREE.MeshBasicMaterial( {map: texture122, transparent: true} );
        var Img122 = new THREE.Mesh( Geometry122, Material122 );
        Img122.position.x = 270;
        Img122.position.y = 254;
        Img122.position.z = 91;
        scene.add( Img122 );

        var Img1221 = new THREE.Mesh( Geometry122, Material122 );
        Img1221.position.x = 460;
        Img1221.position.y = 254;
        Img1221.position.z = 91;
        scene.add( Img1221 );

        var Img1222 = new THREE.Mesh( Geometry122, Material122 );
        Img1222.position.x = 650;
        Img1222.position.y = 254;
        Img1222.position.z = 91;
        scene.add( Img1222 );

        var Img1223 = new THREE.Mesh( Geometry122, Material122 );
        Img1223.position.x = 840;
        Img1223.position.y = 254;
        Img1223.position.z = 91;
        scene.add( Img1223 );
        
        var textureNA1  = new THREE.ImageUtils.loadTexture('img/NA-1.png');
        var GeometryNA1 = new THREE.PlaneBufferGeometry( 300, 550 );
        var MaterialNA1 = new THREE.MeshBasicMaterial( {map: textureNA1, transparent: true} );
        var ImgNA1 = new THREE.Mesh( GeometryNA1, MaterialNA1 );
        ImgNA1.position.x = 560;
        ImgNA1.position.y = 451;
        ImgNA1.position.z = 4;
        scene.add( ImgNA1 );

        var textureBack  = new THREE.ImageUtils.loadTexture('img/Back01.png');
        var GeometryBack = new THREE.PlaneBufferGeometry( 400, 475 );
        var MaterialBack = new THREE.MeshBasicMaterial( {map: textureBack, transparent: true} );
        var ImgBack = new THREE.Mesh( GeometryBack, MaterialBack );
        ImgBack.position.x = 500;
        ImgBack.position.y = 395;
        ImgBack.position.z = 3;
        scene.add( ImgBack );

        var ImgBack_2 = new THREE.Mesh( GeometryBack, MaterialBack );
        ImgBack_2.position.x = 900;
        ImgBack_2.position.y = 395;
        ImgBack_2.position.z = 3;
        scene.add( ImgBack_2 );

        var ImgBack_3 = new THREE.Mesh( GeometryBack, MaterialBack );
        ImgBack_3.position.x = 1300;
        ImgBack_3.position.y = 395;
        ImgBack_3.position.z = 3;
        scene.add( ImgBack_3 );

        var textureBack3  = new THREE.ImageUtils.loadTexture('img/Back02.png');
        var GeometryBack3 = new THREE.PlaneBufferGeometry( 400, 475 );
        var MaterialBack3 = new THREE.MeshBasicMaterial( {map: textureBack3, transparent: true} );
        var ImgBack3 = new THREE.Mesh( GeometryBack3, MaterialBack3 );
        ImgBack3.position.x = 1000;
        ImgBack3.position.y = 700;
        ImgBack3.position.z = 0;
        scene.add( ImgBack3 );

        // var textureNStep  = new THREE.ImageUtils.loadTexture('img/nStep.png');
        // var GeometryNStep = new THREE.PlaneBufferGeometry( 460, 460 );
        // var MaterialNStep = new THREE.MeshBasicMaterial( {map: textureNStep, transparent: true} );
        // var ImgNStep = new THREE.Mesh( GeometryNStep, MaterialNStep );
        // ImgNStep.position.x = 1000;
        // ImgNStep.position.y = 410;
        // ImgNStep.position.z = 3;
        // scene.add( ImgNStep );

        const Nstep = new Illusttexture({
            texture:'img/nStep.png',
            width: 460,
            depth: 460,
            x: 1000,
            y: 410,
            z: 3,
        })

        scene.add(Nstep.mesh);
        objects.push(Nstep.mesh);


        //---------renderer--------------------------------------
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

};


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


//--------動き--------------------------------------
function animate() {

    requestAnimationFrame( animate );
 
    starring.animate(objects);

    const cameraPosition = starring.body.position.clone().add(new THREE.Vector3(0, 30, 100));
    camera.position.lerp(cameraPosition, 0.2);

    renderer.render( scene, camera );

};
       



