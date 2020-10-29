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
    // this.body.position.y = 500;
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

    // 主人公の移動速度
    this.PLAYERSPEED = 2500.0;

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

    skeletonJson.scale = 0.1;
    const skeletonData = skeletonJson.readSkeletonData(
      this.assetManager.get(this.SKELETON_FILE)
    );

    this.skeletonMesh = new spine.threejs.SkeletonMesh(
      skeletonData,
      (parameters) => {
        parameters.depthTest = false;
      }
    );

    this.skeletonMesh.state.setAnimation(0, "animation", true);
    this.body.add(this.skeletonMesh);

    console.log("[Starring] Spine Aseets Load Complete.");

  })();

  };



  animate(objects) {
    // 1コマ前から経過した時間を取得する
    const delta = this.clock.getDelta();
    
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

      if (this.moveLeft) {
        this._playerVelocity.x -= this.PLAYERSPEED * delta;
      }

      if (this.moveRight) {
        this._playerVelocity.x += this.PLAYERSPEED * delta;
      }

      this.body.translateX(this._playerVelocity.x * delta);
      this.body.translateZ(this._playerVelocity.z * delta);
    }

    this.body.position.y += this._playerVelocity.y * delta;

    if (this.body.position.y < y) {
      this.body.position.y = y;
      this._playerVelocity.y = 0;
      this._canJump = true;
    }

    if (this.skeletonMesh){
      this.skeletonMesh.update(delta);
    }

  }

  jump() {
    if (this._canJump) {
      this._playerVelocity.y += 300;
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

    const backwardVector = new THREE.Vector3(0, 0, 1);
    const forwardVector = new THREE.Vector3(0, 0, -1);
    const leftVector = new THREE.Vector3(-1, 0, 0);
    const rightVector = new THREE.Vector3(1, 0, 0);

    const collisionDistanceX = this.body.geometry.boundingBox.max.x;
    const collisionDistanceZ = this.body.geometry.boundingBox.max.z;

    // 前方向との衝突判定
    const raycaster = new THREE.Raycaster(this.body.position, forwardVector);
    let intersectObjects = raycaster.intersectObjects(objects);

    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      if (
        intersectObjects[i].distance < collisionDistanceZ &&
        this.moveForward
      ) {
        intersectObjects[i].object.collision();

        if (intersectObjects[i].object.collider){
          result.forward = true;
        }
       
      } else {
        intersectObjects[i].object.isCollision = false;
      }
    }

    // 後方向との衝突判定
    raycaster.set(this.body.position, backwardVector);
    intersectObjects = raycaster.intersectObjects(objects);

    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      if (
        intersectObjects[i].distance < collisionDistanceZ &&
        this.moveBackward
      ) {
        intersectObjects[i].object.collision();

        if (intersectObjects[i].object.collider){
          result.backward = true;
        }
       
      } else {
        intersectObjects[i].object.isCollision = false;
      }
    }

    // 左方向との衝突判定
    raycaster.set(this.body.position, leftVector);
    intersectObjects = raycaster.intersectObjects(objects);

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

