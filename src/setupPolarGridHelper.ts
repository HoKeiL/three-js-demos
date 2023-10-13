import { PolarGridHelper, Scene } from "three";

export function setupPolarGridHelper(scene: Scene): void {
    const radius = 50;
    const radials = 16;
    const circles = 8;
    const divisions = 64;

    const helper = new PolarGridHelper(radius, radials, circles, divisions);
    scene.add(helper);
}