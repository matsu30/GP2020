class Illusttexture{

    constructor(keydata){
        console.log("Illusttexture constructor", keydata);

        const defaults = {
            texture: '',
            width: 20,
            height: 20,
            x: 0,
            y: 0,
            z: 0,
            transparent: true,
            opacity: 1,
        };

        this.keydata = Object.assign({}, defaults, keydata);

        const texture = new THREE.ImageUtils.loadTexture(
            this.keydata.texture,
        );
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
    
    }    
}