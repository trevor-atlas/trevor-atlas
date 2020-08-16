import {
	constants,
	dijkstra,
	getNodesInShortestPathOrder,
	Node
} from 'src/utils/dijkstra';
import { sleep } from 'src/utils/helpers';

interface IEngineOptions {
	enableZoom: boolean;
	enableScroll: boolean;
}

export class Engine {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private width: number;
	private height: number;
	private grid: Node[][];
	private timer: number;
	private zoom = 1;
	private drawing: boolean;
	private scrollX = 0;
	private scrollY = 0;
	private mouseBeginOrigin: { x: number; y: number };
	private activeMouseButton: number;
	private pixelRatio: number;

	constructor(
		private rows: number,
		private columns: number,
		private options: IEngineOptions = {
			enableScroll: false,
			enableZoom: false
		}
	) {
		this.canvas = document.querySelector('#renderingContext');
		this.ctx = this.canvas.getContext('2d');
		this.pixelRatio = window.devicePixelRatio;

		this.drawing = false;
		this.width = this.columns * this.cellSize * this.pixelRatio;
		this.height = this.rows * this.cellSize * this.pixelRatio;
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.genGrid(rows, columns);

		this.canvas.addEventListener('contextmenu', (e) => {
			if (e.button == 2) {
				// Block right-click menu thru preventing default action.
				e.preventDefault();
				return false;
			}
		});

		this.canvas.onmousedown = ({ button, clientX, clientY }) => {
			this.drawing = true;
			const { left, top } = this.canvas.getBoundingClientRect();
			const { xOffset, yOffset } = this.getScaledOffsets();
			const mx = clientX - left - xOffset;
			const my = clientY - top - yOffset;
			this.mouseBeginOrigin = { x: mx, y: my };
			this.activeMouseButton = button;
			if (this.options.enableScroll) {
				switch (this.activeMouseButton) {
					case 2:
						this.canvas.style = 'cursor: grabbing';
				}
			}
		};

		this.canvas.addEventListener('click', ({ clientX, clientY }) => {
			const { left, top } = this.canvas.getBoundingClientRect();
			const { xOffset, yOffset } = this.getScaledOffsets();
			const mx = (clientX - left - xOffset) >> 0;
			const my = (clientY - top - yOffset) >> 0;
			// Do nothing if we are clicking outside a visible part of the virtual grid
			if (mx < 0 || mx > this.vwidth || my < 0 || my > this.vheight) {
				return;
			}
			const { row, col } = this.getSquare(clientX, clientY);
			const { isWall } = this.grid[row][col];
			if (!isWall) {
				this.grid[row][col].isWall = true;
				const { color } = this.grid[row][col];
				this.drawUpdatedCell(row, col, this.cellSize, color);
			}
		});

		this.canvas.onmousemove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			e.stopPropagation();
			const { left, top } = this.canvas.getBoundingClientRect();
			const { xOffset, yOffset } = this.getScaledOffsets();
			const mx = (clientX - left - xOffset) >> 0;
			const my = (clientY - top - yOffset) >> 0;
			switch (this.activeMouseButton) {
				case 2:
					if (!this.options.enableScroll) return;
					const x = -(this.mouseBeginOrigin.x - mx);
					const y = -(this.mouseBeginOrigin.y - my);
					this.scrollX = this.clamp(
						(this.scrollX + Math.min(x, this.cellSize)) >> 0,
						Math.min(-this.width * 2, -this.vwidth * 2),
						Math.max(this.width * 2, this.vwidth * 2)
					);
					this.scrollY = this.clamp(
						this.scrollY + Math.min(y, this.cellSize),
						Math.min(-this.height * 2, -this.vheight * 2),
						Math.max(this.height * 2, this.vheight * 2)
					);
					this.drawGrid();
					break;
				case 0:
					// Do nothing if we are clicking outside a visible part of the virtual grid
					if (
						mx < 0 ||
						mx > this.vwidth ||
						my < 0 ||
						my > this.vheight
					) {
						return;
					}
					const { row, col } = this.getSquare(clientX, clientY);
					if (this.drawing && !this.grid[row][col].isWall) {
						this.grid[row][col].isWall = true;
					} else {
						// this.grid[row][col].isWall = false;
					}
					this.drawGrid();
					break;
			}
		};
		this.canvas.onmouseup = () => {
			this.drawing = false;
			this.mouseBeginOrigin = null;
			this.canvas.style = '';
			this.activeMouseButton = null;
		};
		if (this.options.enableZoom) this.canvas.onwheel = this.zoomIn;
	}
	private zoomIn = (event) => {
		event.preventDefault();

		let result = this.zoom;

		if (event.deltaY < 0) {
			// zoom in
			result += 0.02;
		} else {
			// zoom out
			result -= 0.02;
		}
		this.zoom = this.clamp(result, 0.05, 1);
	};

	public get vwidth() {
		return (this.columns * this.cellSize) >> 0;
	}

	public get vheight() {
		return (this.rows * this.cellSize) >> 0;
	}

	public get cellSize() {
		return 20;
	}

	public getSquare = (x: number, y: number) => {
		const { left, top } = this.canvas.getBoundingClientRect();
		const { xOffset, yOffset } = this.getScaledOffsets();
		const mx = x - left - xOffset;
		const my = y - top - yOffset;

		const row = this.clamp(
			((my / this.vheight) * this.rows) >> 0,
			0,
			this.rows - 1
		);
		const col = this.clamp(
			((mx / this.vwidth) * this.columns) >> 0,
			0,
			this.columns - 1
		);

		return { row, col };
	};

	private drawCell = (x: number, y: number, size: number, color: string) => {
		const { xOffset, yOffset } = this.getScaledOffsets();
		this.ctx.strokeStyle = 'rgba(255, 255, 255, .8)';
		this.ctx.lineWidth = this.pixelRatio;
		this.ctx.lineJoin = 'round';
		this.ctx.fillStyle = color;
		if (
			x + xOffset + this.cellSize < 0 ||
			x + xOffset - this.cellSize > this.width ||
			y + yOffset + this.cellSize < 0 ||
			y + yOffset - this.cellSize > this.height
		)
			return;
		this.ctx.strokeRect(x + xOffset, y + yOffset, size, size);
		this.ctx.fillRect(x + xOffset, y + yOffset, size, size);
	};

	private drawUpdatedCell = (
		row: number,
		col: number,
		size: number,
		color: string
	) => {
		if (row !== 0) {
			row = (row * this.cellSize) >> 0;
		}
		if (col !== 0) {
			col = (col * this.cellSize) >> 0;
		}
		const { xOffset, yOffset } = this.getScaledOffsets();
		this.ctx.strokeStyle = 'rgba(255, 255, 255, .8)';
		this.ctx.lineWidth = this.pixelRatio;
		this.ctx.lineJoin = 'round';
		this.ctx.fillStyle = color;
		if (
			col + xOffset + this.cellSize < 0 ||
			col + xOffset - this.cellSize > this.width ||
			row + yOffset + this.cellSize < 0 ||
			row + yOffset - this.cellSize > this.height
		)
			return;
		const x = col + xOffset;
		const y = row + yOffset;
		this.ctx.clearRect(x, y, size, size);
		this.ctx.strokeRect(x, y, size, size);
		this.ctx.fillRect(x, y, size, size);
	};

	public drawGrid = () => {
		this.ctx.clearRect(0, 0, this.width, this.height);
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
				requestAnimationFrame(() => {
					const color = this.grid[row][col].color;
					if (row === 0 && col === 0) {
						this.drawCell(row, col, this.cellSize, color);
					} else {
						this.drawCell(
							(col * this.cellSize) >> 0,
							(row * this.cellSize) >> 0,
							this.cellSize,
							color
						);
					}
				});
			}
		}
	};

	private getScaledOffsets = () => {
		const xOffset =
			(this.width / 2 -
				(this.columns * this.cellSize) / 2 +
				this.scrollX) >>
			0;

		const yOffset =
			(this.height / 2 -
				(this.rows * this.cellSize) / 2 +
				this.scrollY) >>
			0;
		return { xOffset, yOffset };
	};

	animateDijkstra = async (
		visitedNodesInOrder: Node[],
		nodesInShortestPathOrder: Node[]
	) => {
		await this.animateVisitedNodes(visitedNodesInOrder);
		await this.animateShortestPath(nodesInShortestPathOrder);
	};

	animateVisitedNodes = async (visitedNodes: Node[]) => {
		for (let index = 0; index < visitedNodes.length; index++) {
			await sleep(10 - Math.log(index));
			const { isStart, isEnd, row, col } = visitedNodes[index];
			if (isStart || isEnd) continue;
			this.grid[row][col].isVisuallyVisited = this.grid[row][
				col
			].isVisited;
			const color = this.grid[row][col].color;
			this.drawUpdatedCell(row, col, this.cellSize, color);
		}
	};

	animateShortestPath = async (nodesInShortestPathOrder: Node[]) => {
		for (let index = 0; index < nodesInShortestPathOrder.length; index++) {
			await sleep(15 - Math.log(index));
			const { isStart, isEnd, row, col } = nodesInShortestPathOrder[
				index
			];
			if (isStart || isEnd) continue;
			this.grid[row][col].isShortest = true;
			const color = this.grid[row][col].color;
			this.drawUpdatedCell(row, col, this.cellSize, color);
		}
	};

	public async animateSolution() {
		const start = this.getStart(this.rows, this.columns);
		const end = this.getEnd(this.rows, this.columns);
		const startNode = this.grid[start.row][start.col];
		const endNode = this.grid[end.row][end.col];
		const visitedNodesInOrder = dijkstra(this.grid, startNode, endNode);
		const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
		await this.animateDijkstra(
			visitedNodesInOrder,
			nodesInShortestPathOrder
		);
	}

	public genGrid = (rows: number, columns: number) => {
		this.rows = this.clamp(rows, 10, 50);
		this.columns = this.clamp(columns, 10, 50);

		this.grid = Array(this.rows)
			.fill(null)
			.map(() => Array(this.columns).fill(null));

		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
				this.grid[row][col] = new Node(col, row);
			}
		}
		const start = this.getStart(this.rows, this.columns);
		const end = this.getEnd(this.rows, this.columns);

		this.grid[start.row][start.col].isStart = true;
		this.grid[end.row][end.col].isEnd = true;
		this.drawGrid();
	};

	public getStart = (rows: number, columns: number) => ({
		row: Math.floor(rows / 2),
		col: Math.floor(columns / 5)
	});

	public getEnd = (rows: number, columns: number) => ({
		row: Math.floor(rows / 2),
		col: Math.floor((columns / 5) * 4)
	});

	private clamp = (n: number, min: number, max: number) => {
		return Math.min(max, Math.max(n, min));
	};
}
