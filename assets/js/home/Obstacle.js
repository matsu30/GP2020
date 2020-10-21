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
            z: 0
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

    }


    // 主人公と交差したときの処理
    // クラスの中にある関数のことをメソッドとよぶ
    onCollsion() {
        console.log(`交差しました`);
    }

}