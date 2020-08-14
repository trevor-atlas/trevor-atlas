import { Vector3 } from '@babylonjs/core';

export class Camera {
	position: Vector3;
	target: Vector3;

	constructor() {
		this.position = new Vector3();
		this.target = new Vector3();
	}
}

