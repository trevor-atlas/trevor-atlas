import { Color4, Matrix, Vector2, Vector3 } from '@babylonjs/core';
import { Camera } from './Camera';
import { Mesh } from './Mesh';
import mario from './mario.json';
import cube from './cube.json';

export class Engine {
	private backbuffer!: ImageData;
	public canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private width: number;
	private height: number;
	private backbufferdata!: Uint8ClampedArray;

	constructor(canvas: HTMLCanvasElement) {
		const {devicePixelRatio, innerWidth, innerHeight} = window;
		if (!canvas) throw new Error('invalid or null canvas!');
		this.width = (innerWidth * devicePixelRatio) / 4;
		this.height = (innerHeight * devicePixelRatio) / 4;

		this.canvas = canvas;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		const ctx = this.canvas.getContext('2d');
		if (!ctx) throw new Error('Error getting canvas context!');
		this.context = ctx;
	}

	public clear(): void {
		this.context.clearRect(0, 0, this.width, this.height);
		this.backbuffer = this.context.getImageData(0, 0, this.width, this.height);
	}

	public present(): void {
		this.context.putImageData(this.backbuffer, 0, 0);
	}

	public putPixel(x: number, y: number, color: Color4): void {
		this.backbufferdata = this.backbuffer.data;
		const index = ((x >> 0) + (y >> 0) * this.width) * 4;
		this.backbufferdata[index] = color.r * 255;
		this.backbufferdata[index+1] = color.g * 255;
		this.backbufferdata[index+2] = color.b * 255;
		this.backbufferdata[index+3] = color.a * 255;
	}

	public project(coord: Vector3, transMat: Matrix): Vector3 {
		const point = Vector3.TransformCoordinates(coord, transMat);
		const x = point.x * this.width + this.width / 2.0 >> 0;
		const y = -point.y * this.height + this.height / 2.0 >> 0;
		return new Vector3(x, y, point.z);
	}

	public drawPoint(point: Vector2, color: Color4): void {
		// clip if it's outside the viewport
		if (point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height) {
			this.putPixel(point.x, point.y, color);
		}
	}

	public clamp(value: number, min: number = 0, max: number = 1): number {
		return Math.max(min, Math.min(value, max));
	}

	public interpolate(min: number, max: number, gradient: number) {
		return min + (max - min) * this.clamp(gradient);
	}
	public drawTriangle(p1: Vector3, p2: Vector3, p3: Vector3, color: Color4): void {
		// Sorting the points in order to always have this order on screen p1, p2 & p3
		// with p1 always up (thus having the Y the lowest possible to be near the top screen)
		// then p2 between p1 & p3
		if (p1.y > p2.y) {
			const temp = p2;
			p2 = p1;
			p1 = temp;
		}

		if (p2.y > p3.y) {
			const temp = p2;
			p2 = p3;
			p3 = temp;
		}

		if (p1.y > p2.y) {
			const temp = p2;
			p2 = p1;
			p1 = temp;
		}


		// http://en.wikipedia.org/wiki/Slope
		// Computing inverse slopes
		const dP1P2: number = (p2.y - p1.y > 0) ? (p2.x - p1.x) / (p2.y - p1.y) : 0;
		const dP1P3: number = (p3.y - p1.y > 0) ? (p3.x - p1.x) / (p3.y - p1.y) : 0;

		// First case where triangles are like that:
		// P1
		// -
		// --
		// - -
		// -  -
		// -   - P2
		// -  -
		// - -
		// -
		// P3
		if (dP1P2 > dP1P3) {
			for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
				if (y < p2.y) {
					this.processScanLine(y, p1, p3, p1, p2, color);
				} else {
					this.processScanLine(y, p1, p3, p2, p3, color);
				}
			}
		}
		else {
			// First case where triangles are like that:
			//       P1
			//        -
			//       --
			//      - -
			//     -  -
			// P2 -   -
			//     -  -
			//      - -
			//        -
			//       P3
			for (let y = p1.y >> 0; y <= p3.y >> 0; y++) {
				if (y < p2.y) {
					this.processScanLine(y, p1, p2, p1, p3, color);
				}
				else {
					this.processScanLine(y, p2, p3, p1, p3, color);
				}
			}
		}
	}

	public processScanLine(y: number, pa: Vector3, pb: Vector3, pc: Vector3, pd: Vector3, color: Color4): void {
		// Thanks to current Y, we can compute the gradient to compute others values like
		// the starting X (sx) and ending X (ex) to draw between
		// if pa.Y == pb.Y or pc.Y == pd.Y, gradient is forced to 1
		const gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
		const gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;

		const sx = this.interpolate(pa.x, pb.x, gradient1) >> 0;
		const ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;

		// drawing a line from left (sx) to right (ex)
		for (let x = sx; x < ex; x++) {
			this.drawPoint(new Vector2(x, y), color);
		}
	}


	public createMeshesFromJSON(json: {meshes: {name: string, position: any, vertices: number[], indices: number[], uvCount: number}[]}): Mesh[] {
		const meshes: Mesh[] = [];
		// @ts-ignore
		for (let i = 0; i < json.meshes.length; i++) {
			// @ts-ignore
			const vertices = json.meshes[i].positions;
			const indices = json.meshes[i].indices;
			// @ts-ignore
			const uvCount = json.meshes[i].uvs.length;
			let verticesStep = 1;
			switch (uvCount) {
				case 0:
					verticesStep = 6;
					break;
				case 1:
					verticesStep = 8;
					break;
				case 2:
					verticesStep = 10;
					break;
			}
			const verticesCount = vertices.length / verticesStep;
			const facesCount = indices.length / 3;
			const mesh = new Mesh(json.meshes[i].name, verticesCount, facesCount);

			for (let j = 0; j < verticesCount; j++) {
				const x = vertices[j * verticesStep];
				const y = vertices[j * verticesStep + 1];
				const z = vertices[j * verticesStep + 2];
				mesh.vertices[j] = new Vector3(x, y, z);
			}

			for (let k = 0; k < facesCount; k++) {
				const A = indices[k * 3];
				const B = indices[k * 3 + 1];
				const C = indices[k * 3 + 2];
				mesh.faces[k] = { A, B, C };
			}

			const position = json.meshes[i].position;
			mesh.position = new Vector3(position[0], position[1], position[2]);
			meshes.push(mesh);
		}
		return meshes;
	}

	public async loadJSONFile(): Promise<Mesh[]> {
		return this.createMeshesFromJSON(cube);
	}


	public render(camera: Camera, meshes: Mesh[]): void {
		const viewMatrix = Matrix.LookAtLH(camera.position, camera.target, Vector3.Up());
		const projectionMatrix = Matrix.PerspectiveFovLH(0.9, (this.width / this.height), 0.01, 1.0)
		for (let index = 0; index < meshes.length; index++) {
			const cMesh = meshes[index];
			const worldMatrix = Matrix.RotationYawPitchRoll(
				cMesh.rotation.y, cMesh.rotation.x, cMesh.rotation.z
			).multiply(Matrix.Translation(
				cMesh.position.x, cMesh.position.y, cMesh.position.z
			));
			const transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);

			for (let indexFaces = 0; indexFaces < cMesh.faces.length; indexFaces++) {
				const currentFace = cMesh.faces[indexFaces];
				const vertexA = cMesh.vertices[currentFace.A];
				const vertexB = cMesh.vertices[currentFace.B];
				const vertexC = cMesh.vertices[currentFace.C];

				const pixelA = this.project(vertexA, transformMatrix);
				const pixelB = this.project(vertexB, transformMatrix);
				const pixelC = this.project(vertexC, transformMatrix);

				const color = .25 + ((indexFaces % cMesh.faces.length) / cMesh.faces.length) * 0.75;
				this.drawTriangle(pixelA, pixelB, pixelC, new Color4(color, color, color, 1));
			}
		}
	}
}
