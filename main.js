
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

        camera = new THREE.OrthographicCamera(-120, +120, +67.5, -67.5, 1, 150);
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
        starring.body.position.x = 1300;
        starring.body.position.y = 1300;
        // starring.body.position.z = 10;
        scene.add(starring.body);
        // scene.add(obstacle.mesh);

        // objects.push(obstacle.mesh);
console.log(starring.body.position)

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

        //---------texture------------------------------------
        const texture111 = new Illusttexture({
            texture:'img/1-1-1-2.png',
            width: 580,
            height: 656,
            x: 91,
            y: 328,
            z: 90,
        })
        scene.add(texture111.mesh);
        objects.push(texture111.mesh);

        const texture111b = new Illusttexture({
            texture:'img/1-1-1-3.png',
            width: 580,
            height: 656,
            x: 91,
            y: 328,
            z: 2,
        })
        scene.add(texture111b.mesh);
        objects.push(texture111b.mesh);

        const texture112 = new Illusttexture({
            texture:'img/1-1-2.png',
            width: 25,
            height: 33,
            x: 119,
            y: 655,
            z: 80,
        })
        scene.add(texture112.mesh);
        objects.push(texture112.mesh);

        const texture113f = new Illusttexture({
            texture:'img/1-1-3-1.png',
            width: 100,
            height: 125,
            x: 130,
            y: 700,
            z: 30,
        })
        scene.add(texture113f.mesh);
        objects.push(texture113f.mesh);

        const texture113b = new Illusttexture({
            texture:'img/1-1-3-2.png',
            width: 130,
            height: 130,
            x: 107,
            y: 666.5,
            z: 2,
        })
        scene.add(texture113b.mesh);
        objects.push(texture113b.mesh);

        const texture113 = new Illusttexture({
            texture:'img/1-1-3.png',
            width: 100,
            height: 125,
            x: 130,
            y: 700,
            z: 3,
        })
        scene.add(texture113.mesh);
        objects.push(texture113.mesh);

        const texture114 = new Illusttexture({
            texture:'img/1-1-4.png',
            width: 40,
            height: 50,
            x: 120,
            y: 660,
            z: 0,
        })
        scene.add(texture114.mesh);
        objects.push(texture114.mesh);

        const texture121 = new Illusttexture({
            texture:'img/1-2-1.png',
            width: 580,
            height: 658,
            x: 230,
            y: 328,
            z: 89,
        })
        scene.add(texture121.mesh);
        objects.push(texture121.mesh);

        const texture122 = new Illusttexture({
            texture:'img/1-2-2.png',
            width: 200,
            height: 200,
            x: 270,
            y: 254,
            z: 91,
        })
        scene.add(texture122.mesh);
        objects.push(texture122.mesh);

        const texture1221 = new Illusttexture({
            texture:'img/1-2-2.png',
            width: 200,
            height: 200,
            x: 460,
            y: 254,
            z: 91,
        })
        scene.add(texture1221.mesh);
        objects.push(texture1221.mesh);

        const texture1222 = new Illusttexture({
            texture:'img/1-2-2.png',
            width: 200,
            height: 200,
            x: 650,
            y: 254,
            z: 91,
        })
        scene.add(texture1222.mesh);
        objects.push(texture1222.mesh);

        const texture1223 = new Illusttexture({
            texture:'img/1-2-2.png',
            width: 200,
            height: 200,
            x: 840,
            y: 254,
            z: 91,
        })
        scene.add(texture1223.mesh);
        objects.push(texture1223.mesh);

        const textureNA1 = new Illusttexture({
            texture:'img/NA-1.png',
            width: 300,
            height: 550,
            x: 560,
            y: 451,
            z: 4,
        })
        scene.add(textureNA1.mesh);
        objects.push(textureNA1.mesh);

        const ImgBack = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 500,
            y: 395,
            z: -1,
        })
        scene.add(ImgBack.mesh);
        objects.push(ImgBack.mesh);

        const ImgBack_2 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 900,
            y: 395,
            z: -1,
        })
        scene.add(ImgBack_2.mesh);
        objects.push(ImgBack_2.mesh);

        const ImgBack_3 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 1300,
            y: 395,
            z: -1,
        })
        scene.add(ImgBack_3.mesh);
        objects.push(ImgBack_3.mesh);

        //Nルートへの階段
        const nStep = new Illusttexture({
            texture:'img/nStep.png',
            width: 460,
            height: 460,
            x: 1000,
            y: 410,
            z: 3,
        })
        scene.add(nStep.mesh);
        objects.push(nStep.mesh);
    

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
       



