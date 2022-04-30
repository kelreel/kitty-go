import './styles/style.scss';
import * as Three from 'three';
import {BufferGeometry, Mesh, Renderer, Scene} from "three";

function makeCubeInstance (scene: Scene, geometry: BufferGeometry, color: number | string, x: number): Mesh {
    const material = new Three.MeshPhongMaterial({color});

    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

function resizeRendererToDisplaySize(renderer: Renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function main() {
    const canvas = document.querySelector('#c') as HTMLCanvasElement;
    const renderer = new Three.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;  // значение для canvas по умолчанию
    const near = 0.1;
    const far = 5;
    const camera = new Three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new Three.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new Three.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cubes = [
        makeCubeInstance(scene, geometry, 0x44aa88,  0),
        makeCubeInstance(scene, geometry, 0x8844aa, -2),
        makeCubeInstance(scene, geometry, 0xaa8844,  2)
    ]

    { // Light
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new Three.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    renderer.render(scene, camera);

    function render(time: number) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
