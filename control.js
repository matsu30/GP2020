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
  renderer.setClearColor(0x868686);
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
  const camera = new THREE.OrthographicCamera(-480, +480, 270, -270, 1, 1000);
  

  // カメラの初期座標を設定
  camera.position.set(0, 0, 100);

  // カメラコントローラーを作成
//   const controls = new THREE.OrbitControls(camera, renderer.domElement);
//   controls.addEventListener('change', render);




  
  //======================================
  //オブジェクトの作成
  //======================================

  const Geome1 = new THREE.BoxGeometry(1000, 300, 10);
  const Geome2 = new THREE.BoxGeometry(100, 100, 10);

  const sphere1 = new THREE.MeshLambertMaterial( {
    color: 0xD2D2D2,
  });
  const sphere2 = new THREE.MeshLambertMaterial( {
    color: 0x2d2d2d,
  });

  const mesh1 = new THREE.Mesh(Geome1, sphere1);
  const mesh2 = new THREE.Mesh(Geome2, sphere2);

  scene.add( mesh1 );
  scene.add( mesh2 );
  mesh1.position.set(0,-300,10)
  mesh2.position.set(-300,-100,0)

  //======================================
  //オブジェクトの制御
  //======================================


    window.addEventListener("keydown", handleKeydown);
    function handleKeydown(event){
        var keyCode = event.keyCode;
        if (keyCode == 39) {
            mesh2.position.x += 10;
        } else if (keyCode == 37) {
            mesh2.position.x -= 10;
        } else if (keyCode == 32) {
            mesh2.position.y += 10;
        };
    };

    // gsap.to(
    //     graph
    //     graph, { duration: 
    //     2.5
    //     2.5, ease: 
    //     CustomEase.create("custom", "M0,0 C0.2,0 0.4,0.392 0.57,0.512 0.789,0.666 0.954,0.112 1,0 "), y: -500 });
 

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