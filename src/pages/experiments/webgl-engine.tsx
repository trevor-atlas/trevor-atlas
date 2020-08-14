declare const __PATH_PREFIX__: string;
import { Vector3 } from '@babylonjs/core';
import { graphql } from 'gatsby';
import { Location } from 'history';
import React, { useEffect } from 'react';
import { Engine } from '../../components/webgl-engine/Engine';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

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

let canvas: HTMLCanvasElement;
let engine: Engine;

const PathfindingVisualizer: React.FunctionComponent<Props> = (props) => {
	const { data } = props;
	const siteTitle = data.site.siteMetadata.title;

	useEffect(() => {
		canvas = document.getElementById('3d') as HTMLCanvasElement;
		engine = new Engine(canvas);

		requestAnimationFrame(engine.start);
		// window.onresize = () => engine.resize();
	}, []);

	return (
		<>
			<Layout title={siteTitle}>
				<SEO title="Experiments: 3D Engine"/>
				<canvas id="3d" style={{
					display: 'block',
					margin: '0 auto',
					background: '#111'
				}}></canvas>
			</Layout>
		</>
	);
};

export default PathfindingVisualizer;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
