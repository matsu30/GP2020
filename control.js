window.addEventListener('load', init);

function init() {

  // サイズを指定
  const width =  window.Width;
  const height = window.Height;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0xfffffff);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.localClippingEnabled = true;

  // シーンを作成
  const scene = new THREE.Scene();

  //　光源を作成
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  const directionalLight = new THREE.DirectionalLight(0xdfebff, 1.0);
  directionalLight.position.set(400, 200, 300);
  scene.add(ambientLight);
  scene.add(directionalLight);

  // カメラを作成
  // new THREE.OrthographicCamera(left, right, top, bottom, near, far)
  const camera = new THREE.OrthographicCamera(-960, +960, 540, -540, 1, 100);
  

  // カメラの初期座標を設定
  camera.position.set(0, 0, 100);

  // カメラコントローラーを作成
//   const controls = new THREE.OrbitControls(camera, renderer.domElement);
//   controls.addEventListener('change', render);




  
  //======================================
  //オブジェクトの作成
  //======================================

  var texture1  = new THREE.ImageUtils.loadTexture('img/1-1-1.png');
  var texture2  = new THREE.ImageUtils.loadTexture('img/1-1-2.png');
  var texture3  = new THREE.ImageUtils.loadTexture('img/1-1-3.png');
  var texture4  = new THREE.ImageUtils.loadTexture('img/1-1-4.png');
  var texture5  = new THREE.ImageUtils.loadTexture('img/1-1-5.png');

  var texture6 = new THREE.ImageUtils.loadTexture('img/CharaMove.png');

  const Geome1 = new THREE.PlaneBufferGeometry(1750, 380);
  const Geome2 = new THREE.PlaneBufferGeometry(230, 50);
  const Geome3 = new THREE.PlaneBufferGeometry(530, 620);
  const Geome4 = new THREE.PlaneBufferGeometry(300, 400);
  const Geome5 = new THREE.PlaneBufferGeometry(1920, 470);
  const Geome6 = new THREE.PlaneBufferGeometry(164, 319);

  const sphere1 = new THREE.MeshBasicMaterial( {map: texture1, transparent: true} );
  const sphere2 = new THREE.MeshBasicMaterial( {map: texture2, transparent: true} );
  const sphere3 = new THREE.MeshBasicMaterial( {map: texture3, transparent: true} );
  const sphere4 = new THREE.MeshBasicMaterial( {map: texture4, transparent: true} );
  const sphere5 = new THREE.MeshBasicMaterial( {map: texture5, transparent: true, alphaTest:1} );
  const sphere6 = new THREE.MeshBasicMaterial( {map: texture6, transparent: true} );

  const mesh1 = new THREE.Mesh(Geome1, sphere1);
  const mesh2 = new THREE.Mesh(Geome2, sphere2);
  const mesh3 = new THREE.Mesh(Geome3, sphere3);
  const mesh4 = new THREE.Mesh(Geome4, sphere4);
  const mesh5 = new THREE.Mesh(Geome5, sphere5);
  const mesh6 = new THREE.Mesh(Geome6, sphere6);

  scene.add( mesh1, mesh2, mesh3, mesh4, mesh5, mesh6);

  mesh1.position.set(-100,-350,50)
  mesh2.position.set(220,-270,40)
  mesh3.position.set(330,20,30)
  mesh4.position.set(220,-70,20)
  mesh5.position.set(0,-300,10)
  mesh6.position.set(-700,-130,45)
  //======================================
  //オブジェクトの制御
  //======================================


    window.addEventListener("keydown", handleKeydown);
    function handleKeydown(event){
        var keyCode = event.keyCode;
        if (keyCode == 39) {
            mesh6.position.x += 10;
        } else if (keyCode == 37) {
            mesh6.position.x -= 10;
        } else if (keyCode == 32) {
            mesh6.position.y += 10;
        };
    };

 

  //======================================
  //dat.GUI
  //======================================
 


  //======================================
  //リサイズ云々
  //======================================

	// 初期化のために実行
	onResize();
	// リサイズイベント発生時に実行
	window.addEventListener('resize', onResize);
	function onResize() {
		// サイズを取得
		const width = window.innerWidth;
		const height = window.innerHeight;
		// レンダラーのサイズを調整する
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		// カメラのアスペクト比を正す
		camera.aspect = width / height;
        camera.updateProjectionMatrix();
	}

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  render();
  tick();
  
}