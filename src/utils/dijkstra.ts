// run Dijkstra's algorithm against a given grid, start and end.
// returns nodes in the order they were visited and ensures that each node points to the previous node.
// This allows us to compute the shortest path by backtracking to the start.
import styles from 'src/components/pathfinder/cell.module.scss';

export const dijkstra = (grid: Node[][], start: Node, end: Node): Node[] => {
	const visitedInOrder = [];
	start.distance = 0;
	const unvisited = getAllNodes(grid);

	while (!!unvisited.length) {
		sortNodesByDistance(unvisited);
		const closest = unvisited.shift() as any;
		// skip walls
		if (closest.isWall) continue;
		// If the closest node is at a distance of infinity,
		// we are trapped and should stop.
		if (closest.distance === Infinity) {
			return visitedInOrder;
		}
		closest.isVisited = true;
		visitedInOrder.push(closest);
		if (closest === end) return visitedInOrder;
		updateUnvisitedNeighbors(closest, grid);
	}
	return visitedInOrder;
};

function sortNodesByDistance(unvisitedNodes: Node[]) {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid: Node[][]) {
	const nodes = [];
	for (const row of grid) {
		for (const node of row) {
			nodes.push(node);
		}
	}
	return nodes;
}

export const updateUnvisitedNeighbors = (node: Node, grid: Node[][]): void => {
	const unvisited = getUnvisitedNeighbors(node, grid);
	for (const neighbor of unvisited) {
		neighbor.distance = node.distance + 1;
		neighbor.previous = node;
	}
};

export const getUnvisitedNeighbors = (node: Node, grid: Node[][]): Node[] => {
	const neighbors = [];
	const { col, row } = node;

	if (row > 0) {
		const up = grid[row - 1][col];
		if (!up.isVisited) neighbors.push(up);
	}
	if (row < grid.length - 1) {
		const down = grid[row + 1][col];
		if (!down.isVisited) neighbors.push(down);
	}
	if (col > 0) {
		const left = grid[row][col - 1];
		if (!left.isVisited) neighbors.push(left);
	}
	if (col < grid[0].length - 1) {
		const right = grid[row][col + 1];
		if (!right.isVisited) neighbors.push(right);
	}
	return neighbors;
};

const getGridStart = (grid: Node[][]) => {
	const height = grid.length;
	const width = grid[0].length;
	return { row: Math.floor(height / 2), col: Math.floor(width / 4) };
};

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra function above.
export const getNodesInShortestPathOrder = (end: Node): Node[] => {
	const pathOrder = [];
	let node: Node | null = end;
	while (node !== null) {
		pathOrder.unshift(node);
		node = node.previous;
	}
	return pathOrder;
};

export enum constants {
	START_NODE_ROW = 10,
	START_NODE_COL = 10,
	END_NODE_ROW = 10,
	END_NODE_COL = 40
}

export class Node {
	public isStart: boolean;
	public isEnd: boolean;
	public isWall: boolean;
	public distance: number;
	public previous: Node | null;
	public isVisited: boolean;
	public isVisuallyVisited: boolean;
	public isShortest: boolean;

	constructor(public col: number, public row: number) {
		this.isStart = false;
		this.isEnd = false;
		this.distance = Infinity;
		this.isVisited = false;
		this.isWall = false;
		this.previous = null;
		this.isShortest = false;
		this.isVisuallyVisited = false;
	}

	get color() {
		return this.isShortest
			? '#3ac2ff'
			: this.isEnd
			? 'rgb(253, 90, 90)'
			: this.isStart
			? 'rgb(17, 223, 17)'
			: this.isWall
			? 'rgb(20, 33, 61)'
			: this.isVisuallyVisited
			? 'rgba(1, 83, 160, 0.75)'
			: 'rgb(98, 122, 141)';
	}

	static from(node: Node): Node {
		const n = new Node(node.col, node.row);
		n.isStart = node.isStart;
		n.isEnd = node.isEnd;
		n.distance = node.distance;
		n.isVisited = node.isVisited;
		n.isWall = node.isWall;
		n.previous = node.previous;
		return n;
	}
}
