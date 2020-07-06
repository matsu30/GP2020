
//---------素材並べる----------------------

var camera, scene, light, renderer;

var objects = [];

var vertex = new THREE.Vector3();
var color = new THREE.Color();

var texture1  = new THREE.ImageUtils.loadTexture('img/1-1-3.png');

var characterGeometry = new THREE.PlaneBufferGeometry( 10.6, 12.4 );
var characterMaterial = new THREE.MeshBasicMaterial( {map: texture1, transparent: true} );
var character = new THREE.Mesh( characterGeometry, characterMaterial );

const starring = new Starring();
const obstacle = new Obstacle({
    x: 20,
    y: 0,
    z: 0
});

const obstacle1 = new Obstacle({
    color: 0xff2323,
    x: -20,
    y: 0,
    z: 0
});

console.log(obstacle);

//---------素材並べた----------------------

init();
animate();

function init() {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 100;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

        light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        scene.add(starring.body);
        scene.add(obstacle.mesh);
        scene.add(obstacle1.mesh);

        objects.push(obstacle.mesh);
        objects.push(obstacle1.mesh);


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
        var boxGeometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

        // 各面に一点の頂点があるのは床と同じ。色も同じように定義する。
        boxGeometry = boxGeometry.toNonIndexed();
        position = boxGeometry.attributes.position;

        colors = [];
        for ( var i = 0, l = position.count; i < l; i ++ ) {

            color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            colors.push( color.r, color.g, color.b );

        }
        boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

        for ( var i = 0; i < 50; i ++ ) {

            var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
            boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

            var box = new THREE.Mesh( boxGeometry, boxMaterial );
            box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
            box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
            box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

            scene.add( box );
            objects.push( box );

        }

        
        //---------character-------------------------------------
        character.position.z = camera.position.z - 15;
        character.position.y = 10;
        scene.add( character );


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

    const cameraPosition = starring.body.position.clone().add(new THREE.Vector3(0, 0, 100));
    camera.position.lerp(cameraPosition, 0.2);

    renderer.render( scene, camera );

};
       



