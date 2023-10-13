import { Scene } from 'three';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';
import { setupTreesAndHouseModel } from './setupTreesAndHouseModel';

export async function setupThreeJSScene(): Promise<void> {

    const dimensions = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dimensions);

    const renderer = setupRenderer(camera, dimensions);

    const controls = setupOrbitControls(camera, renderer.domElement);

    const scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);

    const treesAndHouse = await setupTreesAndHouseModel(scene);
    if (treesAndHouse) {
        treesAndHouse.position.setX(-30);
    }

    animate();

    function animate() {
        renderer.render(scene, camera);

        controls.update(); // required if controls has .enableDamping .autoRotate set true.

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();
