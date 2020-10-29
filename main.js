
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
        starring.body.position.x = 100;
        starring.body.position.y = 1000;
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
                    scene.add(obstacle);
                    objects.push(obstacle);
                } 
                //else if (value === 2){
                //     const obstacle = new Obstacle({
                //         width: StepObstacleKeydata.width,
                //         height: StepObstacleKeydata.height,
                //         depth: StepObstacleKeydata.depth,
                //         x: StepObstacleKeydata.width * j,
                //         y: StepMaxY - StepObstacleKeydata.height * i + StepOffsetY,
                //         z: -10,                        
                //     });
                //     scene.add(obstacle.mesh);
                //     objects.push(obstacle.mesh);
                // }

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
                    scene.add(obstacle);
                    objects.push(obstacle);
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
        scene.add(Start2);
        objects.push(Start2);
        scene.add(Start3);
        objects.push(Start3);
        scene.add(Start4);
        objects.push(Start4);
        scene.add(Start5);
        objects.push(Start5);

        
        //---------event------------------------------------
        
        const eventObstacle00 = new Obstacle({
            width: 20,
            height: 20,
            depth: 20,
            color: 0x000000,
            collider: false,
            x: obstacleKeydata.width * 3,
            y: maxY - obstacleKeydata.height * -3 + offsetY,
            z: -10,
            onCollision: function(){
                console.log("eventObstacle");
                starring.changePose("demo");
            }
        });
        scene.add(eventObstacle00);
        objects.push(eventObstacle00);

        const eventObstacle01 = new Obstacle({
            x: 340,
            y: 650,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle01);
        objects.push(eventObstacle01);

        const eventObstacle02 = new Obstacle({
            x: 340,
            y: 190,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle02);
        objects.push(eventObstacle02);

        const eventObstacle03 = new Obstacle({
            x: 700,
            y: 190,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle03);
        objects.push(eventObstacle03);

        const eventObstacle04 = new Obstacle({
            x: 2000,
            y: 190,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle04);
        objects.push(eventObstacle04);

        const eventObstacle05 = new Obstacle({
            x: 1700,
            y: 190,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle05);
        objects.push(eventObstacle05);

        const eventObstacle06 = new Obstacle({
            x: 1240,
            y: 650,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle06);
        objects.push(eventObstacle06);

        const eventObstacle07 = new Obstacle({
            x: 2440,
            y: 650,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle07);
        objects.push(eventObstacle07);

        const eventObstacle08 = new Obstacle({
            x: 2440,
            y: 190,
            z: -10,
            collider: false,
            onCollision: function(){
                console.log("eventObstacle");
            }
        });
        scene.add(eventObstacle08);
        objects.push(eventObstacle08);




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

        const textureNA1 = new Illusttexture({
            texture:'img/NA-1.png',
            width: 300,
            height: 550,
            x: 560,
            y: 451,
            z: -1,
        })
        scene.add(textureNA1.mesh);

        const ImgBack = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 500,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack.mesh);

        const ImgBack_2 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 900,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_2.mesh);

        const ImgBack_3 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 1300,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_3.mesh);

        const ImgBack_4 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 1700,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_4.mesh);

        const ImgBack_5 = new Illusttexture({
            texture:'img/Back01.png',
            width: 400,
            height: 475,
            x: 2100,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_5.mesh);


        //Aルート
        const Hit01A = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 27,
            x: 600,
            y: 194,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.58,
            repeatX: 0.08,
            repeatY: 0.1,
        })
        scene.add(Hit01A.mesh);

        const Hit02A = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 27,
            x: 700,
            y: 190,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.2,
            repeatX: 0.1,
            repeatY: 0.14,
        })
        scene.add(Hit02A.mesh);

        const Hit03aA = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 540,
            y: 198,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03aA.mesh);

        const Hit03bA = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 560,
            y: 198,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.9,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03bA.mesh);

        const Hit03cA = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 580,
            y: 198,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.817,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03cA.mesh);

        const Hit03dA = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 600,
            y: 198,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.735,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03dA.mesh);

        const Hit04A = new Illusttexture({
            texture:'img/charactor.png',
            width: 45,
            height: 20,
            x: 900,
            y: 190,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.8,
            centerY: 0.45,
            repeatX: 0.2,
            repeatY: 0.06,
        })
        scene.add(Hit04A.mesh);

        const Hit05A = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 27,
            x: 920,
            y: 194,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.9,
            centerY: 0.58,
            repeatX: 0.08,
            repeatY: 0.1,
        })
        scene.add(Hit05A.mesh);

        const Hit06A = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 27,
            x: 1000,
            y: 191,
            z: -1,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.4,
            repeatX: 0.1,
            repeatY: 0.14,
        })
        scene.add(Hit06A.mesh);

        const Hit07A = new Illusttexture({
            texture:'img/charactor.png',
            width: 35,
            height: 20,
            x: 1100,
            y: 184,
            z: 98,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.7,
            centerY: 0.91,
            repeatX: 0.17,
            repeatY: 0.086,
        })
        scene.add(Hit07A.mesh);

        const Hit08A = new Illusttexture({
            texture:'img/charactor.png',
            width: 45,
            height: 24,
            x: 1800,
            y: 183,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.8,
            centerY: 0.5,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(Hit08A.mesh);

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

        const Hit01N = new Illusttexture({
            texture:'img/charactor.png',
            width: 40,
            height: 90,
            x: 1400,
            y: 570,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.18,
            repeatY: 0.37,
        })
        scene.add(Hit01N.mesh);

        const Hit02N = new Illusttexture({
            texture:'img/charactor.png',
            width: 40,
            height: 86,
            x: 1500,
            y: 568,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.26,
            repeatX: 0.23,
            repeatY: 0.362,
        })
        scene.add(Hit02N.mesh);

        const Hit03N = new Illusttexture({
            texture:'img/charactor.png',
            width: 68,
            height: 88,
            x: 1600,
            y: 565,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.23,
            centerY: 1,
            repeatX: 0.28,
            repeatY: 0.37,
        })
        scene.add(Hit03N.mesh);

        const Hit04N = new Illusttexture({
            texture:'img/charactor.png',
            width: 75,
            height: 50,
            x: 1700,
            y: 560,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0.8,
            repeatX: 0.3,
            repeatY: 0.2,
        })
        scene.add(Hit04N.mesh);

        const Hit05N = new Illusttexture({
            texture:'img/charactor.png',
            width: 55,
            height: 90,
            x: 1800,
            y: 570,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 1,
            repeatX: 0.25,
            repeatY: 0.358,
        })
        scene.add(Hit05N.mesh);

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

        // const dentyuS = new Illusttexture({
        //     texture:'img/haikei02.png',
        //     width: 100,
        //     height: 130,
        //     x: 1000,
        //     y: 50+14,
        //     z: -10,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 0,
        //     centerY: 0,
        //     repeatX: 0.43,
        //     repeatY: 0.45,
        // })
        // scene.add(dentyuS.mesh);

        // const densenS = new Illusttexture({
        //     texture:'img/haikei02.png',
        //     width: 70,
        //     height: 110,
        //     x: 1004,
        //     y: 90,
        //     z: -10,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 1,
        //     centerY: 1,
        //     repeatX: 0.3,
        //     repeatY: 0.35,
        // })
        // scene.add(densenS.mesh);

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

        // const SKT2 = new Illusttexture({
        //     texture:'img/haikei01.png',
        //     width: 170,
        //     height: 115,
        //     x: 1600,
        //     y: 50,
        //     z: -10,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 1,
        //     centerY: 0.33,
        //     repeatX: 0.5,
        //     repeatY: 0.35,
        // })
        // scene.add(SKT2.mesh);

        // const ImgBack_S1 = new Illusttexture({
        //     texture:'img/Back01.png',
        //     width: 700,
        //     height: 700,
        //     x: 2600,
        //     y: 280,
        //     z: -10,
        // })
        // scene.add(ImgBack_S1.mesh);

        // const ImgBack_S2 = new Illusttexture({
        //     texture:'img/Back01.png',
        //     width: 700,
        //     height: 700,
        //     x: 3300,
        //     y: 280,
        //     z: -10,
        // })
        // scene.add(ImgBack_S2.mesh);

        // const S_eye = new Illusttexture({
        //     texture:'img/haikei03.png',
        //     width: 200,
        //     height: 100,
        //     x: 2500,
        //     y: 60,
        //     z: 99,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 0,
        //     centerY: 1,
        //     repeatX: 0.5,
        //     repeatY: 0.5,
        // })
        // scene.add(S_eye.mesh);

        // const S_denki = new Illusttexture({
        //     texture:'img/haikei03.png',
        //     width: 43,
        //     height: 100,
        //     x: 2800,
        //     y: 45,
        //     z: 99,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 0.6,
        //     centerY: 1,
        //     repeatX: 0.13,
        //     repeatY: 0.5,
        // })
        // scene.add(S_denki.mesh);

        // const S_denki_light = new Illusttexture({
        //     texture:'img/haikei03.png',
        //     width: 100,
        //     height: 100,
        //     x: 2808,
        //     y: 47,
        //     z: 99,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 1,
        //     centerY: 1,
        //     repeatX: 0.36,
        //     repeatY: 0.5,
        // })
        // scene.add(S_denki_light.mesh);

        // const S_hospital = new Illusttexture({
        //     texture:'img/haikei02.png',
        //     width: 180,
        //     height: 110,
        //     x: 3100,
        //     y: 53,
        //     z: 90,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 1,
        //     centerY: 0,
        //     repeatX: 0.55,
        //     repeatY: 0.4,
        // })
        // scene.add(S_hospital.mesh);

        // const S_hospital_b = new Illusttexture({
        //     texture:'img/start01.png',
        //     width: 139,
        //     height: 61,
        //     x: 3063.5,
        //     y: 32,
        //     z: -10,
        //     offsetX: 0,
        //     offsetY: 0,
        //     centerX: 0.45,
        //     centerY: 1,
        //     repeatX: 0.2,
        //     repeatY: 0.1,
        // })
        // scene.add(S_hospital_b.mesh);

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


        //KTルート

        const KT1 = new Illusttexture({
            texture:'img/haikei01.png',
            width: 155,
            height: 115,
            x: 1608,
            y: 49,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.83,
            repeatX: 0.45,
            repeatY: 0.35,
        })
        scene.add(KT1.mesh);

        const KT2 = new Illusttexture({
            texture:'img/haikei02.png',
            width: 148,
            height: 100,
            x: 1613,
            y: 34,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.5,
            repeatX: 0.53,
            repeatY: 0.3,
        })
        scene.add(KT2.mesh);

        const T01 = new Illusttexture({
            texture:'img/haikei01.png',
            width: 130,
            height: 80,
            x: 1608,
            y: 39.5,
            z: -20,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.45,
            repeatY: 0.23,
        })
        scene.add(T01.mesh);

        const deskT01 = new Illusttexture({
            texture:'img/haikei03.png',
            width: 60,
            height: 40,
            x: 1610,
            y: 18,
            z: -19,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.3,
            repeatX: 0.5,
            repeatY: 0.25,
        })
        scene.add(deskT01.mesh);

        const Hit01K = new Illusttexture({
            texture:'img/charactor.png',
            width: 25,
            height: 40,
            x: 1630,
            y: 14.5,
            z: -19,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.1,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.15,
        })
        scene.add(Hit01K.mesh);

        const Hit01aTK = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 2440,
            y: 17,
            z: -17,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01aTK.mesh);

        const Hit01bTK = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 2430,
            y: 17,
            z: -17,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01bTK.mesh);

        const Hit01cTK = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 2420,
            y: 17,
            z: -17,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01cTK.mesh);

        const Hit02TK = new Illusttexture({
            texture:'img/charactor.png',
            width: 25,
            height: 40,
            x: 2475,
            y: 35,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.2,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.15,
        })
        scene.add(Hit02TK.mesh);

        const haihuTK = new Illusttexture({
            texture:'img/charactor.png',
            width: 45,
            height: 55,
            x: 2470,
            y: 18,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.37,
            centerY: 0,
            repeatX: 0.16,
            repeatY: 0.15,
        })
        scene.add(haihuTK.mesh);

        const Hit03TK = new Illusttexture({
            texture:'img/charactor.png',
            width: 22,
            height: 46,
            x: 2100,
            y: 19,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.2,
        })
        scene.add(Hit03TK.mesh);

        const soukoKT = new Illusttexture({
            texture:'img/haikei01.png',
            width: 200,
            height: 250,
            x: 2600,
            y: 120,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.5,
            repeatY: 0.55,
        })
        scene.add(soukoKT.mesh);

        const Hit01T = new Illusttexture({
            texture:'img/charactor.png',
            width: 35,
            height: 25,
            x: 2750,
            y: 6,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.37,
            centerY: 0.15,
            repeatX: 0.15,
            repeatY: 0.1,
        })
        scene.add(Hit01T.mesh);

        const T02 = new Illusttexture({
            texture:'img/haikei01.png',
            width: 130,
            height: 80,
            x: 3608,
            y: 39.5,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.45,
            repeatY: 0.23,
        })
        scene.add(T02.mesh);

        const deskT02 = new Illusttexture({
            texture:'img/haikei03.png',
            width: 60,
            height: 40,
            x: 3610,
            y: 18,
            z: -14,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.3,
            repeatX: 0.5,
            repeatY: 0.25,
        })
        scene.add(deskT02.mesh);

        const Hit02K = new Illusttexture({
            texture:'img/charactor.png',
            width: 25,
            height: 40,
            x: 3628,
            y: 29,
            z: -14,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.1,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.15,
        })
        scene.add(Hit02K.mesh);


        //Hルート

        const redH = new Illusttexture({
            texture:'img/haikei03.png',
            width: 30,
            height: 100,
            x: 703,
            y: 50,
            z: -0,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.5,
        })
        scene.add(redH.mesh);

        const dentyuH = new Illusttexture({
            texture:'img/haikei02.png',
            width: 100,
            height: 130,
            x: 1000,
            y: 64,
            z: -37,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.43,
            repeatY: 0.45,
        })
        scene.add(dentyuH.mesh);

        const densenH = new Illusttexture({
            texture:'img/haikei02.png',
            width: 82,
            height: 45,
            x: 1005,
            y: 101,
            z: -36,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.2,
            centerY: 0.55,
            repeatX: 0.35,
            repeatY: 0.15,
        })
        scene.add(densenH.mesh);

        const gardH = new Illusttexture({
            texture:'img/haikei03.png',
            width: 90,
            height: 30,
            x: 999,
            y: 12.8,
            z: -38,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.1,
            centerY: 0.1,
            repeatX: 0.6,
            repeatY: 0.15,
        })
        scene.add(gardH.mesh);

        const carH = new Illusttexture({
            texture:'img/charactor.png',
            width: 60,
            height: 50,
            x: 1010,
            y: 20,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.35,
            centerY: 0.3,
            repeatX: 0.34,
            repeatY: 0.2,
        })
        scene.add(carH.mesh);

        const CemeteryH = new Illusttexture({
            texture:'img/haikei02.png',
            width: 200,
            height: 130,
            x: 1800,
            y: 65,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.67,
            repeatY: 0.35,
        })
        scene.add(CemeteryH.mesh);

        const CemeteryIriH = new Illusttexture({
            texture:'img/haikei02.png',
            width: 30,
            height: 100,
            x: 1715,
            y: -3,
            z: -38,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.5,
            repeatX: 0.1,
            repeatY: 0.3,
        })
        scene.add(CemeteryIriH.mesh);

        const Hit01H = new Illusttexture({
            texture:'img/charactor.png',
            width: 20,
            height: 50,
            x: 2060,
            y: 22,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.61,
            centerY: 0.25,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01H.mesh);

        const LaboratoryH = new Illusttexture({
            texture:'img/haikei01.png',
            width: 150,
            height: 160,
            x: 2200,
            y: 75,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 1,
            repeatX: 0.55,
            repeatY: 0.45,
        })
        scene.add(LaboratoryH.mesh);

        const Hit02H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 50,
            x: 2400,
            y: 20,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.62,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit02H.mesh);

        const Hit03H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 50,
            x: 2390,
            y: 20,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.55,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit03H.mesh);

        const Hit04H = new Illusttexture({
            texture:'img/charactor.png',
            width: 13,
            height: 49,
            x: 2380,
            y: 19,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.47,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit04H.mesh);

        const Hit05H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 50,
            x: 2370,
            y: 20,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.40,
            centerY: 0.55,
            repeatX: 0.064,
            repeatY: 0.2,
        })
        scene.add(Hit05H.mesh);

        const Hit06H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 51,
            x: 2350,
            y: 19,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.31,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit06H.mesh);

        const Hit07H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 50,
            x: 2330,
            y: 19,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.24,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit07H.mesh);

        const Hit08H = new Illusttexture({
            texture:'img/charactor.png',
            width: 14,
            height: 28,
            x: 2310,
            y: 12,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.15,
            centerY: 0.585,
            repeatX: 0.06,
            repeatY: 0.12,
        })
        scene.add(Hit08H.mesh);

        const Hit09H = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 50,
            x: 2830,
            y: 20,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.2,
        })
        scene.add(Hit09H.mesh);

        const Hit10H = new Illusttexture({
            texture:'img/charactor.png',
            width: 20,
            height: 40,
            x: 3100,
            y: 10,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.5,
            centerY: 1,
            repeatX: 0.1,
            repeatY: 0.2,
        })
        scene.add(Hit10H.mesh);

        const Hit11H = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 27,
            x: 3150,
            y: 15,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.58,
            repeatX: 0.08,
            repeatY: 0.1,
        })
        scene.add(Hit11H.mesh);

        const Hit12H = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 27,
            x: 3200,
            y: 15,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.9,
            centerY: 0.58,
            repeatX: 0.08,
            repeatY: 0.1,
        })
        scene.add(Hit12H.mesh);

        const Hit13H = new Illusttexture({
            texture:'img/charactor.png',
            width: 19,
            height: 28,
            x: 3250,
            y: 13,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.4,
            repeatX: 0.1,
            repeatY: 0.14,
        })
        scene.add(Hit13H.mesh);

        const Hit14H = new Illusttexture({
            texture:'img/charactor.png',
            width: 45,
            height: 24,
            x: 3300,
            y: 7,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.8,
            centerY: 0.6,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(Hit14H.mesh);

        const Hit15H = new Illusttexture({
            texture:'img/charactor.png',
            width: 45,
            height: 24,
            x: 3350,
            y: 3,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.8,
            centerY: 0.35,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(Hit15H.mesh);

        const Hit03aA_H = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 2610,
            y: 18,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03aA_H.mesh);

        const Hit03bA_H = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 2620,
            y: 18,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.9,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03bA_H.mesh);

        const Hit03cA_H = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 2630,
            y: 18,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.817,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03cA_H.mesh);

        const Hit03dA_H = new Illusttexture({
            texture:'img/charactor.png',
            width: 24,
            height: 40,
            x: 2640,
            y: 18,
            z: -39,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.735,
            centerY: 0,
            repeatX: 0.09,
            repeatY: 0.15,
        })
        scene.add(Hit03dA_H.mesh);

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
       



