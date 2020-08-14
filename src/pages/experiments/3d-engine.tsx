declare const __PATH_PREFIX__: string
import { Vector3 } from '@babylonjs/core'
import { graphql } from 'gatsby'
import { Location } from 'history'
import React, { useEffect } from 'react'
import { Camera } from '../../components/3d-engine/Camera';
import { Engine } from '../../components/3d-engine/Engine';
import { Mesh } from '../../components/3d-engine/Mesh';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { Container } from '../../components/Container';

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
let mesh: Mesh;
let meshes: Mesh[] = [];
let mera: Camera;

const PathfindingVisualizer: React.FunctionComponent<Props> = (props) => {
	const { data } = props
	const siteTitle = data.site.siteMetadata.title

	useEffect(() => {
		const setup = async () => {
			canvas = document.getElementById('3d') as HTMLCanvasElement
			mesh = new Mesh('Cube', 8, 12);
			meshes.push(mesh)
			mera = new Camera()
			engine = new Engine(canvas)

			mesh.vertices[0] = new Vector3(-1, 1, 1);
			mesh.vertices[1] = new Vector3(1, 1, 1);
			mesh.vertices[2] = new Vector3(-1, -1, 1);
			mesh.vertices[3] = new Vector3(1, -1, 1);
			mesh.vertices[4] = new Vector3(-1, 1, -1);
			mesh.vertices[5] = new Vector3(1, 1, -1);
			mesh.vertices[6] = new Vector3(1, -1, -1);
			mesh.vertices[7] = new Vector3(-1, -1, -1);

			mesh.faces[0] = { A:0, B:1, C:2 };
			mesh.faces[1] = { A:1, B:2, C:3 };
			mesh.faces[2] = { A:1, B:3, C:6 };
			mesh.faces[3] = { A:1, B:5, C:6 };
			mesh.faces[4] = { A:0, B:1, C:4 };
			mesh.faces[5] = { A:1, B:4, C:5 };

			mesh.faces[6] = { A:2, B:3, C:7 };
			mesh.faces[7] = { A:3, B:6, C:7 };
			mesh.faces[8] = { A:0, B:2, C:7 };
			mesh.faces[9] = { A:0, B:4, C:7 };
			mesh.faces[10] = { A:4, B:5, C:6 };
			mesh.faces[11] = { A:4, B:6, C:7 };
			//
			mera.position = new Vector3(0, 0, 20)
			mera.target = new Vector3(0, 0, 0)

			// meshes = await engine.loadJSONFile();

			requestAnimationFrame(drawingLoop)
		}
		setup();
	}, []);

	function drawingLoop() {
		engine.clear()

		for (let i = 0; i < meshes.length; i++) {
			meshes[i].rotation.x += 0.01;
			meshes[i].rotation.y += 0.01;
		}
		// Doing the various matrix operations
		engine.render(mera, meshes)
		// Flushing the back buffer into the front buffer
		engine.present()

		// Calling the HTML5 rendering loop recursively
		requestAnimationFrame(drawingLoop)
	}

	return (
		<>
			<Layout title={siteTitle}>
				<SEO title="Experiments: 3D Engine"/>
				<div className="mv6">
					<Container>
						<canvas id="3d" style={{
							margin: '0 auto',
							background: '#111'
						}}></canvas>
					</Container>
				</div>
			</Layout>
		</>
	)
}

export default PathfindingVisualizer

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
