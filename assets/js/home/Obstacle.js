class Obstacle{

    constructor(keydata){
        //console.log("Obstacle constructor", keydata);

        const defaults = {
            width: 20,
            height: 20,
            depth: 12,
            color: 0xf99fff,
            transparent: true,
            opacity: 0,
            x: 0,
            y: 0,
            z: 0
        };

        this.keydata = Object.assign({}, defaults, keydata)

        const boxGeometry = new THREE.BoxBufferGeometry(
            this.keydata.width,
            this.keydata.height,
            this.keydata.depth,
        );
        const material = new THREE.MeshBasicMaterial({
            color: this.keydata.color,
            transparent: this.keydata.transparent,
            opacity: this.keydata.opacity,
        });
        this.mesh = new THREE.Mesh( boxGeometry, material );
        
        this.mesh.position.x = this.keydata.x;
        this.mesh.position.y = this.keydata.y;
        this.mesh.position.z = this.keydata.z;

    }

}