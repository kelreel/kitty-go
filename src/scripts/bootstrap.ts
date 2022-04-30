import * as Three from "three";

export const bootstrapThreeJS = () => {
    const canvas = document.querySelector('#c') as HTMLCanvasElement;
    const renderer = new Three.WebGLRenderer({canvas});

    const fov = 75;
    const aspect = 2;  // значение для canvas по умолчанию
    const near = 0.1;
    const far = 5;
    const camera = new Three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new Three.Scene();

    return {
        canvas,
        renderer,
        camera,
        scene
    }
}