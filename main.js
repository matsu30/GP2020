
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

        // camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
        // camera.position.z = 500;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

        light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        starring.load();
        starring.body.position.x = 700;
        starring.body.position.y = 100;
        // starring.body.position.x = 1500;
        // starring.body.position.y = 10;
        starring.body.position.z = 0;
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

        // const Start1 = new Obstacle({
        //     height: 60,
        //     y: 230+440,
        // })
        const Start2 = new Obstacle({
            height: 5,
            x: 119,
            y: 202+440,
        })
        const Start3 = new Obstacle({
            width: 5,
            height: 75,
            x: 153,
            y: 220+440,
        })
        const Start4 = new Obstacle({
            width: 52,
            depth: 2,
            x: 130,
            y: 262+440,
        })

        const Start5 = new Obstacle({
            width: 30,
            height: 2,
            depth: 2,
            x: 89,
            y: 239+440,
            // z: 80,
            // opacity: 1,
            // color: 0xfff66f,
        })

        // scene.add(Start1.mesh);
        // objects.push(Start1.mesh);
        scene.add(Start2.mesh);
        objects.push(Start2.mesh);
        scene.add(Start3.mesh);
        objects.push(Start3.mesh);
        scene.add(Start4.mesh);
        objects.push(Start4.mesh);
        scene.add(Start5.mesh);
        objects.push(Start5.mesh);

        //---------texture------------------------------------
        const textureBuillding01F = new Illusttexture({
            texture:'img/start01.png',
            width: 205,
            height: 665,
            x: 90,
            y: 330,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.8,
            repeatX: 0.35,
            repeatY: 1,
        })
        scene.add(textureBuillding01F.mesh);
        objects.push(textureBuillding01F.mesh);

        const textureBuillding01B = new Illusttexture({
            texture:'img/back01.png',
            width: 190,
            height: 630,
            x: 95,
            y: 315,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.531,
            centerY: 0,
            repeatX: 1,
            repeatY: 1,
        })
        scene.add(textureBuillding01B.mesh);
        objects.push(textureBuillding01B.mesh);

        const textureStartF = new Illusttexture({
            texture:'img/start02.png',
            width: 56,
            height: 85,
            x: 129,
            y: 673,
            z: 50,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.423,
            repeatX: 0.27,
            repeatY: 0.35,
        })
        scene.add(textureStartF.mesh);
        objects.push(textureStartF.mesh);

        const textureStartB = new Illusttexture({
            texture:'img/start02.png',
            width: 56,
            height: 85,
            x: 129,
            y: 673,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.27,
            repeatY: 0.35,
        })
        scene.add(textureStartB.mesh);
        objects.push(textureStartB.mesh);

        const textureStartL = new Illusttexture({
            texture:'img/start02.png',
            width: 75,
            height: 55,
            x: 110,
            y: 655,
            z: -2,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.4,
            centerY: 1,
            repeatX: 0.3,
            repeatY: 0.3,
        })
        scene.add(textureStartL.mesh);
        objects.push(textureStartL.mesh);

        const textureTotsu = new Illusttexture({
            texture:'img/start02.png',
            width: 45,
            height: 30,
            x: 127,
            y: 631,
            z: 50,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.34,
            centerY: 0.68,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(textureTotsu.mesh);
        objects.push(textureTotsu.mesh);

        const textureStartK = new Illusttexture({
            texture:'img/start02.png',
            width: 60,
            height: 70,
            x: 135,
            y: 655,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.5,
            centerY: 0.35,
            repeatX: 0.4,
            repeatY: 0.5,
        })
        scene.add(textureStartK.mesh);
        objects.push(textureStartK.mesh);

        const textureStartR = new Illusttexture({
            texture:'img/start01.png',
            width: 145,
            height: 502,
            x: 260,
            y: 405,
            z: 89,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.31,
            repeatY: 1,
        })
        scene.add(textureStartR.mesh);
        objects.push(textureStartR.mesh);

        const yuka1 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 270,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka1.mesh);
        objects.push(yuka1.mesh);

        const yuka2 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 460,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka2.mesh);
        objects.push(yuka2.mesh);

        const yuka3 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 650,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka3.mesh);
        objects.push(yuka3.mesh);

        const yuka4 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 840,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka4.mesh);
        objects.push(yuka4.mesh);

        const yuka5 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1030,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka5.mesh);
        objects.push(yuka5.mesh);

        const yuka6 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1220,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka6.mesh);
        objects.push(yuka6.mesh);

        const yuka7 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1410,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka7.mesh);
        objects.push(yuka7.mesh);

        const yuka8 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1600,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka8.mesh);
        objects.push(yuka8.mesh);

        const yuka9 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1790,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka9.mesh);
        objects.push(yuka9.mesh);

        const yuka10 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1980,
            y: 170,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka10.mesh);
        objects.push(yuka10.mesh);

        const yuka11 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2130,
            y: 170,
            z: 99,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka11.mesh);
        objects.push(yuka11.mesh);

        const yuka12 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2400,
            y: 170,
            z: 99,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka12.mesh);
        objects.push(yuka12.mesh);

        const yuka13 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2590,
            y: 170,
            z: 99,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka13.mesh);
        objects.push(yuka13.mesh);

        const yuka20 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 75,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka20.mesh);
        objects.push(yuka20.mesh);

        const yuka21 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 270,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka21.mesh);
        objects.push(yuka21.mesh);

        const yuka22 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 460,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka22.mesh);
        objects.push(yuka22.mesh);

        const yuka23 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 650,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka23.mesh);
        objects.push(yuka23.mesh);

        const yuka24 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 840,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka24.mesh);
        objects.push(yuka24.mesh);

        const yuka25 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1030,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka25.mesh);
        objects.push(yuka25.mesh);

        const yuka26 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1220,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka26.mesh);
        objects.push(yuka26.mesh);

        const yuka27 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1410,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka27.mesh);
        objects.push(yuka27.mesh);

        const yuka28 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1600,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka28.mesh);
        objects.push(yuka28.mesh);

        const yuka29 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1790,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka29.mesh);
        objects.push(yuka29.mesh);

        const yuka210 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 1980,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka210.mesh);
        objects.push(yuka210.mesh);

        const yuka211 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2130,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka211.mesh);
        objects.push(yuka211.mesh);

        const yuka212 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2320,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka212.mesh);
        objects.push(yuka212.mesh);

        const yuka213 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2510,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka213.mesh);
        objects.push(yuka213.mesh);

        const yuka214 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2700,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka214.mesh);
        objects.push(yuka214.mesh);

        const yuka215 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2890,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka215.mesh);
        objects.push(yuka215.mesh);

        const yuka216 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 3080,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka216.mesh);
        objects.push(yuka216.mesh);

        const yuka217 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 3270,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka217.mesh);
        objects.push(yuka217.mesh);

        const yuka218 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 3460,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka218.mesh);
        objects.push(yuka218.mesh);

        const yuka219 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 3650,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka219.mesh);
        objects.push(yuka219.mesh);

        const textureNA1 = new Illusttexture({
            texture:'img/NA-1.png',
            width: 300,
            height: 550,
            x: 560,
            y: 451,
            z: -1,
        })
        scene.add(textureNA1.mesh);
        objects.push(textureNA1.mesh);

        const ImgBack = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 500,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack.mesh);
        objects.push(ImgBack.mesh);

        const ImgBack_2 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 900,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_2.mesh);
        objects.push(ImgBack_2.mesh);

        const ImgBack_3 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 1300,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_3.mesh);
        objects.push(ImgBack_3.mesh);

        const ImgBack_4 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 1700,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_4.mesh);
        objects.push(ImgBack_4.mesh);

        const ImgBack_5 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 2100,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_5.mesh);
        objects.push(ImgBack_5.mesh);

        // //Aルート終わり
        const A3 = new Illusttexture({
            texture:'img/start02.png',
            width: 160,
            height: 250,
            x: 2058,
            y: 306.5,
            z: 5,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.9,
            centerY: 0.4,
            repeatX: 0.5,
            repeatY: 0.6,
        })
        scene.add(A3.mesh);
        objects.push(A3.mesh);

        //Nルート
        const nStep = new Illusttexture({
            texture:'img/nStep.png',
            width: 460,
            height: 460,
            x: 1000,
            y: 410,
            z: -1,
        })
        scene.add(nStep.mesh);
        objects.push(nStep.mesh);

        // const nCharactor = new Illusttexture({
        //     texture:'img/N-chara.png',
        //     width: 300,
        //     height: 300,
        //     x: 1600,
        //     y: 730,
        //     z: 10,
        // })
        // scene.add(nCharactor.mesh);
        // objects.push(nCharactor.mesh);
    
        const textureBuilldingNF = new Illusttexture({
            texture:'img/start01.png',
            width: 205,
            height: 500,
            x: 2330,
            y: 414,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.35,
            repeatY: 0.65,
        })
        scene.add(textureBuilldingNF.mesh);
        objects.push(textureBuilldingNF.mesh);

        const textureN01 = new Illusttexture({
            texture:'img/start02.png',
            width: 56,
            height: 85,
            x: 2369,
            y: 670,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.27,
            repeatY: 0.35,
        })
        scene.add(textureN01.mesh);
        objects.push(textureN01.mesh);

        const textureNL = new Illusttexture({
            texture:'img/start02.png',
            width: 75,
            height: 55,
            x: 2360,
            y: 655,
            z: -20,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.4,
            centerY: 1,
            repeatX: 0.3,
            repeatY: 0.3,
        })
        scene.add(textureNL.mesh);
        objects.push(textureNL.mesh);

        const textureTotsuN = new Illusttexture({
            texture:'img/start02.png',
            width: 45,
            height: 30,
            x: 2365,
            y: 631,
            z: -14,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.34,
            centerY: 0.68,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(textureTotsuN.mesh);
        objects.push(textureTotsuN.mesh);

        const textureNK = new Illusttexture({
            texture:'img/start02.png',
            width: 60,
            height: 70,
            x: 2375,
            y: 655,
            z: -20,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.5,
            centerY: 0.35,
            repeatX: 0.4,
            repeatY: 0.5,
        })
        scene.add(textureNK.mesh);
        objects.push(textureNK.mesh);

        //Sルート
        const SKT1 = new Illusttexture({
            texture:'img/haikei03.png',
            width: 50,
            height: 100,
            x: 700,
            y: 50,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.9,
            centerY: 0,
            repeatX: 0.24,
            repeatY: 0.5,
        })
        scene.add(SKT1.mesh);
        objects.push(SKT1.mesh);

        const dentyuS = new Illusttexture({
            texture:'img/haikei02.png',
            width: 70,
            height: 100,
            x: 1000,
            y: 50,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.43,
            repeatY: 0.45,
        })
        scene.add(dentyuS.mesh);
        objects.push(dentyuS.mesh);

        const densenS = new Illusttexture({
            texture:'img/haikei02.png',
            width: 50,
            height: 85,
            x: 1004,
            y: 55,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 1,
            repeatX: 0.3,
            repeatY: 0.35,
        })
        scene.add(densenS.mesh);
        objects.push(densenS.mesh);

        const dentyubtnS = new Illusttexture({
            texture:'img/haikei03.png',
            width: 110,
            height: 15,
            x: 1200,
            y: 6,
            z: 10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.65,
            repeatY: 0.1,
        })
        scene.add(dentyubtnS.mesh);
        objects.push(dentyubtnS.mesh);

        const SKT2 = new Illusttexture({
            texture:'img/haikei01.png',
            width: 170,
            height: 115,
            x: 1600,
            y: 50,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.33,
            repeatX: 0.5,
            repeatY: 0.35,
        })
        scene.add(SKT2.mesh);
        objects.push(SKT2.mesh);

        const ImgBack_S1 = new Illusttexture({
            texture:'img/Back01.png',
            width: 700,
            height: 700,
            x: 2600,
            y: 280,
            z: -10,
        })
        scene.add(ImgBack_S1.mesh);
        objects.push(ImgBack_S1.mesh);

        const ImgBack_S2 = new Illusttexture({
            texture:'img/Back01.png',
            width: 700,
            height: 700,
            x: 3300,
            y: 280,
            z: -10,
        })
        scene.add(ImgBack_S2.mesh);
        objects.push(ImgBack_S2.mesh);

        const S_eye = new Illusttexture({
            texture:'img/haikei03.png',
            width: 200,
            height: 100,
            x: 2500,
            y: 60,
            z: 99,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.5,
            repeatY: 0.5,
        })
        scene.add(S_eye.mesh);
        objects.push(S_eye.mesh);

        const S_denki = new Illusttexture({
            texture:'img/haikei03.png',
            width: 43,
            height: 100,
            x: 2800,
            y: 45,
            z: 99,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 1,
            repeatX: 0.13,
            repeatY: 0.5,
        })
        scene.add(S_denki.mesh);
        objects.push(S_denki.mesh);

        const S_denki_light = new Illusttexture({
            texture:'img/haikei03.png',
            width: 100,
            height: 100,
            x: 2808,
            y: 47,
            z: 99,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 1,
            repeatX: 0.36,
            repeatY: 0.5,
        })
        scene.add(S_denki_light.mesh);
        objects.push(S_denki_light.mesh);

        const S_hospital = new Illusttexture({
            texture:'img/haikei02.png',
            width: 180,
            height: 110,
            x: 3100,
            y: 53,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.55,
            repeatY: 0.4,
        })
        scene.add(S_hospital.mesh);
        objects.push(S_hospital.mesh);

        const S_hospital_b = new Illusttexture({
            texture:'img/start01.png',
            width: 139,
            height: 61,
            x: 3063.5,
            y: 32,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.45,
            centerY: 1,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(S_hospital_b.mesh);
        objects.push(S_hospital_b.mesh);

        const textureBuilldingSF = new Illusttexture({
            texture:'img/start01.png',
            width: 205,
            height: 665,
            x: 3390,
            y: 330,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.8,
            repeatX: 0.35,
            repeatY: 1,
        })
        scene.add(textureBuilldingSF.mesh);
        objects.push(textureBuilldingSF.mesh);

        const textureStartSF = new Illusttexture({
            texture:'img/start02.png',
            width: 56,
            height: 85,
            x: 3429,
            y: 673,
            z: 50,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.423,
            repeatX: 0.27,
            repeatY: 0.35,
        })
        scene.add(textureStartSF.mesh);
        objects.push(textureStartSF.mesh);

        const textureStartSB = new Illusttexture({
            texture:'img/start02.png',
            width: 56,
            height: 85,
            x: 3429,
            y: 673,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.27,
            repeatY: 0.35,
        })
        scene.add(textureStartSB.mesh);
        objects.push(textureStartSB.mesh);

        const textureStartSL = new Illusttexture({
            texture:'img/start02.png',
            width: 75,
            height: 55,
            x: 3410,
            y: 655,
            z: -2,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.4,
            centerY: 1,
            repeatX: 0.3,
            repeatY: 0.3,
        })
        scene.add(textureStartSL.mesh);
        objects.push(textureStartSL.mesh);

        const textureTotsuS = new Illusttexture({
            texture:'img/start02.png',
            width: 45,
            height: 30,
            x: 3427,
            y: 631,
            z: 50,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.34,
            centerY: 0.68,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(textureTotsuS.mesh);
        objects.push(textureTotsuS.mesh);

        const textureStartSK = new Illusttexture({
            texture:'img/start02.png',
            width: 60,
            height: 70,
            x: 3435,
            y: 655,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.5,
            centerY: 0.35,
            repeatX: 0.4,
            repeatY: 0.5,
        })
        scene.add(textureStartSK.mesh);
        objects.push(textureStartSK.mesh);


        //---------renderer--------------------------------------
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        //renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

};


function onWindowResize() {

    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;

    //camera.aspect = window.innerWidth / window.innerHeight;
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
       



