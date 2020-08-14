import { Shader } from './Shader';

export class Engine {
	public width: number;
	public height: number;
	public context: WebGLRenderingContext;
	private shader!: Shader;
	private buffer!: WebGLBuffer;

	constructor(
		private canvas: HTMLCanvasElement
	) {
		const { devicePixelRatio, innerWidth, innerHeight } = window;
		if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
			throw new Error('invalid canvas element!');
		}

		this.width = (innerWidth * .9)
		this.height = (innerHeight *.9)

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		const context = canvas.getContext('webgl');
		if (!context) {
			throw new Error('Browser does not support webgl2!');
		}
		this.context = context;
	}

	// public resize() {
	// 	const { devicePixelRatio, innerWidth, innerHeight } = window;
	// 	this.width = (innerWidth * devicePixelRatio) / 4;
	// 	this.height = (innerHeight * devicePixelRatio) / 4;
	// 	this.canvas.width = this.width;
	// 	this.canvas.height = this.height;
	// }

	public start = () => {
		this.context.clearColor(0, 0, 0, 1);
		this.loadShaders();
		this.shader.use();
		this.createBuffer();
		this.context.viewport(0, 0, this.width, this.height);
		this.render();
	}

	public render = () => {
		this.context.clear(this.context.COLOR_BUFFER_BIT);
		this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffer);
		this.context.vertexAttribPointer(0, 3, this.context.FLOAT, false, 0, 0);
		this.context.enableVertexAttribArray(0);

		this.context.drawArrays(this.context.TRIANGLES, 0, 3);
		requestAnimationFrame(this.render.bind(this));
	}

	private createBuffer(): void {
		const buffer = this.context.createBuffer();
		if (!buffer) throw new Error('unable to create buffer');
		this.buffer = buffer;

		const verticies = [
			0,0,0,
			0,.5,0,
			.5,.5,0
		];

		this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffer);
		this.context.vertexAttribPointer(0, 3, this.context.FLOAT, false, 0, 0);
		this.context.enableVertexAttribArray(0);
		this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(verticies), this.context.STATIC_DRAW);
		this.context.bindBuffer(this.context.ARRAY_BUFFER, null);
		this.context.disableVertexAttribArray(0);
	}

	private loadShaders(): void {
		const vertexShaderSource = `
attribute vec3 a_position;

void main() {
	gl_Position = vec4(a_position, 1.0);
}`;
		const fragmentShaderSource = `
precision mediump float;

void main() {
	gl_FragColor = vec4(1.0);
}`;
		this.shader = new Shader(this.context, 'basic', vertexShaderSource, fragmentShaderSource);
	}
}
