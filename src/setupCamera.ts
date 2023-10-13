import { PerspectiveCamera, Vector3 } from "three";
import { getAspect } from "./setupRenderer";

export function setupCamera(dim: { w: number, h: number }): PerspectiveCamera {

    const camera: PerspectiveCamera = new PerspectiveCamera(75, getAspect(dim), 0.1, 1000);
    camera.userData.origPosition = new Vector3(15, 20, 70);
    camera.position.copy(camera.userData.origPosition);


    return camera;
}