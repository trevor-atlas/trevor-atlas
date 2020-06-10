import React from 'react';
import { Cell } from './Cell';
import { Node, dijkstra, getNodesInShortestPathOrder, constants } from '../../utils/dijkstra';
import { Button, ButtonGroup, Intent, Slider } from '@blueprintjs/core'

import './Pathfinder.css';
import { sleep } from '../../utils/helpers';
import { Container } from '../Container';
import { setClass } from '../../utils/dom';

interface Props {

}
interface State {
    grid: Node[][];
    timestamp: number;
    mouseIsPressed: boolean;
    width: number;
    height: number;
    running: boolean;
    ran: boolean;
    animationSpeed: number;
    windowWidth: number;
    windowHeight: number;
}

export class Grid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            grid: [],
            timestamp: Date.now(),
            mouseIsPressed: false,
            width: 50,
            height: 20,
            running: false,
            ran: false,
            animationSpeed: 10,
            windowHeight: Infinity,
            windowWidth: Infinity 
        };
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.init();
    }

    init = () => {
        this.setState({ran: false})
        this.setState({running: true})
        const grid = getInitialGrid();
        const timestamp = Date.now();
        this.setState({ grid, timestamp });
        this.setState({running: false})
    }

    handleMouseDown = (row: number, col: number) => {
        return () => {
            if (this.state.running) return;
            if (this.state.grid[row][col].isStart || this.state.grid[row][col].isEnd) return;
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }

    handleMouseEnter = (row: number, col: number) => {
        return () => {
            if (this.state.running) return;
            if (!this.state.mouseIsPressed) return;
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp = () => {
        this.setState({ mouseIsPressed: false });
    }

    async animateDijkstra(visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            await sleep(this.state.animationSpeed - Math.log(i), () => {
                const node = visitedNodesInOrder[i];
                if (node.isStart || node.isEnd) return;
                setClass(`#cell-${node.row}-${node.col}`, 'cell cell-visited');
            });
        }

        await this.animateShortestPath(nodesInShortestPathOrder);
    }

    async animateShortestPath(nodesInShortestPathOrder: Node[]) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            await sleep(this.state.animationSpeed - Math.log(i), () => {
                const node = nodesInShortestPathOrder[i];
                if (node.isStart || node.isEnd) return;
                setClass(`#cell-${node.row}-${node.col}`, 'cell cell-shortest-path');
            });
        }
    }

    visualizeDijkstra = async () => {
        this.setState({ran: true})
        this.handleMouseUp();
        this.setState({running: true})
        const { grid } = this.state;
        const startNode = grid[constants.START_NODE_ROW][constants.START_NODE_COL];
        const finishNode = grid[constants.END_NODE_ROW][constants.END_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        await this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        this.setState({running: false})
    }

    render() {
        const { windowWidth, grid, width, height, timestamp, running, ran } = this.state;
        if (windowWidth < 1024) return (
            <Container>
                <p>Screen is not large enough to render the pathfinder! :(</p>
            </Container>

        );
        return (
            <div className="grid" >
            <ButtonGroup>
                <Button
                    disabled={running || ran}
                    text="Dijkstra's Algorithm"
                    onClick={this.visualizeDijkstra}
                />
                <Button
                    disabled={running}
                    text="reset"
                    icon="refresh"
                    onClick={this.init}
                />
            </ButtonGroup>
                <div className="gid-inner" onMouseLeave={this.handleMouseUp}>
                    {grid.map((row, rowIdx) => (
                            <div
                                onClick={() => void 0}
                                onMouseDown={() => void 0}
                                style={{margin: 0, padding: 0, lineHeight: 0}}
                                key={`${rowIdx}${timestamp}`}>
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
            </div>
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