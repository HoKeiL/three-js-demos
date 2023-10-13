import { Group, Scene } from 'three';
import { loadModel } from './loadModel';

export async function setupTreesAndHouseModel(scene: Scene): Promise<Group | null> {

    const treesAndHouse = await loadModel("./assets/treesAndHouse.glb");
    if (treesAndHouse) {
        treesAndHouse.scale.set(5, 5, 5);

        scene.add(treesAndHouse);
        return treesAndHouse;
    }
    return null;
}
