export class Shader {
	private program!: WebGLProgram;

	constructor(private gl: WebGLRenderingContext, private _name: string, private vertexSource: string, private fragmentSource: string) {
		const vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
		const fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);
		this.createProgram(vertexShader, fragmentShader);
	}

	public get name() {
		return this._name;
	}

	public use(): void {
		this.gl.useProgram(this.program);
	}

	private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
		const program = this.gl.createProgram();
		if (!program) throw new Error('bad program');
		this.program = program;

		this.gl.attachShader(this.program, vertexShader);
		this.gl.attachShader(this.program, fragmentShader);
		this.gl.linkProgram(this.program);

		const err = this.gl.getProgramInfoLog(this.program);
		if (err) throw new Error('bad program instance while linking')
	}

	private loadShader(src: string, shaderType: number): WebGLShader {
		const shader = this.gl.createShader(shaderType);

		if (!shader) throw new Error('bad shader');

		this.gl.shaderSource(shader, src)
		this.gl.compileShader(shader);
		const err = this.gl.getShaderInfoLog(shader);
		if (err) {
			throw new Error(`Error compiling shader "${this.name}" ${err}`);
		}

		return shader;
	}

}
