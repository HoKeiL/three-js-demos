import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    BoxGeometry,
    Color,
    // CameraHelper,
    PerspectiveCamera,
    Vector3
} from 'three';
import { lerp, mapLinear } from 'three/src/math/MathUtils';
import { getExpectedElement } from './domUtils';
import { between } from './math';

import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { getAspect, setupRenderer } from './setupRenderer';

export function setupThreeJSScene(): void {

    const dimensions = { w: window.innerWidth, h: window.innerHeight };

    const scene = new Scene();

    const camera = setupCamera(dimensions);
    let cameraShakeMagnitude = 0;
    //a second camera - just for something to look at!
    const camera2 = new PerspectiveCamera(30, getAspect(dimensions), 50, 150);
    camera2.position.set(0, 60, -80);

    //add this in to see an animated camera
    // const camHelper = new CameraHelper(camera2);
    // scene.add(camHelper);

    const renderer = setupRenderer(camera, dimensions);


    const geom = new BoxGeometry(20, 20, 20);
    const cubeMesh = new Mesh(geom, new MeshStandardMaterial({ wireframe: false, color: new Color("cyan") }))
    cubeMesh.position.set(50, 15, 0);

    cubeMesh.userData.desiredRotationY = 0
    cubeMesh.userData.desiredRotationX = 0
    cubeMesh.userData.desiredPositionX = 0
    cubeMesh.userData.desiredDimHeight = 1

    scene.add(cubeMesh);

    document.body.onscroll = handleScroll;
    window.addEventListener("click", increaseCameraShake)
    setupLights(scene);
    setupHelpers(scene);

    //let's go!
    function increaseCameraShake(): void {
        3 + 4;
        console.log(Math.random())
        cameraShakeMagnitude++;
    }

    animate();

    function animate() {

        renderer.render(scene, camera);

        //lerp rotation towards its desired value, a little each frame
        cubeMesh.rotation.y = lerp(cubeMesh.rotation.y, cubeMesh.userData.desiredRotationY, 0.1);
        cubeMesh.rotation.x = lerp(cubeMesh.rotation.x, cubeMesh.userData.desiredRotationX, 0.1);
        cubeMesh.position.x = lerp(cubeMesh.position.x, cubeMesh.userData.desiredPositionX, 0.1);
        cubeMesh.scale.y = lerp(cubeMesh.scale.y, cubeMesh.userData.desiredDimHeight, 0.1);
        camera2.lookAt(cubeMesh.position.x, cubeMesh.position.y, cubeMesh.position.z)

        const offset = new Vector3().randomDirection().multiplyScalar(cameraShakeMagnitude * 2);
        camera.position.addVectors(camera.userData.origPosition, offset);
        //reduce shake to zero over time.
        cameraShakeMagnitude = Math.max(0, cameraShakeMagnitude * 0.95);

        requestAnimationFrame(animate);
    }

    function handleScroll() {
        //Note: It is likely better to do all this more declaratively with GSAP
        const t = document.body.getBoundingClientRect().top;
        setHudText("t: " + t);
        handleScrollEffectOnSpinnyCube(t);
        handleScrollEffectOnFloatingInfoPara();
        handleScrollEffectOnCamera(t);
    }

    function handleScrollEffectOnSpinnyCube(t: number): void {
        const cutHeight1 = -700;
        const cutHeight2 = -300;

        if (t < cutHeight1) {
            cubeMesh.userData.desiredPositionX = -50;
            cubeMesh.userData.desiredRotationX = 0;
            cubeMesh.userData.desiredRotationY = t / 150;
            cubeMesh.userData.desiredDimHeight = 0.1 + 0.8 * (1 + Math.sin(t / 40));
        } else if (t < cutHeight2) {
            //you COULD cut straight over without this intermediate band - lerp will smooth a little, 
            //but it'd be a very rapid transition on one pixel of scroll
            cubeMesh.userData.desiredPositionX = mapLinear(t, cutHeight1, cutHeight2, -40, 30)
            cubeMesh.userData.desiredRotationY = mapLinear(t, cutHeight1, cutHeight2, t / 150, 0)
            cubeMesh.userData.desiredRotationX = mapLinear(t, cutHeight1, cutHeight2, 0, t / 150)
        } else {
            cubeMesh.userData.desiredRotationX = t / 150;
            cubeMesh.userData.desiredRotationY = 0;
            cubeMesh.userData.desiredPositionX = 30;
        }

        cubeMesh.material.color = new Color("cyan").lerp(new Color("magenta"), Math.abs(Math.sin(t / 700)));

    }
    function handleScrollEffectOnFloatingInfoPara(): void {
        const afiElem = getExpectedElement("about-floating-info");
        const fiElem = getExpectedElement("floating-info");

        const fiElemTop = afiElem.getBoundingClientRect().top;
        if (between(fiElemTop, 0, 500)) {
            fiElem.classList.add("hilit");
            afiElem.classList.add("hilit");

        } else {
            afiElem.classList.remove("hilit")
            fiElem.classList.remove("hilit")
        }
    }

    function handleScrollEffectOnCamera(t: number): void {
        camera.fov = mapLinear(Math.cos(t / 1000), -1, 1, 60, 110);
        camera.updateProjectionMatrix();
        // camera.lookAt(cubeMesh.position.x, cubeMesh.position.y, cubeMesh.position.z)

        camera2.position.y = mapLinear(Math.sin(t / 440), -1, 1, 30, 100);
        camera2.updateProjectionMatrix();
    }
}


function setHudText(msg: string): void {
    const hudElem = document.getElementById("floating-info");
    if (hudElem) {
        hudElem.innerText = msg;
    }
}
setupThreeJSScene();
