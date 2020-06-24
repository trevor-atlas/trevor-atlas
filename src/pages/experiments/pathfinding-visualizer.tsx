declare const __PATH_PREFIX__: string;
import React from 'react';
import { Grid } from '../../components/pathfinder/Grid';
import SEO from '../../components/seo';
import { Cell } from '../../components/pathfinder/Cell';
import { Container } from '../../components/Container';

const PathfindingVisualizer: React.FunctionComponent<void> = (props) => {

	return (
		<>
			<SEO title="Experiments: Pathfinding Visualizer" />
			<div className="mv6">
				<Container>
					<div className="legend">
						<h4>Legend</h4>
						<ul style={{ listStyle: 'none' }}>
							<li>
								<span><Cell isStart /><span> Start</span></span>
							</li>
							<li>
								<span><Cell isEnd /><span> End</span></span>
							</li>
							<li>
								<span><Cell isWall /><span> Wall</span></span>
							</li>
							<li>Click and drag on a grid cell to add a wall</li>
						</ul>
					</div>
				</Container>
				<Grid />
			</div>
		</>
	)
}

export default PathfindingVisualizer;