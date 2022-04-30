import {PerspectiveCamera, Renderer, Scene} from "three";
import {resizeRendererToDisplaySize} from "./utils";

interface RenderConfig {
    renderer: Renderer;
    camera: PerspectiveCamera;
    scene: Scene;
    canvas: HTMLCanvasElement;
}

interface Middleware {
    (time: number): void;
}

export class RenderEngine {
    renderer: Renderer;
    camera: PerspectiveCamera;
    scene: Scene;
    canvas: HTMLCanvasElement;

    public isRendering = false;
    private _req: number = 0;

    public storage: Record<string, any> = {};
    public middlewares: Middleware[] = [];

    constructor({renderer, camera, scene, canvas}: RenderConfig) {
        this.canvas = canvas;
        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;
    }

    private _render (ms: number) {
        const time = ms * 0.001;

        if (resizeRendererToDisplaySize(this.renderer)) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();

        for (const fn of this.middlewares) {
            fn(time);
        }


        this.renderer.render(this.scene, this.camera);
        this._req = requestAnimationFrame(this._render.bind(this))
    }

    public startRender () {
        requestAnimationFrame(this._render.bind(this));
        this.isRendering = true;
    }

    public stopRender () {
        cancelAnimationFrame(this._req)
        this.isRendering = false;
    }
}