import {BufferGeometry, Mesh, Scene} from "three";
import * as Three from "three";

interface BoxGeometryOptions {
    width?: number;
    height?: number;
    depth?: number;
}

export const createBoxGeometry = (options?: BoxGeometryOptions) => {
    const {width = 1, height = 1, depth = 1} = options || {};
    return new Three.BoxGeometry(width, height, depth);
}

export const createCubeInstance = (scene: Scene, geometry: BufferGeometry, color: number | string, x: number): Mesh => {
    const material = new Three.MeshPhongMaterial({color});

    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}