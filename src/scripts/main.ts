import '../styles/style.scss';
import * as Three from 'three';
import { createBoxGeometry, createCubeInstance } from './cube';
import { bootstrapThreeJS } from './bootstrap';
import { RenderEngine } from './render';

const { renderer, camera, scene, canvas } = bootstrapThreeJS();
const renderEngine = new RenderEngine({ renderer, camera, scene, canvas });

function main() {
    const geometry = createBoxGeometry();
    const cubes = [
        createCubeInstance(scene, geometry, 0x8844aa, -2),
        createCubeInstance(scene, geometry, 0xaa8844, 2),
        createCubeInstance(scene, geometry, 0x44aa88, 0),
    ];

    const animateCubes = (time: number) => {
        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * 0.1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
    };

    renderEngine.middlewares.push(animateCubes);

    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new Three.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    renderEngine.startRender();
}

main();
