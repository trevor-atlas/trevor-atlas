import { Vector3 } from '@babylonjs/core'

export interface Face {
	A: number;
	B: number;
	C: number;
}

export class Mesh {
	public position: Vector3;
	public rotation: Vector3;
	public vertices: Vector3[];
	public faces: Face[];

	constructor(public name: string, verticesCount: number, facesCount: number) {
		this.faces = new Array(facesCount).fill(null);
		this.vertices = new Array(verticesCount).fill(null).map(() => new Vector3());
		this.position = new Vector3();
		this.rotation = new Vector3();
		this.position = new Vector3();
	}
}
