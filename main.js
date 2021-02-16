
//---------素材並べる----------------------

var camera, scene, light, renderer;

var objects = [];

var vertex = new THREE.Vector3();
var color = new THREE.Color();

const starring = new Starring();
const fourAnimation = new Animationtexture();
const fourAnimationH = new Animationtexture();
const doctorAnimation = new Animationtexture();
const deliverAnimation = new Animationtexture();
const givingAnimation = new Animationtexture();
const girlAnimation = new Animationtexture();
const notAnimation = new Animationtexture();
const dinnerAnimation = new Animationtexture();
const runAnimation = new Animationtexture();

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

        starring.load();

        fourAnimation.load();
        fourAnimationH.load();
        doctorAnimation.load();
        deliverAnimation.load();
        givingAnimation.load();
        dinnerAnimation.load();
        runAnimation.load();
        girlAnimation.load();
        notAnimation.load();
        runAnimation.load();

        //x20 y650
        starring.body.position.x = 20;
        starring.body.position.y = 650;
        starring.body.position.z = 0;
        fourAnimation.body.position.x = 540;
        fourAnimation.body.position.y = 194;
        fourAnimation.body.position.z = -2;
        fourAnimationH.body.position.x = 8400;
        fourAnimationH.body.position.y = 16;
        fourAnimationH.body.position.z = -50;
        doctorAnimation.body.position.x = 8600;
        doctorAnimation.body.position.y = 19;
        doctorAnimation.body.position.z = -1000;
        deliverAnimation.body.position.x = 4580;
        deliverAnimation.body.position.y = 28;
        deliverAnimation.body.position.z = -16;
        givingAnimation.body.position.x = 4901;
        givingAnimation.body.position.y = 10;
        givingAnimation.body.position.z = -16;
        girlAnimation.body.position.x = 5505;
        girlAnimation.body.position.y = 60;
        girlAnimation.body.position.z = -2;
        notAnimation.body.position.x = 6573;
        notAnimation.body.position.y = 28;
        notAnimation.body.position.z = -15;
        runAnimation.body.position.x = 6570;
        runAnimation.body.position.y = 15;
        runAnimation.body.position.z = 90;
        dinnerAnimation.body.position.x = 6570;
        dinnerAnimation.body.position.y = 24.5;
        dinnerAnimation.body.position.z = -1000;
        scene.add(starring.body);
        scene.add(fourAnimation.body);
        scene.add(fourAnimationH.body);
        scene.add(doctorAnimation.body);
        scene.add(dinnerAnimation.body);

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

        var KeyDownUp = function ( event ) {
            switch ( event.keyCode ) {
                case 38: // up
                starring.body.position.x = 3970;
                starring.body.position.y = 0;
                break;
            }
        };

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

        const Sbuillding = new Obstacle({
            height: 60,
            x: 3280,
            y: 670,
        })

        const Tkabe = new Obstacle({
            width: 10,
            height: 100,
            x: 4085,
            y: 50,
        })

        const Kstep01 = new Obstacle({
            width: 10,
            height: 5,
            x: 3971,
            y: 20,
        })

        const Kstep02 = new Obstacle({
            width: 10,
            height: 5,
            x: 3979,
            y: 31,
        })

        const Kyuka01 = new Obstacle({
            width: 28,
            height: 5,
            x: 3996,
            y: 41,
        })

        const KyukaHeya = new Obstacle({
            width: 130,
            height: 5,
            x: 5480,
            y: 41,
        })

        const KyukaKabe01 = new Obstacle({
            width: 10,
            height: 100,
            x: 5410,
            y: 75,
        })

        const Kstep03 = new Obstacle({
            width: 10,
            height: 5,
            x: 5842.5,
            y: 20,
        })

        const Kstep04 = new Obstacle({
            width: 10,
            height: 5,
            x: 5850,
            y: 31,
        })

        const Kstep05 = new Obstacle({
            width: 10,
            height: 5,
            x: 5933,
            y: 31,
        })

        const Kstep06 = new Obstacle({
            width: 10,
            height: 5,
            x: 5941,
            y: 20,
        })

        const Kyuka02 = new Obstacle({
            width: 77,
            height: 5,
            x: 5892,
            y: 41,
        })

        const KyukaKabe02 = new Obstacle({
            width: 10,
            height: 100,
            x: 5816,
            y: 50,
        })

        const ed01kabe = new Obstacle({
            height: 100,
            x: 5110,
            y: 50,
        })

        const runkabeR = new Obstacle({
            height: 100,
            x: 6590,
            y: 50,
        })

        const StoKkabe = new Obstacle({
            height: 100,
            x: 7300,
            y: 50,
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

        scene.add(Sbuillding);
        objects.push(Sbuillding);

        scene.add(Kstep01);
        objects.push(Kstep01);
        scene.add(Kstep02);
        objects.push(Kstep02);
        scene.add(Kyuka01);
        objects.push(Kyuka01);
        scene.add(KyukaHeya);
        objects.push(KyukaHeya);
        scene.add(KyukaKabe01);
        objects.push(KyukaKabe01);

        scene.add(Kstep03);
        objects.push(Kstep03);
        scene.add(Kstep04);
        objects.push(Kstep04);
        scene.add(Kstep05);
        objects.push(Kstep05);
        scene.add(Kstep06);
        objects.push(Kstep06);
        scene.add(Kyuka02);
        objects.push(Kyuka02);
        scene.add(KyukaKabe02);
        objects.push(KyukaKabe02);

        scene.add(ed01kabe);
        objects.push(ed01kabe);
        scene.add(runkabeR);
        objects.push(runkabeR);
        scene.add(StoKkabe);
        objects.push(StoKkabe);


        //---------event------------------------------------

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
                start.classList.add('is-fade');
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
            height: 150,
            x: 700,
            y: 250,
            collider: false,
            onCollision: function(){
                fourAnimation.timeline.play();
            }
        });
        scene.add(eventObstacle03);
        objects.push(eventObstacle03);

        const kotoba03 = document.getElementById('kotoba03');
        const eventObstacle05 = new Obstacle({
            height: 150,
            x: 1700,
            y: 250,
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
            height: 150,
            x: 1000,
            y: 250,
            collider: false,
            onCollision: function(){
                kotoba01.classList.add('is-show');
            }
        });
        scene.add(eventObstacleA_txt01);
        objects.push(eventObstacleA_txt01);

        const kotoba02 = document.getElementById('kotoba02');
        const eventObstacleA_txt02 = new Obstacle({
            height: 150,
            x: 1300,
            y: 250,
            collider: false,
            onCollision: function(){
                kotoba03.classList.remove('is-show');
                kotoba02.classList.add('is-show');
            }
        });
        scene.add(eventObstacleA_txt02);
        objects.push(eventObstacleA_txt02);

        const eventremove_txt01 = new Obstacle({
            height: 150,
            x: 900,
            y: 250,
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
            height: 150,
            x: 1250,
            y: 250,
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
                document.removeEventListener( 'keydown', KeyDownUp, false );
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
                document.removeEventListener( 'keydown', KeyDownUp, false );

            }
        });
        scene.add(eventObstacle09);
        objects.push(eventObstacle09);

        //---H
        const SkaraH = new Obstacle({
            height: 80,
            x: 500,
            y: 40,
            collider: false,
            onCollision: function(){
                console.log("SkaraH");
                starring.body.position.x = 7700;
                kotoba06.classList.remove('is-show');
            }
        });

        const blink = (function() {
            let toggle = true;
            
            return function() {
                if (toggle) {
                    SkaraH.position.y = 40;
                } else {
                    SkaraH.position.y = -100;
                }
                toggle = !toggle;
            }
        })();
        setInterval(blink, 2000);

        scene.add(SkaraH);
        objects.push(SkaraH);

        const blinkObj = new Obstacle({
            height: 10,
            x: 500,
            y: 85,
            collider: false,
        });

        const blinking = (function() {
            let toggle = true;
            
            return function() {
                if (toggle) {
                    blinkObj.position.y = -100;
                } else {
                    blinkObj.position.y = 85;
                }
                toggle = !toggle;
            }
        })();
        setInterval(blinking, 2000);

        scene.add(blinkObj);
        objects.push(blinkObj);

        const carMove = new Obstacle({
            height: 100,
            x: 8000,
            y: 50,
            collider: false,
            onCollision: function(){
                carH.timeline.play();
            }
        });
        scene.add(carMove);
        objects.push(carMove);

        const stop = new Obstacle({
            height: 100,
            x: 8480,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("stop");
                starring.changePose("stop", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
                kotoba04.classList.remove('is-show');
            }
        });
        scene.add(stop);
        objects.push(stop);

        starring.timeline
        .to(starring.body.position, {
            duration: 4,
            x: "+=200",
        })

        doctorAnimation.timeline
        .to(doctorAnimation.body.position, {
            duration: 4,
            x: "+=200",
        })

        const kotoba04 = document.getElementById('kotoba04');
        const follow = new Obstacle({
            height: 100,
            x: 8590,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("follow");
                starring.changePose("follow", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
                starring.timeline.play();
                scene.remove(Hit01H.mesh);
                doctorAnimation.changePose("doctor", { isForcePlay: true });
                doctorAnimation.body.position.z = 0;
                doctorAnimation.timeline.play();
                starring.skeletonMesh.state.tracks[0].loop = false;
                kotoba04.classList.add('is-show');
            }
        });
        scene.add(follow);
        objects.push(follow);

        fourAnimationH.timeline
        .to(fourAnimationH.body.position, {
            duration: 2,
            x: "+=400",
        })
        .to(fourAnimationH.body.position, {
            duration: 50,
            x: "+=4000"
        });

        const HitWalk = new Obstacle({
            height: 100,
            x: 8900,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                Hit02H.timeline.play();
                Hit03H.timeline.play();
                Hit04H.timeline.play();
                Hit05H.timeline.play();
                Hit06H.timeline.play();
                Hit07H.timeline.play();
                Hit08H.timeline.play();
                fourAnimationH.timeline.play();
                kotoba04.classList.remove('is-show');
                kotoba05.classList.remove('is-show');
            }
        });
        scene.add(HitWalk);
        objects.push(HitWalk);

        const kotoba05 = document.getElementById('kotoba05');
        const eventkotoba05 = new Obstacle({
            height: 100,
            x: 9420,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                kotoba05.classList.add('is-show');
            }
        });
        scene.add(eventkotoba05);
        objects.push(eventkotoba05);

        const eventkotoba05Remove = new Obstacle({
            height: 100,
            x: 9900,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                kotoba05.classList.remove('is-show');
            }
        });
        scene.add(eventkotoba05Remove);
        objects.push(eventkotoba05Remove);

        const ed4 = document.getElementById('ed4');
        const eventED4 = new Obstacle({
            height: 100,
            x: 10050,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                ed4.classList.add('is-show');
                document.removeEventListener( 'keydown', onKeyDown, false );
                document.removeEventListener( 'keyup', onKeyUp, false );
                document.removeEventListener( 'keydown', KeyDownUp, false );
                pedestal.y = 100000;
            }
        });
        scene.add(eventED4);
        objects.push(eventED4);

        //---S

        const startRemove = new Obstacle({
            height: 100,
            x: 200,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                start.classList.add('is-fade');
            }
        });
        scene.add(startRemove);
        objects.push(startRemove);

        const kotoba06 = document.getElementById('kotoba06');
        const eventkotoba06 = new Obstacle({
            height: 100,
            x: 1700,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                kotoba06.classList.add('is-show');
            }
        });
        scene.add(eventkotoba06);
        objects.push(eventkotoba06);

        const eventkotoba06Remove = new Obstacle({
            height: 100,
            x: 2340,
            y: 50,
            collider: false,
            onCollision: function(){
                kotoba06.classList.remove('is-show');
            }
        });
        scene.add(eventkotoba06Remove);
        objects.push(eventkotoba06Remove);

        const kotoba07 = document.getElementById('kotoba07');
        const Sdance = new Obstacle({
            height: 100,
            x: 2815,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("dance");
                kotoba07.classList.add('is-show');
                starring.changePose("dance", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(Sdance);
        objects.push(Sdance);

        const SdanceEnd = new Obstacle({
            height: 100,
            x: 2850,
            y: 50,
            collider: false,
            onCollision: function(){
                kotoba07.classList.remove('is-show');
            }
        });
        scene.add(SdanceEnd);
        objects.push(SdanceEnd);

        const builldingUp = new Obstacle({
            height: 100,
            x: 3300,
            y: 50,
            collider: false,
            onCollision: function(){
                console.log("builldingUp");
                starring.body.position.x = 3400;
                starring.body.position.y = 650;
            }
        });
        scene.add(builldingUp);
        objects.push(builldingUp);

        const builldingUpFall = new Obstacle({
            width: 100,
            height: 600,
            x: 3540,
            y: 340,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("fall");
                starring.changePose("fall", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(builldingUpFall);
        objects.push(builldingUpFall);

        const builldingUpCrash = new Obstacle({
            width: 100,
            x: 3540,
            y: 30,
            collider: false,
            once: true,
            onCollision: function(){
                console.log("crash");
                starring.changePose("crash", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(builldingUpCrash);
        objects.push(builldingUpCrash);

        const ed2 = document.getElementById('ed2');
        const eventED2 = new Obstacle({
            width: 10,
            height: 100,
            x: 3610,
            y: 50,
            collider: false,
            onCollision: function(){
                console.log("dance");
                starring.changePose("dance", { isForcePlay: true });
                ed2.classList.add('is-show');
                document.removeEventListener( 'keydown', onKeyDown, false );
                document.removeEventListener( 'keyup', onKeyUp, false );
                document.removeEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(eventED2);
        objects.push(eventED2);

        //--T
        const up_button = document.getElementById('up-button');
        const SkaraTK  = new Obstacle({
            width: 25,
            height: 100,
            x: 1559,
            y: 50,
            collider: false,
            onCollision: function(){
                up_button.classList.add('is-show');
                document.addEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(SkaraTK);
        objects.push(SkaraTK);

        const up_buttonRemove01  = new Obstacle({
            width: 25,
            height: 100,
            x: 1534,
            y: 50,
            collider: false,
            onCollision: function(){
                up_button.classList.remove('is-show');
                document.removeEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(up_buttonRemove01);
        objects.push(up_buttonRemove01);

        const up_buttonRemove02  = new Obstacle({
            width: 25,
            height: 100,
            x: 1584,
            y: 50,
            collider: false,
            onCollision: function(){
                up_button.classList.remove('is-show');
                document.removeEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(up_buttonRemove02);
        objects.push(up_buttonRemove02);

        const up_buttonRemove03  = new Obstacle({
            width: 5,
            height: 100,
            x: 3975,
            y: 50,
            collider: false,
            onCollision: function(){
                up_button.classList.remove('is-show');
                document.removeEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(up_buttonRemove03);
        objects.push(up_buttonRemove03);

        const up_buttonRemove04  = new Obstacle({
            width: 5,
            height: 100,
            x: 3965,
            y: 50,
            collider: false,
            onCollision: function(){
                up_button.classList.remove('is-show');
                document.removeEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(up_buttonRemove04);
        objects.push(up_buttonRemove04);

        const ThouseRemove = new Obstacle({
            width: 10,
            height: 100,
            x: 4080,
            y: 50,
            collider: false,
            onCollision: function(){
                scene.remove(Thouse.mesh)
            }
        });
        scene.add(ThouseRemove);
        objects.push(ThouseRemove);

        const ThouseAdd = new Obstacle({
            width: 10,
            height: 100,
            x: 4095,
            y: 50,
            collider: false,
            onCollision: function(){
                scene.add(Thouse.mesh)
            }
        });
        scene.add(ThouseAdd);
        objects.push(ThouseAdd);

        const furafura01 = new Obstacle({
            height: 100,
            x: 4250,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                kotoba08.classList.remove('is-show');
                starring.changePose("furafura", { isForcePlay: true })
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(furafura01);
        objects.push(furafura01);

        const HitGet = new Obstacle({
            width: 10,
            height: 100,
            x: 4505,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                scene.remove(HitKubaruT.mesh);
                scene.remove(haihuT.mesh);
                scene.add(deliverAnimation.body);
                deliverAnimation.changePose("deliver");
                deliverAnimation.skeletonMesh.state.tracks[0].loop = false;
                Hit01aT.timeline.play();
                Hit01bT.timeline.play();
                Hit01cT.timeline.play();
                scene.add(Hit01atMove.mesh);
                Hit01atMove.timeline.play();
                scene.add(Hit02atMove.mesh);
                Hit02atMove.timeline.play();
                scene.add(Hit03atMove.mesh);
                Hit03atMove.timeline.play();
                starring.changePose("deliverStand", { isForcePlay: true });
            }
        });
        scene.add(HitGet);
        objects.push(HitGet);

        const StarringGet = new Obstacle({
            width: 10,
            height: 100,
            x: 4575,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                starring.changePose("stop", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
                deliverAnimation.changePose("deliverOnce");
                deliverAnimation.skeletonMesh.state.tracks[0].loop = false;
                scene.add(Tkabe);
                objects.push(Tkabe);
            }
        });
        scene.add(StarringGet);
        objects.push(StarringGet);

        const kotoba08 = document.getElementById('kotoba08');
        const give = new Obstacle({
            height: 100,
            x: 4880,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                scene.remove(deliverAnimation.body);
                scene.remove(Hit01T.mesh);
                scene.add(givingAnimation.body);
                kotoba08.classList.add('is-show');
                givingAnimation.changePose("giving")
                givingAnimation.skeletonMesh.state.tracks[0].loop = false;
                starring.changePose("give", { isForcePlay: true })
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(give);
        objects.push(give);

        const furafura02 = new Obstacle({
            height: 100,
            x: 5000,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                kotoba08.classList.remove('is-show');
                starring.changePose("furafura", { isForcePlay: true })
                starring.skeletonMesh.state.tracks[0].loop = false;
            }
        });
        scene.add(furafura02);
        objects.push(furafura02);

        const ed1 = document.getElementById('ed1');
        const eventED1 = new Obstacle({
            width: 10,
            height: 100,
            x: 5100,
            y: 50,
            collider: false,
            onCollision: function(){
                console.log("drop");
                starring.changePose("drop", { isForcePlay: true });
                starring.skeletonMesh.state.tracks[0].loop = false;
                ed1.classList.add('is-show');
                document.removeEventListener( 'keydown', onKeyDown, false );
                document.removeEventListener( 'keyup', onKeyUp, false );
                document.removeEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(eventED1);
        objects.push(eventED1);

        //--K
        const TkaraK = new Obstacle({
            width: 10,
            height: 30,
            x: 4005,
            y: 58,
            collider: false,
            onCollision: function(){
                starring.body.position.x = 5430;
                starring.body.position.y = 40;
                scene.add(girlAnimation.body);
                girlAnimation.changePose("girl")
            }
        });
        scene.add(TkaraK);
        objects.push(TkaraK);

        const girlR = new Obstacle({
            height: 100,
            x: 5515,
            y: 40,
            collider: false,
            onCollision: function(){
                scene.add(girlAnimation.body);
                scene.add(notAnimation.body);
                girlAnimation.changePose("girlR")
                notAnimation.changePose("deliverNot")
            }
        });
        scene.add(girlR);
        objects.push(girlR);

        const room = new Obstacle({
            width: 19,
            height: 33,
            x: 5521,
            y: 60,
            collider: false,
            onCollision: function(){
                starring.body.position.x = 5920;
                starring.body.position.y = 40; 
                girlAnimation.changePose("girl")
            }
        });
        scene.add(room);
        objects.push(room);

        const KkaraK = new Obstacle({
            width: 13,
            height: 30,
            x: 5871,
            y: 58,
            collider: false,
            onCollision: function(){
                starring.body.position.x = 5430;
                starring.body.position.y = 40;
                girlAnimation.changePose("girl")
                kotoba09.classList.remove('is-show');
            }
        });
        scene.add(KkaraK);
        objects.push(KkaraK);

        const KhouseRemove = new Obstacle({
            width: 10,
            height: 100,
            x: 5956,
            y: 50,
            collider: false,
            onCollision: function(){
                scene.remove(Khouse.mesh)
            }
        });
        scene.add(KhouseRemove);
        objects.push(KhouseRemove);

        const KhouseAdd = new Obstacle({
            width: 10,
            height: 100,
            x: 5966,
            y: 50,
            collider: false,
            onCollision: function(){
                scene.add(Khouse.mesh)
            }
        });
        scene.add(KhouseAdd);
        objects.push(KhouseAdd);

        const kotoba09 = document.getElementById('kotoba09');
        const Hit03KMove = new Obstacle({
            height: 100,
            x: 6000,
            y: 50,
            collider: false,
            once: true,
            onCollision: function(){
                Hit03K.timeline.play();
                kotoba09.classList.add('is-show');
            }
        });
        scene.add(Hit03KMove);
        objects.push(Hit03KMove);


        runAnimation.timeline
        .to(runAnimation.body.position, {
            duration: 5,
            x: "-=0",
        })
        .to(runAnimation.body.position, {
            duration: 6,
            x: "-=300",
        })

        dinnerAnimation.timeline
        .to(dinnerAnimation.body.position, {
            duration: 10,
            z: "+=0",
        })
        .to(dinnerAnimation.body.position, {
            duration: 0.1,
            z: "+=1098",
        })
        
        const white = document.getElementById('white');
        const ed3 = document.getElementById('ed3');
        function setED3(){
            white.classList.remove('is-show');
        }
        const not = new Obstacle({
            height: 100,
            x: 6580,
            y: 45,
            collider: false,
            once: true,
            onCollision: function(){
                kotoba09.classList.remove('is-show');
                starring.changePose("stand");
                notAnimation.body.position.z = 80;
                notAnimation.changePose("not");
                notAnimation.skeletonMesh.state.tracks[0].loop = false;
                scene.add(runAnimation.body);
                runAnimation.changePose("run");
                runAnimation.skeletonMesh.state.tracks[0].loop = false;
                runAnimation.timeline.play();
                dinnerAnimation.changePose("dinner");
                dinnerAnimation.timeline.play();
                soukoK.timeline.play();
                K02.timeline.play();
                white.classList.add('is-show');
                window.setTimeout(setED3,10000);
                ed3.classList.add('is-show');
                document.removeEventListener( 'keydown', onKeyDown, false );
                document.removeEventListener( 'keyup', onKeyUp, false );
                document.removeEventListener( 'keydown', KeyDownUp, false );
            }
        });
        scene.add(not);
        objects.push(not);


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
            x: 500,
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
            x: 503,
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
            height: 80,
            x: 1005,
            y: 85,
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
            z: -2,
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

        const textureEnd = new Illusttexture({
            texture:'img/start01.png',
            width: 205,
            height: 665,
            x: 3713,
            y: 330,
            z: 0,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.8,
            repeatX: 0.35,
            repeatY: 1,
        })
        scene.add(textureEnd.mesh);

        //KTルート

        const KT1 = new Illusttexture({ //室内
            texture:'img/haikei01.png',
            width: 155,
            height: 115,
            x: 4017,
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
            width: 130,
            height: 100,
            x: 4022,
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
        const Thouse = new Illusttexture({
            texture:'img/haikei01.png',
            width: 172,
            height: 115,
            x: 4009,
            y: 50,
            z: 10,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.33,
            repeatX: 0.5,
            repeatY: 0.35,
        })

        const Hit01aT = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 4540,
            y: 17,
            z: 15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01aT.mesh);

        Hit01aT.timeline
        .to(Hit01aT.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit01aT.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit01aT.mesh.position, {
            duration: 2,
            x: "+=25",
        })
        .to(Hit01aT.mesh.position, {
            duration: 1.3,
            x: "+=0",
        })
        .to(Hit01aT.mesh.position, {
            duration: 0.1,
            z: "-=1000",
        })

        const Hit01bT = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 4530,
            y: 17,
            z: 14,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01bT.mesh);

        Hit01bT.timeline
        .to(Hit01bT.mesh.position, {
            duration: 0.2,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit01bT.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: 10,
            yoyo: true
        })
        .to(Hit01bT.mesh.position, {
            duration: 2,
            x: "+=15",
        })
        .to(Hit01bT.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "+=0.1",
            repeat: 8,
            yoyo: true
        })
        .to(Hit01bT.mesh.position, {
            duration: 3,
            x: "+=20",
        })
        .to(Hit01bT.mesh.position, {
            duration: 0.5,
            x: "+=0",
        })
        .to(Hit01bT.mesh.position, {
            duration: 0.1,
            z: "-=1000",
        })

        const Hit01cT = new Illusttexture({
            texture:'img/charactor.png',
            width: 18,
            height: 46,
            x: 4520,
            y: 17,
            z: 13,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.765,
            centerY: 0.15,
            repeatX: 0.08,
            repeatY: 0.2,
        })
        scene.add(Hit01cT.mesh);

        Hit01cT.timeline
        .to(Hit01cT.mesh.position, {
            duration: 0.2,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit01cT.mesh.rotation, {
            duration: 0.8,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: 12,
            yoyo: true
        })
        .to(Hit01cT.mesh.position, {
            duration: 4,
            x: "+=18",
        })
        .to(Hit01cT.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: 4,
            yoyo: true
        })
        .to(Hit01cT.mesh.position, {
            duration: 1,
            x: "+=0",
        })
        .to(Hit01cT.mesh.position, {
            duration: 2,
            x: "+=25",
        })
        .to(Hit01cT.mesh.position, {
            duration: 0.6,
            x: "+=0",
        })
        .to(Hit01cT.mesh.position, {
            duration: 0.1,
            z: "-=1000",
        })

        const Hit01atMove = new Illusttexture({
            texture:'img/charactor.png',
            width: 22,
            height: 46,
            x: 4570,
            y: 19,
            z: -1000,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.2,
        })

        Hit01atMove.timeline
        .to(Hit01atMove.mesh.position, {
            duration: 4.1,
            z: "+=0",
        })
        Hit01atMove.timeline
        .to(Hit01atMove.mesh.position, {
            duration: 0.1,
            z: "+=1030",
        })
        .to(Hit01atMove.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit01atMove.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit01atMove.mesh.position, {
            duration: 10,
            x: "-=300",
        })
        .to(Hit01atMove.mesh.position, {
            duration: 1,
            z: "-=1000",
        })

        const Hit02atMove = new Illusttexture({
            texture:'img/charactor.png',
            width: 22,
            height: 46,
            x: 4570,
            y: 19,
            z: -1000,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.2,
        })

        Hit02atMove.timeline
        .to(Hit02atMove.mesh.position, {
            duration: 6.9,
            z: "+=0",
        })
        .to(Hit02atMove.mesh.position, {
            duration: 0.1,
            z: "+=1030",
        })
        .to(Hit02atMove.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit02atMove.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit02atMove.mesh.position, {
            duration: 10,
            x: "-=300",
        })
        .to(Hit02atMove.mesh.position, {
            duration: 1,
            z: "-=1000",
        })

        const Hit03atMove = new Illusttexture({
            texture:'img/charactor.png',
            width: 22,
            height: 46,
            x: 4570,
            y: 19,
            z: -1000,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.2,
        })

        Hit03atMove.timeline
        .to(Hit03atMove.mesh.position, {
            duration: 9.2,
            z: "+=0",
        })
        .to(Hit03atMove.mesh.position, {
            duration: 0.1,
            z: "+=1030",
        })
        .to(Hit03atMove.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit03atMove.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit03atMove.mesh.position, {
            duration: 10,
            x: "-=300",
        })
        .to(Hit03atMove.mesh.position, {
            duration: 1,
            z: "-=1000",
        })

        const HitKubaruT = new Illusttexture({
            texture:'img/charactor.png',
            width: 28,
            height: 44,
            x: 4573,
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
            height: 46,
            x: 4577,
            y: 15,
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
            width: 37,
            height: 27,
            x: 4901,
            y: 7,
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
            x: 5472,
            y: 81,
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
            x: 5470,
            y: 60,
            z: -19,
            offsetX: 0,
            offsetY: 0,
            centerX: 0,
            centerY: 0.3,
            repeatX: 0.5,
            repeatY: 0.25,
        })
        scene.add(desk01.mesh);

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
            width: 130,
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
            z: -30,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0,
            repeatX: 0.1,
            repeatY: 0.2,
        })
        scene.add(Hit03K.mesh);

        Hit03K.timeline
        .to(Hit03K.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit03K.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit03K.mesh.position, {
            duration: 30,
            x: "-=830",
        })

        const Khouse = new Illusttexture({
            texture:'img/haikei01.png',
            width: 172,
            height: 115,
            x: 5880,
            y: 50,
            z: 10,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0.33,
            repeatX: 0.5,
            repeatY: 0.35,
        })

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

        soukoK.timeline
        .to(soukoK.mesh.position, {
            duration: 10,
            z: "+=0",
        })
        .to(soukoK.mesh.position, {
            duration: 0.1,
            z: "-=1000",
        })

        const K02 = new Illusttexture({
            texture:'img/haikei01.png',
            width: 130,
            height: 80,
            x: 6570,
            y: 39.3,
            z: -1000,
            offsetX: 0,
            offsetY: 0,
            centerX: 1,
            centerY: 0,
            repeatX: 0.45,
            repeatY: 0.23,
        })
        scene.add(K02.mesh);

        K02.timeline
        .to(K02.mesh.position, {
            duration: 10,
            z: "+=0",
        })
        .to(K02.mesh.position, {
            duration: 0.1,
            z: "+=1095",
        })

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

        const flower = new Illusttexture({
            texture:'img/haikei03.png',
            width: 30,
            height: 34,
            x: 8020,
            y: 10,
            z: -15,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.6,
            centerY: 0.25,
            repeatX: 0.2,
            repeatY: 0.2,
        })
        scene.add(flower.mesh);

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
            x: 8150,
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
        carH.timeline
        .to(carH.mesh.position, {
            duration: 4,
            x: "-=400",
        })
        .to(carH.mesh.position, {
            duration: 1,
            z: "-=800",
        })

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
            width: 17,
            height: 45,
            x: 8600,
            y: 20,
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
            z: 60,
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
            x: 9400,
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

        Hit02H.timeline
        .to(Hit02H.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit02H.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit02H.mesh.position, {
            duration: 10,
            x: "-=630",
        })

        const Hit03H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 50,
            x: 9300,
            y: 20,
            z: 40,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.55,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit03H.mesh);

        Hit03H.timeline
        .to(Hit03H.mesh.position, {
            duration: 0.3,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit03H.mesh.rotation, {
            duration: 0.8,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit03H.mesh.position, {
            duration: 16,
            x: "-=530",
        })

        const Hit04H = new Illusttexture({
            texture:'img/charactor.png',
            width: 13,
            height: 49,
            x: 9300,
            y: 19,
            z: 40,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.47,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit04H.mesh);

        Hit04H.timeline
        .to(Hit04H.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit04H.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit04H.mesh.position, {
            duration: 13,
            x: "-=530",
        })

        const Hit05H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 50,
            x: 9200,
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

        Hit05H.timeline
        .to(Hit05H.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit05H.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit05H.mesh.position, {
            duration: 10,
            x: "-=430",
        })

        const Hit06H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 51,
            x: 9300,
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

        Hit06H.timeline
        .to(Hit06H.mesh.position, {
            duration: 0.18,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit06H.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit06H.mesh.position, {
            duration: 16,
            x: "-=530",
        })

        const Hit07H = new Illusttexture({
            texture:'img/charactor.png',
            width: 15,
            height: 50,
            x: 9300,
            y: 19,
            z: 40,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.24,
            centerY: 0.55,
            repeatX: 0.06,
            repeatY: 0.2,
        })
        scene.add(Hit07H.mesh);

        Hit07H.timeline
        .to(Hit07H.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit07H.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit07H.mesh.position, {
            duration: 11,
            x: "-=500",
        })

        const Hit08H = new Illusttexture({
            texture:'img/charactor.png',
            width: 14,
            height: 28,
            x: 9200,
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

        Hit08H.timeline
        .to(Hit08H.mesh.position, {
            duration: 0.15,
            ease: "power2.out",
            y: "+=1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit08H.mesh.rotation, {
            duration: 0.5,
            ease: "back.inOut(2)",
            z: "-=0.1",
            repeat: -1,
            yoyo: true
        })
        .to(Hit08H.mesh.position, {
            duration: 10,
            x: "-=400",
        })

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
            x: 9790,
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
            z: 50,
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
            x: 9840,
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
            x: 10000,
            y: 3,
            z: 50,
            offsetX: 0,
            offsetY: 0,
            centerX: 0.8,
            centerY: 0.35,
            repeatX: 0.2,
            repeatY: 0.1,
        })
        scene.add(Hit15H.mesh);

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
            x: 5178,
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
            width: 120.5,
            height: 27,
            x: 5474.4,
            y: 33.3,
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
            x: 5780,
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
    fourAnimationH.animate();
    doctorAnimation.animate();
    deliverAnimation.animate();
    givingAnimation.animate();
    dinnerAnimation.animate();
    runAnimation.animate();
    girlAnimation.animate();
    notAnimation.animate();
    runAnimation.animate();

    const cameraPosition = starring.body.position
        .clone()
        .add(
            new THREE.Vector3(
                0 + pedestal.x,
                30 + pedestal.y,
                100 + pedestal.z
            )
        );
    camera.position.lerp(cameraPosition, 1.0);

    renderer.render( scene, camera );

};
       

//ウィンドウの大きさ
//文字の元サイズ

