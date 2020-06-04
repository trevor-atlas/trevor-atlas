declare const __PATH_PREFIX__: string;
import { graphql } from 'gatsby';
import { Location } from 'history';
import React from 'react';
import Layout from '../../components/layout';
import { Grid } from '../../components/pathfinder/Grid';
import SEO from '../../components/seo';
import {Cell} from '../../components/pathfinder/Cell';
import {Container} from '../../components/Container';

interface Props {
	data: {
		site: {
			siteMetadata: {
				title: string;
			}
		}
	};
	location: Location
}
const PathfindingVisualizer: React.FunctionComponent<Props> = (props) =>{
		const { data } = props;
		const siteTitle = data.site.siteMetadata.title;

		return (
			<>
				<Layout title={siteTitle}>
					<SEO title="Experiments: Binary Counter" />
					<div className="mv6">
						<Container>
							<div className="legend">
								<h4>Legend</h4>
								<ul style={{listStyle: 'none'}}>
									<li>
										<span><Cell isStart/><span> Start</span></span>
									</li>
									<li>
										<span><Cell isEnd/><span> End</span></span>
									</li>
									<li>
										<span><Cell isWall/><span> Wall</span></span>
									</li>
									<li>Click and drag on a grid cell to add a wall</li>
								</ul>
							</div>
						</Container>
						<Grid />
					</div>
				</Layout>
			</>
		)
}

export default PathfindingVisualizer;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
