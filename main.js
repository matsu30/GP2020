
//---------素材並べる----------------------

var camera, scene, light, renderer;

var objects = [];

var vertex = new THREE.Vector3();
var color = new THREE.Color();

const starring = new Starring();
const fourAnimation = new Animationtexture();

const pedestal = {
    x: 0,
    y: 0,
    z: 0
}

let isKeydown = false;
// const obstacle = new Obstacle({
//     x: 20,
//     y: 0,
//     z: 0
// });

// console.log(obstacle);

// var audio = new Audio('base1.mp3');
// audio.loop = 'true';
// audio.load();
// audio.play();

//---------素材並べた----------------------

init();
animate();

function init() {

        // camera = new THREE.OrthographicCamera(-70, +200, +300, -180, 1, 150);
        // camera.position.z = 100;

        // camera = new THREE.OrthographicCamera(-120, +120, +67.5, -67.5, 1, 150);
        // camera.position.z = 100;

        // camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
        // camera.position.z = 100;

        camera = new THREE.OrthographicCamera( window.innerWidth / - 19.2, window.innerWidth / 19.2, window.innerHeight / 14.08, window.innerHeight / - 20.48, 0.1, 1000 );
        camera.position.z = 100;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

        light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        fourAnimation.load();

        starring.load();
        //x20 y650
        starring.body.position.x = 20;
        starring.body.position.y = 650;
        starring.body.position.z = 0;
        fourAnimation.body.position.x = 540;
        fourAnimation.body.position.y = 194;
        fourAnimation.body.position.z = -2;
        scene.add(starring.body);
        scene.add(fourAnimation.body);

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
                    if(!isKeydown){
                        starring.moveLeft = true;
                        starring.changePose("back");
                        isKeydown = true;
                    }
                    break;

                // case 40: // down
                // case 83: // s
                //     starring.moveBackward = true;
                //     break;

                case 39: // right
                case 68: // d
                    if(!isKeydown){
                        starring.moveRight = true;
                        starring.changePose("walk");
                        isKeydown = true;
                    }
                    break;

                case 32: // space
                    starring.jump();
                    break;

            }

        };

        //ボタンを離す
        var onKeyUp = function ( event ) {

            isKeydown = false;

            switch ( event.keyCode ) {

                // case 38: // up
                // case 87: // w
                //     starring.moveForward = false;
                //     break;

                case 37: // left
                case 65: // a
                    starring.moveLeft = false;
                    starring.changePose("backStand");
                    break;

                // case 40: // down
                // case 83: // s
                //     starring.moveBackward = false;
                //     break;

                case 39: // right
                case 68: // d
                    starring.moveRight = false;
                    starring.changePose("stand");
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

        const Start1 = new Obstacle({
            height: 60,
            y: 230+440,
        })
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
        })

        scene.add(Start1);
        objects.push(Start1);
        scene.add(Start2);
        objects.push(Start2);
        scene.add(Start3);
        objects.push(Start3);
        scene.add(Start4);
        objects.push(Start4);
        scene.add(Start5);
        objects.push(Start5);

        //---------event------------------------------------

        const hukidashi = document.getElementById('hukidashi');
        const dameAdd = new Obstacle({
            color: 0xffff00,
            collider: false,
            x: 140,
            y: maxY - obstacleKeydata.height * -1 + offsetY,
            z: 0,
            onCollision: function(){
                hukidashi.classList.add('is-show');
            }
        });
        scene.add(dameAdd);
        objects.push(dameAdd);

        const dameRemove = new Obstacle({
            color: 0xffff00,
            collider: false,
            x: 120,
            y: maxY - obstacleKeydata.height * -1 + offsetY,
            z: 0,
            onCollision: function(){
                hukidashi.classList.remove('is-show');
            }
        });
        scene.add(dameRemove);
        objects.push(dameRemove);

        const start = document.getElementById('start');
        const title = document.getElementById('title');
        const op = new Obstacle({
            width: 140,
            height: 20,
            depth: 20,
            color: 0x000000,
            collider: false,
            x: obstacleKeydata.width * 5,
            y: maxY - obstacleKeydata.height * -1 + offsetY,
            z: 0,
            onCollision: function(){
                start.classList.add('is-show');
                title.classList.add('is-fade');
            }
        });
        scene.add(op);
        objects.push(op);

        const eventObstacle01 = new Obstacle({
            width: 200,
            height: 600,
            x: 438,
            y: 450,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("fall");
                starring.changePose("fall", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
                start.classList.remove('is-show');
            }
        });
        scene.add(eventObstacle01);
        objects.push(eventObstacle01);

        const eventObstacle02 = new Obstacle({
            width: 300,
            x: 380,
            y: 190,
            collider: false,
            once: true,
            onCollision: function(){
                console.log(eventObstacle02.rotation);
                console.log("crash");
                starring.changePose("crash", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(eventObstacle02);
        objects.push(eventObstacle02);

        fourAnimation.timeline
        .to(fourAnimation.body.position, {
            duration: 6,
            x: "+=500",
        })
        .to(fourAnimation.body.position, {
            duration: 30,
            x: "+=4000"
        });

        const eventObstacle03 = new Obstacle({
            x: 700,
            y: 190,
            collider: false,
            onCollision: function(){
                fourAnimation.timeline.play();
            }
        });
        scene.add(eventObstacle03);
        objects.push(eventObstacle03);

        const kotoba03 = document.getElementById('kotoba03');
        const eventObstacle05 = new Obstacle({
            height: 300,
            x: 1700,
            y: 190,
            collider: false,
            onCollision: function(){
                console.log(Hit08A);
                Hit08A.timeline.play();
                kotoba01.classList.remove('is-show');
                kotoba02.classList.remove('is-show');
                kotoba03.classList.add('is-show');
            }
        });
        scene.add(eventObstacle05);
        objects.push(eventObstacle05);

        const eventObstacle06a = new Obstacle({
            height: 100,
            x: 1220,
            y: 670,
            collider: false,
            onCollision: function(){
                pedestal.y = 0;
            }
        });
        scene.add(eventObstacle06a);
        objects.push(eventObstacle06a);

        const eventObstacle06b = new Obstacle({
            height: 100,
            x: 1250,
            y: 670,
            collider: false,
            onCollision: function(){
                pedestal.y = -100;
            }
        });
        scene.add(eventObstacle06b);
        objects.push(eventObstacle06b);

        const eventObstacle06c = new Obstacle({
            height: 100,
            x: 2200,
            y: 670,
            collider: false,
            onCollision: function(){
                pedestal.y = 0;
            }
        });
        scene.add(eventObstacle06c);
        objects.push(eventObstacle06c);

        const eventObstacle07 = new Obstacle({
            width: 200,
            height: 600,
            x: 2540,
            y: 450,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("fall");
                starring.changePose("fall", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(eventObstacle07);
        objects.push(eventObstacle07);

        const eventObstacle08 = new Obstacle({
            width: 200,
            x: 2528,
            y: 190,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("crash");
                starring.changePose("crash", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(eventObstacle08);
        objects.push(eventObstacle08);

        const kotoba01 = document.getElementById('kotoba01');
        const eventObstacleA_txt01 = new Obstacle({
            height: 300,
            x: 1000,
            y: 190,
            collider: false,
            onCollision: function(){
                kotoba01.classList.add('is-show');
            }
        });
        scene.add(eventObstacleA_txt01);
        objects.push(eventObstacleA_txt01);

        const kotoba02 = document.getElementById('kotoba02');
        const eventObstacleA_txt02 = new Obstacle({
            height: 300,
            x: 1300,
            y: 190,
            collider: false,
            onCollision: function(){
                kotoba03.classList.remove('is-show');
                kotoba02.classList.add('is-show');
            }
        });
        scene.add(eventObstacleA_txt02);
        objects.push(eventObstacleA_txt02);

        const eventremove_txt01 = new Obstacle({
            height: 300,
            x: 900,
            y: 190,
            collider: false,
            onCollision: function(){
                kotoba01.classList.remove('is-show');
                kotoba02.classList.remove('is-show');
                kotoba03.classList.remove('is-show');
            }
        });
        scene.add(eventremove_txt01);
        objects.push(eventremove_txt01);

        const eventremove_txt02 = new Obstacle({
            height: 300,
            x: 1250,
            y: 190,
            collider: false,
            onCollision: function(){
                kotoba01.classList.remove('is-show');
                kotoba02.classList.remove('is-show');
                kotoba03.classList.remove('is-show');
            }
        });
        scene.add(eventremove_txt02);
        objects.push(eventremove_txt02);

        const ed5 = document.getElementById('ed5');
        const eventObstacle04 = new Obstacle({
            width: 20,
            x: 2030,
            y: 190,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("sit");
                starring.changePose("sit", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
                ed5.classList.add('is-show');
                kotoba03.classList.remove('is-show');
                document.removeEventListener( 'keydown', onKeyDown, false );
                document.removeEventListener( 'keyup', onKeyUp, false );
            }
        });
        scene.add(eventObstacle04);
        objects.push(eventObstacle04);

        const ed6 = document.getElementById('ed6');
        const eventObstacle09 = new Obstacle({
            width: 50,
            x: 2680,
            y: 190,
            collider: false,
            onCollision: function(){
                console.log("smile");
                starring.changePose("smile", { isForcePlay: true });
                ed6.classList.add('is-show');
                document.removeEventListener( 'keydown', onKeyDown, false );
                document.removeEventListener( 'keyup', onKeyUp, false );

            }
        });
        scene.add(eventObstacle09);
        objects.push(eventObstacle09);



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
            texture:'img/back01.png',
            width: 400,
            height: 475,
            x: 500,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack.mesh);

        const ImgBack_2 = new Illusttexture({
            texture:'img/back01.png',
            width: 400,
            height: 475,
            x: 900,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_2.mesh);

        const ImgBack_3 = new Illusttexture({
            texture:'img/back01.png',
            width: 400,
            height: 475,
            x: 1300,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_3.mesh);

        const ImgBack_4 = new Illusttexture({
            texture:'img/back01.png',
            width: 400,
            height: 475,
            x: 1700,
            y: 395,
            z: -3,
        })
        scene.add(ImgBack_4.mesh);

        const ImgBack_5 = new Illusttexture({
            texture:'img/back01.png',
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

        // const Hit03A = new Illusttexture({
        //     texture:'img/HITO.png',
        //     width: 70,
        //     height: 30,
        //     x: 540,
        //     y: 194,
        //     z: -2,
        // })
        // scene.add(Hit03A.mesh);

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
            z: 90,
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
            x: 1750,
            y: 183+300,
            z: 90,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.8,
            centerY: 0.5,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(Hit08A.mesh);
        Hit08A.timeline
        .to(Hit08A.mesh.position, {
            duration: 0.3,
            y: "-=300",
        })

        const A3 = new Illusttexture({
            texture:'img/start02.png',
            width: 160,
            height: 250,
            x: 2075,
            y: 306.5,
            z: 5,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
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
            width: 28,
            height: 63,
            x: 1300,
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
            width: 31.5,
            height: 62.3,
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
            width: 47.6,
            height: 61.6,
            x: 1700,
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
            width: 52.5,
            height: 35,
            x: 1900,
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
            width: 38.5,
            height: 63,
            x: 2100,
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
        const SingouS = new Illusttexture({
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
        scene.add(SingouS.mesh);

        const redS = new Illusttexture({
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
        scene.add(redS.mesh);

        const dentyuS = new Illusttexture({
            texture:'img/haikei02.png',
            width: 100,
            height: 130,
            x: 1000,
            y: 50+14,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.43,
            repeatY: 0.45,
        })
        scene.add(dentyuS.mesh);

        const densenS = new Illusttexture({
            texture:'img/haikei02.png',
            width: 70,
            height: 110,
            x: 1004,
            y: 90,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 1,
            repeatX: 0.3,
            repeatY: 0.35,
        })
        scene.add(densenS.mesh);

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

        const ImgBack_S1 = new Illusttexture({
            texture:'img/back01.png',
            width: 700,
            height: 700,
            x: 2700,
            y: -170,
            z: -10,
        })
        scene.add(ImgBack_S1.mesh);

        const ImgBack_S2 = new Illusttexture({
            texture:'img/back01.png',
            width: 700,
            height: 700,
            x: 3400,
            y: 280,
            z: -10,
        })
        scene.add(ImgBack_S2.mesh);

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

        const KT1 = new Illusttexture({ //室内
            texture:'img/haikei01.png',
            width: 155,
            height: 115,
            x: 4008,
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

        const KT2 = new Illusttexture({ //室内階段
            texture:'img/haikei02.png',
            width: 148,
            height: 100,
            x: 4013,
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

        //Tルート

        const Hit01aT = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 4540,
            y: 17,
            z: -17,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01aT.mesh);

        const Hit01bT = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 4530,
            y: 17,
            z: -17,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01bT.mesh);

        const Hit01cT = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 4520,
            y: 17,
            z: -17,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01cT.mesh);

        const HitKubaruT = new Illusttexture({
            texture:'img/charactor.png',
            width: 25,
            height: 40,
            x: 4575,
            y: 35,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.2,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.15,
        })
        scene.add(HitKubaruT.mesh);

        const haihuT = new Illusttexture({
            texture:'img/charactor.png',
            width: 45,
            height: 55,
            x: 4570,
            y: 18,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.37,
            centerY: 0,
            repeatX: 0.16,
            repeatY: 0.15,
        })
        scene.add(haihuT.mesh);

        const soukoT = new Illusttexture({
            texture:'img/haikei01.png',
            width: 200,
            height: 250,
            x: 4700,
            y: 120,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.5,
            repeatY: 0.55,
        })
        scene.add(soukoT.mesh);

        const Hit01T = new Illusttexture({//倒れている人
            texture:'img/charactor.png',
            width: 35,
            height: 25,
            x: 4900,
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

        //Kルート

        const K01 = new Illusttexture({
            texture:'img/haikei01.png',
            width: 130,
            height: 80,
            x: 5608,
            y: 39.5,
            z: -20,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.45,
            repeatY: 0.23,
        })
        scene.add(K01.mesh);

        const desk01 = new Illusttexture({
            texture:'img/haikei03.png',
            width: 60,
            height: 40,
            x: 5610,
            y: 18,
            z: -19,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.3,
            repeatX: 0.5,
            repeatY: 0.25,
        })
        scene.add(desk01.mesh);

        const Hit01K = new Illusttexture({
            texture:'img/charactor.png',
            width: 25,
            height: 40,
            x: 5630,
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

        const K001 = new Illusttexture({ //室内
            texture:'img/haikei01.png',
            width: 155,
            height: 115,
            x: 5888,
            y: 49,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.83,
            repeatX: 0.45,
            repeatY: 0.35,
        })
        scene.add(K001.mesh);

        const K002 = new Illusttexture({ //室内階段
            texture:'img/haikei02.png',
            width: 148,
            height: 100,
            x: 5893,
            y: 34,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.5,
            repeatX: 0.53,
            repeatY: 0.3,
        })
        scene.add(K002.mesh);

        const Hit03K = new Illusttexture({
            texture:'img/charactor.png',
            width: 22,
            height: 46,
            x: 6500,
            y: 19,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.2,
        })
        scene.add(Hit03K.mesh);

        const HitKubaruK = new Illusttexture({
            texture:'img/charactor.png',
            width: 25,
            height: 40,
            x: 6575,
            y: 35,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.2,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.15,
        })
        scene.add(HitKubaruK.mesh);

        const haihuK = new Illusttexture({
            texture:'img/charactor.png',
            width: 45,
            height: 55,
            x: 6570,
            y: 18,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.37,
            centerY: 0,
            repeatX: 0.16,
            repeatY: 0.15,
        })
        scene.add(haihuK.mesh);

        const soukoK = new Illusttexture({
            texture:'img/haikei01.png',
            width: 200,
            height: 250,
            x: 6700,
            y: 120,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.5,
            repeatY: 0.55,
        })
        scene.add(soukoK.mesh);

        const K02 = new Illusttexture({
            texture:'img/haikei01.png',
            width: 130,
            height: 80,
            x: 7008,
            y: 39.5,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.45,
            repeatY: 0.23,
        })
        scene.add(K02.mesh);

        const desk02 = new Illusttexture({
            texture:'img/haikei03.png',
            width: 60,
            height: 40,
            x: 7010,
            y: 18,
            z: -14,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.3,
            repeatX: 0.5,
            repeatY: 0.25,
        })
        scene.add(desk02.mesh);

        const Hit02K = new Illusttexture({
            texture:'img/charactor.png',
            width: 25,
            height: 40,
            x: 7028,
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


        // //Hルート
        const SingouH = new Illusttexture({
            texture:'img/haikei03.png',
            width: 50,
            height: 100,
            x: 7700,
            y: 50,
            z: -10,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.9,
            centerY: 0,
            repeatX: 0.24,
            repeatY: 0.5,
        })
        scene.add(SingouH.mesh);

        const redH = new Illusttexture({
            texture:'img/haikei03.png',
            width: 30,
            height: 100,
            x: 7703,
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

        const dentyu01H = new Illusttexture({
            texture:'img/haikei02.png',
            width: 100,
            height: 130,
            x: 8000,
            y: 64,
            z: -37,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.43,
            repeatY: 0.45,
        })
        scene.add(dentyu01H.mesh);

        const dentyu02H = new Illusttexture({
            texture:'img/haikei02.png',
            width: 100,
            height: 130,
            x: 8138,
            y: 64,
            z: -37,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0,
            repeatX: 0.43,
            repeatY: 0.45,
        })
        scene.add(dentyu02H.mesh);

        const densen01H = new Illusttexture({
            texture:'img/haikei02.png',
            width: 82,
            height: 45,
            x: 8005,
            y: 101,
            z: -36,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.2,
            centerY: 0.55,
            repeatX: 0.35,
            repeatY: 0.15,
        })
        scene.add(densen01H.mesh);

        const densen02H = new Illusttexture({
            texture:'img/haikei02.png',
            width: 82,
            height: 45,
            x: 8143,
            y: 101,
            z: -36,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.2,
            centerY: 0.55,
            repeatX: 0.35,
            repeatY: 0.15,
        })
        scene.add(densen02H.mesh);

        const gard01H = new Illusttexture({
            texture:'img/haikei03.png',
            width: 90,
            height: 30,
            x: 7999,
            y: 12.8,
            z: -38,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.1,
            centerY: 0.1,
            repeatX: 0.6,
            repeatY: 0.15,
        })
        scene.add(gard01H.mesh);

        const gard02H = new Illusttexture({
            texture:'img/haikei03.png',
            width: 90,
            height: 30,
            x: 8075,
            y: 12.8,
            z: -38,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.1,
            centerY: 0.1,
            repeatX: 0.6,
            repeatY: 0.15,
        })
        scene.add(gard02H.mesh);

        const gard03H = new Illusttexture({
            texture:'img/haikei03.png',
            width: 90,
            height: 30,
            x: 8152,
            y: 12.8,
            z: -38,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.1,
            centerY: 0.1,
            repeatX: 0.6,
            repeatY: 0.15,
        })
        scene.add(gard03H.mesh);

        const carH = new Illusttexture({
            texture:'img/charactor.png',
            width: 60,
            height: 50,
            x: 8010,
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
            x: 8400,
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
            x: 8315,
            y: -3,
            z: 50,
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
            x: 8660,
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
            x: 8800,
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
            x: 9000,
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
            x: 8990,
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
            x: 8980,
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
            x: 8970,
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
            x: 8950,
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
            x: 8930,
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
            x: 8910,
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
            x: 9430,
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
            x: 9700,
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
            x: 9750,
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
            x: 9800,
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
            x: 9850,
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
            x: 9900,
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
            x: 9950,
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
            x: 9210,
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
            x: 9220,
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
            x: 9230,
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
            x: 9040,
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

        //床----------------------------------------------------------------------------

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
            x: 2220,
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
            x: 2410,
            y: 170,
            z: 99,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka13.mesh);

        const yuka14 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2600,
            y: 170,
            z: 99,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka14.mesh);

        const yuka15 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2790,
            y: 170,
            z: 99,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka15.mesh);

        const yuka16 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 2980,
            y: 170,
            z: 99,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka16.mesh);

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

        const yuka220 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 3840,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka220.mesh);

        const yuka221 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 4030,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka221.mesh);

        const yuka222 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 4220,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka222.mesh);

        const yuka223 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 4410,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka223.mesh);

        const yuka224 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 4600,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka224.mesh);

        const yuka225 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 4790,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka225.mesh);

        const yuka226 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 4980,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka226.mesh);

        const yuka227 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 5180,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka227.mesh);

        const yuka228 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 5470,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka228.mesh);

        const yuka229 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 5660,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka229.mesh);

        const yuka230 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 5850,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka230.mesh);

        const yuka231 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 6040,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka231.mesh);

        const yuka232 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 6230,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka232.mesh);

        const yuka233 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 6420,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka233.mesh);

        const yuka234 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 6610,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka234.mesh);

        const yuka235 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 6800,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka235.mesh);

        const yuka236 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 6990,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka236.mesh);

        const yuka237 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 7180,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka237.mesh);

        const yuka238 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 7370,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka238.mesh);

        const yuka239 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 7560,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka239.mesh);

        const yuka240 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 7750,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka240.mesh);

        const yuka241 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 7940,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka241.mesh);

        const yuka242 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 8130,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka242.mesh);

        const yuka243 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 8320,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka243.mesh);

        const yuka244 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 8510,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka244.mesh);

        const yuka245 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 8700,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka245.mesh);

        const yuka246 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 8890,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka246.mesh);

        const yuka247 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 9080,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka247.mesh);

        const yuka248 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 9270,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka248.mesh);

        const yuka249 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 9460,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka249.mesh);

        const yuka250 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 9650,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka250.mesh);

        const yuka251 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 9840,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka251.mesh);

        const yuka252 = new Illusttexture({
            texture:'img/start02.png',
            width: 200,
            height: 27,
            x: 10030,
            y: -9,
            z: 91,
            centerX: 1,
            centerY: 0,
            repeatX: 1,
            repeatY: 0.145,
        })
        scene.add(yuka252.mesh);

        //---------renderer--------------------------------------
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        //renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

};


function onWindowResize() {

    camera.left = window.innerWidth / -19.2;
    camera.right = window.innerWidth / 19.2;
    camera.top = window.innerHeight / 14.08;
    camera.bottom = window.innerHeight / -20.48;

    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


//--------動き--------------------------------------
function animate() {

    requestAnimationFrame( animate );
 
    starring.animate(objects);
    fourAnimation.animate();

    const cameraPosition = starring.body.position
        .clone()
        .add(
            new THREE.Vector3(
                0 + pedestal.x,
                30 + pedestal.y,
                100 + pedestal.z
            )
        );
    camera.position.lerp(cameraPosition, 0.1);

    renderer.render( scene, camera );

};
       

//ウィンドウの大きさ
//文字の元サイズ

