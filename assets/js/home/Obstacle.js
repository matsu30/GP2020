class Obstacle extends THREE.Mesh {

    constructor(keydata){
        //console.log("Obstacle constructor", keydata);

        const defaults = {
            width: 20,
            height: 20,
            depth: 20,
            // 障害物として機能するかの真偽値
            // false の場合は交差の判定はするが、通過できる
            collider: true, 
            color: 0xf99fff,
            transparent: true,
            opacity: 0.5,
            x: 0,
            y: 0,
            z: 0,
            rotation: 0,
            once: false,
            onCollision: function(){},
            //衝突中かの真偽値
            isCollision: false
        };

        keydata = Object.assign({}, defaults, keydata)

        const boxGeometry = new THREE.BoxBufferGeometry(
            keydata.width,
            keydata.height,
            keydata.depth,
        );
        const material = new THREE.MeshBasicMaterial({
            color: keydata.color,
            transparent: keydata.transparent,
            opacity: keydata.opacity,
        });

        super( boxGeometry, material );
        
        this.position.x = keydata.x;
        this.position.y = keydata.y;
        this.position.z = keydata.z;

        this.rotation.z = keydata.rotation;

        this.collider = keydata.collider;
        this.once = keydata.once;
        this.onCollision = keydata.onCollision;
        this.isCollision = keydata.isCollision;

        this._counter = 0;

        // 主人公と交差したときの処理
        // クラスの中にある関数のことをメソッドとよぶ
        this.collision = function(){
            console.log(this.once, this._counter)
            if (this.once && this._counter > 0){
                return;
            }

            if (this.isCollision === false){
                this._counter += 1;
                this.onCollision();
            }

            
            this.isCollision = true;
        };

    }

}