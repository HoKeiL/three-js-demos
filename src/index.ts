import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxBufferGeometry,
    Vector3,
    Color,
} from 'three';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';
import { setupAccelerometer } from './setupAccelerometer'
export function setupThreeJSScene(): void {

    const dimensions = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dimensions);

    const renderer = setupRenderer(camera, dimensions);

    const controls = setupOrbitControls(camera, renderer.domElement);

    const scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);

    //shape(s)
    const geometry = new BoxBufferGeometry(10, 10, 10);
    const material = new MeshStandardMaterial({
        color: new Color("red")
    });

    const myShape: Mesh = new Mesh(geometry, material);

    let destinationPosition: Vector3 = new Vector3(0, 0, 0);
    myShape.position.y = 20;
    scene.add(myShape);

    setupAccelerometer((acl) => {
        if (acl.x === undefined || acl.y === undefined || acl.z === undefined) {
            return;
        }
        destinationPosition = new Vector3(acl.x, acl.y, acl.z).multiplyScalar(3);
    });

    animate();

    function animate() {
        myShape.rotation.y += 0.01;
        myShape.rotation.x += 0.02;

        //move a 1/10th of the way towards destinationPosition - smooths out the movement.
        myShape.position.lerp(destinationPosition, 0.1);

        renderer.render(scene, camera);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();

