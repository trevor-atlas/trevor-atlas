import React from 'react';
import { TweenLite, Circ, Power1, Power0 } from 'gsap';
import { Circle } from '../Circle';

export interface Target {
	x: number;
	y: number;
}

export interface Point {
	x: number;
	y: number;
	originX: number;
	originY: number;
	circle?: Circle;
	active: number;
	closest?: Point[]
}

export class AnimatedHeader extends React.PureComponent<{animating: boolean, dotColor: string, lineColor: string}> {
	private width!: number;
	private height!: number;
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private points!: Point[];
	private target!: Target;

	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		const {innerWidth, innerHeight} = window;

		if (innerWidth < 1024) {
			console.log('Detected a small screen, bailing out of the canvas animation');
			return;
		}
		// sorry this is so large...
		this.width = innerWidth;
		this.height = innerHeight;
		this.target = {
			x: this.width / 2,
			y: this.height / 2
		};

		this.canvas = (this.refs.canvas as HTMLCanvasElement);
		if (!this.canvas) {
			console.log('something went wrong initializing the canvas animation, bailing out.');
			return;
		}
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = (this.canvas.getContext('2d') as CanvasRenderingContext2D);

		// create points
		this.points = [];
		for (let x = 0; x < this.width; x = x + this.width / 10) {
			for (let y = 0; y < this.height; y = y + this.height / 10) {
				const px = x + Math.random() * this.width / 10;
				const py = y + Math.random() * this.height / 10;
				const p: Point = {
					x: px,
					originX: px,
					y: py,
					originY: py,
					active: .3,
					closest: []
				};
				const c = new Circle(p, 2 + Math.random() * 2, 'rgba(10,10,10,0.3)', this.ctx);
				p.circle = c;
				this.points.push(p);
			}
		}

		// for each point find the 5 closest points
		for (let i = 0; i < this.points.length; i++) {
			const closest = [];
			const p1 = this.points[i];
			for (let j = 0; j < this.points.length; j++) {
				const p2 = this.points[j]
				if (!(p1 == p2)) {
					let placed = false;
					for (let k = 0; k < 5; k++) {
						if (!placed) {
							if (closest[k] == undefined) {
								closest[k] = p2;
								placed = true;
							}
						}
					}

					for (let k = 0; k < 5; k++) {
						if (!placed) {
							if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
								closest[k] = p2;
								placed = true;
							}
						}
					}
				}
			}
			p1.closest = closest;
		}

		this.addListeners();
		this.initAnimation();
	}

	private addListeners() {
		if (!('ontouchstart' in window)) {
			addEventListener('mousemove', this.mouseMove);
		}
		window.addEventListener('resize', this.resize);
	}

	private mouseMove = (e: MouseEvent) => {
		let posx = 0;
		let posy = 0;
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		}
		if (e.clientX || e.clientY) {
			posx = e.clientX;
			posy = e.clientY;
		}
		this.target.x = posx;
		this.target.y = posy;
	}

	private resize = () => {
		const {innerWidth, innerHeight} = window;
		this.width = innerWidth;
		this.height = innerHeight;
		if (this.canvas) {
			this.canvas.width = this.width;
			this.canvas.height = this.height;
		}
	}

	private initAnimation = () => {
		this.animate();
		for (const i in this.points) {
			setTimeout(
				() => this.shiftPoint(this.points[i]),
				this.randomInt(0, 500)
			)
		}
	}

	private animate = () => {
		if (this.props.animating) {
			this.ctx.clearRect(0, 0, this.width, this.height);
			for (const i in this.points) {
				const point = this.points[i];
				if (!point || !point.circle) continue;

				if (Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
					point.active = 0.3;
					point.circle.active = 0.6;
				} else if (Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
					point.active = 0.1;
					point.circle.active = 0.3;
				} else if (Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
					point.active = 0.02;
					point.circle.active = 0.3;
				} else {
					point.active = 0.0;
					point.circle.active = 0.3;
				}

				this.drawLines(this.points[i]);
				point.circle.draw();
			}
		}
		requestAnimationFrame(this.animate);
	}

	private shiftPoint(p: Point) {
		TweenLite.to(p, this.randomInt(3, 10),
			{
				x: p.originX - this.randomInt(10, 300),
				y: p.originY - this.randomInt(10, 300),
				ease: Power1.easeInOut,
				onComplete: () => this.shiftPoint(p)
			});
	}

	private drawLines(p: Point) {
		if (!p.active) return;
		if (!p.closest) return;
		for (let i in p.closest) {
			this.ctx.beginPath();
			this.ctx.moveTo(p.x, p.y);
			this.ctx.lineTo(p.closest[i].x, p.closest[i].y);
			this.ctx.strokeStyle = 'rgba(10,50,150,' + p.active + ')';
			this.ctx.stroke();
		}
	}

	private getDistance = (p1: Point | Target, p2: Point | Target) =>
		Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);

	private randomInt = (min: number, max: number) => 
		Math.floor(Math.random() * (max-min+1)+min);
	
	public render() {
		return <>
			<canvas style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				pointerEvents: 'none',
				zIndex: -5
			}} ref="canvas" />
		</>
	}
}

