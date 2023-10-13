import { Scene, MeshStandardMaterial, Color, Mesh, BoxGeometry } from "three";
import { randFloat, randFloatSpread } from "three/src/math/MathUtils";

import { pick } from "./randomUtils";

export function setupSymmetricalShapeCluster(scene: Scene): void {
    //From https://nice-colours-quicker.netlify.app/
    //kgolid's "roygbiv-toned", https://kgolid.github.io/chromotome-site/
    const palette = ["#817c77", "#396c68", "#89e3b7", "#f59647", "#d63644", "#893f49", "#4d3240"];

    const geometry = new BoxGeometry(1, 1, 1);
    for (let i = 0; i < 40; i++) {
        const w = randFloat(8, 16);
        const h = randFloat(8, 16);
        const d = randFloat(8, 16);


        const material = new MeshStandardMaterial({
            color: new Color(pick(palette)),
            transparent: true,
            opacity: Math.random()
        });

        const y = randFloatSpread(40);
        const z = randFloatSpread(40);
        const xRight = randFloat(1, 40);
        const xLeft = -xRight;

        let off = 0;//an offset to avoid z-fighting.
        for (const xPos of [xLeft, xRight]) {
            const myShape: Mesh = new Mesh(geometry, material);
            myShape.position.set(xPos, y + off, z + off);
            myShape.scale.set(w, h, d);
            off += 0.05;
            scene.add(myShape);
        }
    }
}
