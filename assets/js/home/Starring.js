class Starring {
  /**
   * constructor
   * コンストラクター
   * インスタンスが作られるときに一度だけ処理される
   */
  constructor(keydata) {
    const defaults = {
      width: 20,
      height: 20,
      depth: 20,
    };

    this.keydata = Object.assign(defaults, keydata);

    const geometry = new THREE.BoxBufferGeometry(
      this.keydata.width,
      this.keydata.height,
      this.keydata.depth
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
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
    this.PLAYERSPEED = 500.0;

    this.clock = new THREE.Clock();
  }

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
    const intersectObjects = raycaster.intersectObjects(objects);
    
    let y = 0;

    // 衝突しているオブジェクトの中で、一番「高い位置」のものを取得する
    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      y = Math.max(y, intersectObjects[i].point.y);
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
        result.forward = true;
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
        result.backward = true;
      }
    }

    // 左方向との衝突判定
    raycaster.set(this.body.position, leftVector);
    intersectObjects = raycaster.intersectObjects(objects);

    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      if (intersectObjects[i].distance < collisionDistanceX && this.moveLeft) {
        result.left = true;
      }
    }

    // 右方向との衝突判定
    raycaster.set(this.body.position, rightVector);
    intersectObjects = raycaster.intersectObjects(objects);

    for (let i = 0, len = intersectObjects.length; i < len; i++) {
      if (intersectObjects[i].distance < collisionDistanceX && this.moveRight) {
        result.right = true;
      }
    }

    return result;
  }
}
