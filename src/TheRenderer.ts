import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class TheRenderer extends WebGLRenderer {
    private readonly scene: Scene

    private readonly camera: PerspectiveCamera

    private controls: OrbitControls

    private readonly cube: Mesh

    constructor() {
        super()
        this.setSize(window.innerWidth, window.innerHeight)

        this.scene = new Scene()

        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 2;

        this.controls = new OrbitControls(this.camera, this.domElement)

        this.cube = new Mesh(new BoxGeometry(), new MeshBasicMaterial({
            color: 'white',
            wireframe: false,
        }))

        this.scene.add(this.cube)
    }

    public onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.setSize(window.innerWidth, window.innerHeight)
        this.render(this.scene, this.camera)
    }

    public updateAnimation = () => {
        requestAnimationFrame(this.updateAnimation)

        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01

        this.controls.update()

        this.render(this.scene, this.camera)
    }
}