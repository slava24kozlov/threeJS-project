import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera, RepeatWrapping,
    Scene,
    Texture,
    TextureLoader,
    WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class TheRenderer extends WebGLRenderer {
    private readonly scene: Scene;

    private readonly camera: PerspectiveCamera;

    private controls: OrbitControls;

    private readonly cubeArray: Array<Mesh> = [];

    private readonly textureArray: Array<Texture> = [];

    constructor() {
        super()
        const loader = new TextureLoader();

        this.textureArray.push(loader.load('./assets/imageOne.jpg'));
        this.textureArray.push(loader.load('./assets/imageTwo.jpg'));
        this.textureArray.push(loader.load('./assets/imageThree.jpg'));
        this.textureArray.push(loader.load('./assets/imageThree.jpg'));
        this.textureArray.push(loader.load('./assets/imageThree.jpg'));

        this.setSize(window.innerWidth, window.innerHeight)

        this.scene = new Scene()

        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 3;

        this.controls = new OrbitControls(this.camera, this.domElement)

        this.textureArray.forEach((texture, index) => {
            this.cubeArray.push(new Mesh(new BoxGeometry(), new MeshBasicMaterial({map: texture})));
            this.cubeArray[index].position.x+=index;
            this.scene.add(this.cubeArray[index]);
        })
    }

    public onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.setSize(window.innerWidth, window.innerHeight)
        this.render(this.scene, this.camera)
    }

    public updateAnimation = () => {
        requestAnimationFrame(this.updateAnimation)

        this.cubeArray.forEach((cube, index) => {
            cube.rotation.x += 0.01 * index;
            cube.rotation.y += 0.01 * index;
        })

        this.controls.update();

        this.render(this.scene, this.camera);
    }
}