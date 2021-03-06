class Starring {
  /**
   * constructor
   * コンストラクター
   * インスタンスが作られるときに一度だけ処理される
   */
  constructor(keydata) {
    const defaults = {
      width: 20,
      height: 30,
      depth: 1,
    };

    this.keydata = Object.assign(defaults, keydata);
    this.SKELETON_FILE = "skeleton.json";
    this.ATLAS_FILE = "skeleton.atlas";

    const geometry = new THREE.BoxBufferGeometry(
      this.keydata.width,
      this.keydata.height,
      this.keydata.depth
    );
    //var textureSta  = new THREE.ImageUtils.loadTexture('img/move.png');
    const material = new THREE.MeshBasicMaterial({
      //map: textureSta,
      transparent: true, opacity: 0,
    });

    this.body = new THREE.Mesh(geometry, material);
    this.body.geometry.computeBoundingBox();
    this.bodyPositionY = this.body.position.y;

    // 主人公の移動方向を決定するフラグ
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    // ジャンプできる状態かのフラグ
    this._canJump = true;

    // 主人公の速度ベクトル
    this._playerVelocity = new THREE.Vector3();

    //アニメーションを最後まで再生中かの真偽値
    this._isForcePlaying = false;

    // 主人公の移動速度400
    this.PLAYERSPEED = 400.0;

    this.clock = new THREE.Clock();

    //spineを使う準備をする
    this.assetManager = new spine.threejs.AssetManager("assets/spine/right/");
    this.skeletonMesh = undefined;
  }

  load(){
    const promise0 = new Promise((resolve) => {
      this.assetManager.loadText(this.SKELETON_FILE, (path) => {
        //load成功
        console.log(`[Starring] ${path} Load Complete.`);
        resolve();
      });
    });

    const promise1 = new Promise((resolve) => {
      this.assetManager.loadTextureAtlas(this.ATLAS_FILE, (path) => {
        // load 成功
        console.log(`[Starring] ${path} Load Complete.`);
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

    this.skeletonMesh.state.setAnimation(0, "stand", true);
    this.body.add(this.skeletonMesh);

    console.log("[Starring] Spine Aseets Load Complete.");

  })();

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



  animate(objects) {
    // 1コマ前から経過した時間を取得する
    const delta = Math.min(this.clock.getDelta(), 0.02);
    
    // 床にめり込まないために必要なオフセット値（主人公の高さの半分）
    const offsetY = this.body.geometry.boundingBox.max.y;
    
    // 下（床）方向との衝突判定
    const raycaster = new THREE.Raycaster(
      this.body.position,
      new THREE.Vector3(0, -1, 0)
    );
    //交差を調べるTHREE.Meshの配列を引数に渡す
    const intersectObjects = raycaster.intersectObjects(objects);
    
    let y = 0;

    // 衝突しているオブジェクトの中で、一番「高い位置」のものを取得する
    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      if (intersectObjects[i].object.collider) {
      y = Math.max(y, intersectObjects[i].point.y);
      } else {
        // イベントのトリガーになっている通過できる、
        // Obstacle のインスタンスとの処理
        if (intersectObjects[i].distance < offsetY * 2) {
          // 主人公の身体の一部がイベントのトリガーと触れたときの処理
          intersectObjects[i].object.collision();
        } else{
          // 障害物との距離があると気に衝突判定のフラグを戻す
          intersectObjects[i].object.isCollision = false;
        }
      }
    }

    y = y + offsetY;

    // 緩やかに減速するようにする
    this._playerVelocity.x -= this._playerVelocity.x * 10.0 * delta;
    this._playerVelocity.y -= 1000.0 * delta;
    this._playerVelocity.z -= this._playerVelocity.z * 10.0 * delta;

    // 前後左右との衝突判定をする
    const collision = this.detectCollision(objects);

    if (
      collision.forward ||
      collision.backward ||
      collision.left ||
      collision.right
    ) {
      this._playerVelocity.x = 0;
      this._playerVelocity.z = 0;
    } else {
      if (this.moveForward) {
        this._playerVelocity.z -= this.PLAYERSPEED * delta;
      }

      if (this.moveBackward) {
        this._playerVelocity.z += this.PLAYERSPEED * delta;
      }

      if (this.moveLeft && !this._isForcePlaying) {
        this._playerVelocity.x -= this.PLAYERSPEED * delta;
      }

      if (this.moveRight && !this._isForcePlaying) {
        this._playerVelocity.x += this.PLAYERSPEED * delta;
      }

      this.body.translateX(this._playerVelocity.x * delta);
      this.body.translateZ(this._playerVelocity.z * delta);
    }

    this.body.position.y += this._playerVelocity.y * delta;

    if (this.body.position.y < y) {
      this.body.position.y = y;
      this._playerVelocity.y = 0;

      if (!this._isForcePlaying){
        this._canJump = true;
      }
    }

    if (this.skeletonMesh){
      this.skeletonMesh.update(delta);
    }

  }

  jump() {
    if (this._canJump) {
      this._playerVelocity.y += 280;
    }

    this._canJump = false;
  }

  detectCollision(objects) {
    // 衝突判定の結果 Object
    // 衝突している方向の真偽値が true となる
    const result = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };

    const leftVector = new THREE.Vector3(-1, 0, 0);
    const rightVector = new THREE.Vector3(1, 0, 0);

    const collisionDistanceX = this.body.geometry.boundingBox.max.x;

    const raycaster = new THREE.Raycaster(this.body.position, leftVector);
    let intersectObjects = raycaster.intersectObjects(objects);

    // 左方向との衝突判定
    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      if (
        intersectObjects[i].distance < collisionDistanceX &&
        this.moveLeft
      ) {
        intersectObjects[i].object.collision();

        if (intersectObjects[i].object.collider){
          result.left = true;
        }
       
      } else {
        intersectObjects[i].object.isCollision = false;
      }
    }

    // 右方向との衝突判定
    raycaster.set(this.body.position, rightVector);
    intersectObjects = raycaster.intersectObjects(objects);

    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      if (
        intersectObjects[i].distance < collisionDistanceX &&
        this.moveRight
      ) {
        intersectObjects[i].object.collision();

        if (intersectObjects[i].object.collider){
          result.right = true;
        }
       
      } else {
        intersectObjects[i].object.isCollision = false;
      }
    }

    return result;
  }
}

