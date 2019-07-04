import {Point} from './components/AnimatedHeader';

export class Circle {
	public active: number;
	constructor(
		public point: Point,
		public rad: number,
		public color: string,
		public ctx: CanvasRenderingContext2D
	) {
		this.active = 0.3;
	}

	public draw() {
		if (!this.active) return;
		this.ctx.beginPath();
		this.ctx.arc(this.point.x, this.point.y, this.rad, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = 'rgba(10,150,255,' + this.active + ')';
		this.ctx.fill();
	};
}
