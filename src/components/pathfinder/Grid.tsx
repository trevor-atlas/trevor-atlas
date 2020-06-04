import React from 'react';
import { Cell } from './Cell';
import { Node, dijkstra, getNodesInShortestPathOrder, constants } from '../../utils/dijkstra';

import './Pathfinder.css';

interface Props {

}
interface State {
    grid: Node[][];
    timestamp: number;
    mouseIsPressed: boolean;
}

export class Grid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            grid: [],
            timestamp: Date.now(),
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        const grid = getInitialGrid();
        const timestamp = Date.now();
        this.setState({ grid, timestamp });
    }

    handleMouseDown = (row: number, col: number) => {
        return () => {
            if (this.state.grid[row][col].isStart || this.state.grid[row][col].isEnd) return;
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }

    handleMouseEnter = (row: number, col: number) => {
        return () => {
            if (!this.state.mouseIsPressed) return;
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp = () => {
        this.setState({ mouseIsPressed: false });
    }

    animateDijkstra(visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (node.isStart || node.isEnd) return;
                const domNode = document.getElementById(`cell-${node.row}-${node.col}`);
                if (domNode) domNode.className = 'cell cell-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder: Node[]) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (node.isStart || node.isEnd) return;
                const domNode = document.getElementById(`cell-${node.row}-${node.col}`);
                if (domNode) domNode.className = 'cell cell-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDijkstra = () => {
        const { grid } = this.state;
        const startNode = grid[constants.START_NODE_ROW][constants.START_NODE_COL];
        const finishNode = grid[constants.END_NODE_ROW][constants.END_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() {
        const { grid } = this.state;
        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Dijkstra's Algorithm
                </button>
                <button onClick={this.init}>
                    reset
                </button>
                <div className="grid" onMouseLeave={this.handleMouseUp}>
                    {grid.map((row, rowIdx) => (
                            <div
                                onClick={() => void 0}
                                onMouseDown={() => void 0}
                                style={{margin: 0, padding: 0, lineHeight: 0}}
                                key={`${rowIdx}${this.state.timestamp}`}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isEnd, isStart, isWall } = node;
                                    return (
                                        <Cell
                                            key={`row-${rowIdx}-col-${nodeIdx}`}
                                            col={col}
                                            isEnd={isEnd}
                                            isStart={isStart}
                                            isWall={isWall}
                                            onMouseDown={this.handleMouseDown(row, col)}
                                            onMouseEnter={this.handleMouseEnter(row, col)}
                                            onMouseUp={this.handleMouseUp}
                                            row={row}
                                        />
                                    );
                                })}
                            </div>
                        )
                    )}
                </div>
            </>
        );
    }
}

const getInitialGrid = (width = 50, height = 20) => {
    const grid = [];
    for (let row = 0; row < height; row++) {
        const currentRow = [];
        for (let col = 0; col < width; col++) {
            currentRow.push(new Node(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const getNewGridWithWallToggled = (grid: Node[][], row: number, col: number): Node[][] => {
    const newGrid = grid.slice();
    newGrid[row][col].isWall = !newGrid[row][col].isWall
    return newGrid;
};