// run Dijkstra's algorithm against a given grid, start and end.
// returns nodes in the order they were visited and ensures that each node points to the previous node.
// This allows us to compute the shortest path by backtracking to the start.
export const dijkstra = (grid: Node[][], start: Node, end: Node): Node[] => {
    const visitedInOrder = [];
    start.distance = 0;
    const unvisited = getAllNodes(grid);
    console.log(unvisited)

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
    const {col, row} = node;

    if (row > 0) {
        const up = grid[row-1][col];
        if (!up.isVisited) neighbors.push(up);
    }
    if (row < grid.length-1) {
        const down = grid[row+1][col];
        if (!down.isVisited) neighbors.push(down);
    }
    if (col > 0) {
        const left = grid[row][col-1];
        if (!left.isVisited) neighbors.push(left);
    }
    if (col < grid[0].length-1) {
        const right = grid[row][col+1];
        if (!right.isVisited) neighbors.push(right);
    }
    return neighbors;
}

const getGridStart = (grid: Node[][]) => {
    const height = grid.length;
    const width = grid[0].length;
    return {row: Math.floor(height/2), col: Math.floor(width/4)}
}

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
}

export enum constants {
    START_NODE_ROW = 10,
    START_NODE_COL = 10,
    END_NODE_ROW = 10,
    END_NODE_COL = 40
}

export class Node {
    constructor(
        public col: number,
        public row: number
    ) {
        this.isStart = row === constants.START_NODE_ROW && col === constants.START_NODE_COL;
        this.isEnd = row === constants.END_NODE_ROW && col === constants.END_NODE_COL;
        this.distance = Infinity;
        this.isVisited = false;
        this.isWall = false;
        this.previous = null;
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

    public isStart: boolean;
    public isEnd: boolean;
    public isWall: boolean;
    public distance: number;
    public previous: Node | null;
    public isVisited: boolean;
}