var mesh, renderer, scene, camera;

var gui;

var API = {
    offsetX: 0, //画像に対してX方向
    offsetY: 1,
    repeatX: 2, //一面に横何回繰り返すか
    repeatY: 2,
    //rotation: Math.PI / 4, 
    rotation: 0, //正の数…時計周り　負の数…反時計回り 
    centerX: 0.5, //面に対してX方向
    centerY: 0.5
};

init();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 10, 15, 25 );
    scene.add( camera );

    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    var geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );

    new THREE.TextureLoader().load( 'img/move.png', function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //wrapS水平　wrapT垂直
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        //texture.matrixAutoUpdate = false; // default true; set to false to update texture.matrix manually

        var material = new THREE.MeshBasicMaterial( { map: texture } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        updateUvTransform();

        initGui();

        render();

    } );

    window.addEventListener( 'resize', onWindowResize, false );

}

function render() {

    renderer.render( scene, camera );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function updateUvTransform() {

    var texture = mesh.material.map;

    if ( texture.matrixAutoUpdate === true ) {

        texture.offset.set( API.offsetX, API.offsetY );
        texture.repeat.set( API.repeatX, API.repeatY );
        texture.center.set( API.centerX, API.centerY );
        texture.rotation = API.rotation;

    } else {

        // これでもいいし、
        //texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );

        // これでもいい
        texture.matrix
            .identity()
            .translate( - API.centerX, - API.centerY )
            .rotate( API.rotation )					// I don't understand how rotation can preceed scale, but it seems to be required...
            .scale( API.repeatX, API.repeatY )
            .translate( API.centerX, API.centerY )
            .translate( API.offsetX, API.offsetY );

    }

    render();

}

function initGui() {

    gui = new dat.GUI();

    gui.add( API, 'offsetX', 0.0, 1.0 ).name( 'offset.x' ).onChange( updateUvTransform );
    gui.add( API, 'offsetY', 0.0, 1.0 ).name( 'offset.y' ).onChange( updateUvTransform );
    gui.add( API, 'repeatX', 0.25, 2.0 ).name( 'repeat.x' ).onChange( updateUvTransform );
    gui.add( API, 'repeatY', 0.25, 2.0 ).name( 'repeat.y' ).onChange( updateUvTransform );
    gui.add( API, 'rotation', - 2.0, 2.0 ).name( 'rotation' ).onChange( updateUvTransform );
    gui.add( API, 'centerX', 0.0, 1.0 ).name( 'center.x' ).onChange( updateUvTransform );
    gui.add( API, 'centerY', 0.0, 1.0 ).name( 'center.y' ).onChange( updateUvTransform );

}