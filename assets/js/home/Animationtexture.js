class Animationtexture{

  constructor() {

    this.SKELETON_FILE = "skeleton.json";
    this.ATLAS_FILE = "skeleton.atlas";
    this.assetManager = new spine.threejs.AssetManager("assets/spine/right/");
    this.skeletonMesh = undefined;

    const geometry = new THREE.BoxBufferGeometry(
      20,
      650,
      0
    );

    const material = new THREE.MeshBasicMaterial({
      transparent: true, 
      opacity: 0,
    });

    this.body = new THREE.Mesh(geometry, material);
    this.body.geometry.computeBoundingBox();

  };

  load(){
    const promise0 = new Promise((resolve) => {
      this.assetManager.loadText(this.SKELETON_FILE, (path) => {
        //load成功
        console.log(`[Animationtexture] ${path} Load Complete.`);
        resolve();
      });
    });

    const promise1 = new Promise((resolve) => {
      this.assetManager.loadTextureAtlas(this.ATLAS_FILE, (path) => {
        // load 成功
        console.log(`[Animationtexture] ${path} Load Complete.`);
        resolve();
      });
    });
      
    (async() => {
      await Promise.all([promise0, promise1]);
  
      const atlas = this.assetManager.get(this.ATLAS_FILE);
  
      const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
  
      const skeletonJson = new spine.SkeletonJson(atlasLoader);
  
      skeletonJson.scale = 0.18;
      const skeletonData = skeletonJson.readSkeletonData(
        this.assetManager.get(this.SKELETON_FILE)
      );
  
      this.skeletonMesh = new spine.threejs.SkeletonMesh(
        skeletonData,
        (parameters) => {
          parameters.depthTest = false;
        }
      );
  
      this.skeletonMesh.state.setAnimation(0, "four", true);
      this.body.add(this.skeletonMesh);
  
      console.log("[Animationtexture] Spine Aseets Load Complete.");
    })();

    this.clock = new THREE.Clock();
    this.timeline = gsap.timeline({ paused: true });

  };

  // changePose
  // 引数 animetionName に渡された名前のアニメーションに変更する
  changePose(
    animationName,
    options = {
       isForcePlay: false
    }
  ){
    //　設定されたアニメーションを終了まで再生中であれば何もせず終了
    if (this._isForcePlaying) return;

    // アニメーションを切り替える
    this.skeletonMesh.state.setAnimation(0, animationName, true);

    if (options.isForcePlay){
      // アニメーションを最後まで再生するフラグを立てる
      this._isForcePlaying = true;
      this._canJump = false;

      // アニメーションが完了したときの処理をすべて廃棄する
      this.skeletonMesh.state.clearListeners();

      this.skeletonMesh.state.addListener({
        // アニメーションが完了したときの処理
        complete: () => {
          // アニメーションを最後まで再生するフラグを戻す
          this._isForcePlaying = false;
        }
      });
    };
  };

  animate() {

    const delta = Math.min(this.clock.getDelta(), 0.02);

    if (this.skeletonMesh){
      this.skeletonMesh.update(delta);
    }
  }  
}

