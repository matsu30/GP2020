
//---------素材並べる----------------------

var camera, scene, light, renderer, controls;

var objects = [];

var raycaster;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

//---------素材並べた----------------------

init();
animate();

function init() {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.y = 10;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

        light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        // controls = new THREE.PointerLockControls( camera, document.body );



        //---------開始時------------------------------------------------------
        var blocker = document.getElementById( 'blocker' );
        var instructions = document.getElementById( 'instructions' );

        //開始時にクリックすると、controlsがロックされる
        // instructions.addEventListener( 'click', function () {
        //     controls.lock();
        // }, false );

        //controlsがロックされていると、開始画面が消える
        // controls.addEventListener( 'lock', function () {
        //     instructions.style.display = 'none';
        //     blocker.style.display = 'none';
        // } );

        // controls.addEventListener( 'unlock', function () {
        //     blocker.style.display = 'block';
        //     instructions.style.display = '';
        // } );

        // scene.add( controls.getObject() );



        //--------開始-----------------------------------------------------------

        //ボタンを押す
        var onKeyDown = function ( event ) {

            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    moveLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;

                case 32: // space
                    if ( canJump === true ) velocity.y += 350;
                    canJump = false;
                    break;

            }

        };

        //ボタンを離す
        var onKeyUp = function ( event ) {

            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    moveForward = false;
                    break;

                case 37: // left
                case 65: // a
                    moveLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = false;
                    break;

            }

        };

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    
    
        //--------------床----------------------------------------
　      var floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
        floorGeometry.rotateX( - Math.PI / 2 );


        // 頂点を変えるらしい
        var position = floorGeometry.attributes.position;

        for ( var i = 0, l = position.count; i < l; i ++ ) {

            vertex.fromBufferAttribute( position, i );

            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

            position.setXYZ( i, vertex.x, vertex.y, vertex.z );

        }

        // 各面に一点の頂点があるらしい。まぁせやな。
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

        for ( var i = 0; i < 500; i ++ ) {

            var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
            boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

            var box = new THREE.Mesh( boxGeometry, boxMaterial );
            box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
            box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
            box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

            scene.add( box );
            objects.push( box );

        }


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

    //controlsがロックされているとき。つまり開始しているとき。
    // if ( controls.isLocked === true ) {

        // raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects( objects );

        var onObject = intersections.length > 0;

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // これにより、すべての方向に一貫した動きが保証されます

        // A||Bとは、Aが正しい場合はAを返し、そうでない場合Bを返す。真偽値問われた場合、どちらかが正しければtrue、そうでなければfalse。
        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }

        // controls.moveRight( - velocity.x * delta );
        // controls.moveForward( - velocity.z * delta );

        // controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        // if ( controls.getObject().position.y < 10 ) {
        //     velocity.y = 0;
        //     controls.getObject().position.y = 10;
        //     canJump = true;
        // }

        prevTime = time;

    // }

    renderer.render( scene, camera );

}
