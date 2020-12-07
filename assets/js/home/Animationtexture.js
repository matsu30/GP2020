class Animationtexture{

    constructor() {

        this.SKELETON_FILE = "skeleton.json";
        this.ATLAS_FILE = "skeleton.atlas";
        this.assetManager = new spine.threejs.AssetManager("assets/spine/right/");
        this.skeletonMesh = undefined;

        const geometry = new THREE.BoxBufferGeometry(
                20,
                20,
                20
          );

        const material = new THREE.MeshBasicMaterial({
        transparent: true, opacity: 0,
        });
  
        this.body = new THREE.Mesh(geometry, material);
        this.body.geometry.computeBoundingBox();
        this.bodyPositionY = this.body.position.y;

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
        
    };
      
}

