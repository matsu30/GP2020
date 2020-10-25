class Illusttexture{

    constructor(keydata){
        //console.log("Illusttexture constructor", keydata);

        const defaults = {
            texture: '',
            width: 20,
            height: 20,
            x: 0,
            y: 0,
            z: 0,
            transparent: true,
            opacity: 0.5,
            offsetX: 0, //画像に対してX方向
            offsetY: 0,
            centerX: 0, //面に対してX方向
            centerY: 0,
            repeatX: 1, //一面に横何回繰り返すか
            repeatY: 1,
        };

        this.keydata = Object.assign({}, defaults, keydata);

        var loader = new THREE.TextureLoader();

        const texture = loader.load(this.keydata.texture)

        const geometry = new THREE.PlaneBufferGeometry(
            this.keydata.width,
            this.keydata.height,
        );
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: this.keydata.transparent,
            opacity: this.keydata.opacity,
        });
        this.mesh = new THREE.Mesh( geometry, material );

        this.mesh.position.x = this.keydata.x;
        this.mesh.position.y = this.keydata.y;
        this.mesh.position.z = this.keydata.z;

        texture.offset.set( this.keydata.offsetX, this.keydata.offsetY );
        texture.repeat.set( this.keydata.repeatX, this.keydata.repeatY );
        texture.center.set( this.keydata.centerX, this.keydata.centerY );
    
    }    
}