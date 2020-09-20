import React, { FC, useEffect, useRef } from 'react';
import { useFrame, useUpdate } from 'react-three-fiber';
import { PerlinNoise } from 'src/components/three-fibers/perlin';
import { Color } from 'three';

export const TerrainGen: FC = () => {
	const noise = useRef(new PerlinNoise(Math.random()));
	const mesh: any = useUpdate(({ geometry }) => {
		const pos = geometry.getAttribute('position');
		const pa = pos.array;
		const hVerts = geometry.parameters.heightSegments + 1;
		const wVerts = geometry.parameters.widthSegments + 1;
		for (let j = 0; j < hVerts; j++) {
			for (let i = 0; i < wVerts; i++) {
				const ex = 1.1;
				pa[3 * (j * wVerts + i) + 2] =
					noise.current.simplex2(i / 100, j / 100) +
					noise.current.simplex2((i + 200) / 50, j / 50) *
						Math.pow(ex, 1) +
					noise.current.simplex2((i + 400) / 25, j / 25) *
						Math.pow(ex, 2) +
					noise.current.simplex2((i + 600) / 12.5, j / 12.5) *
						Math.pow(ex, 3) +
					+(
						noise.current.simplex2((i + 800) / 6.25, j / 6.25) *
						Math.pow(ex, 4)
					);
			}
		}

		pos.needsUpdate = true;
	}, []);

	useEffect(() => {
		mesh.current.rotation.x = 175;
	}, [mesh.current]);

	useFrame(() => {
		mesh.current.rotation.z += 0.001;
	});

	return (
		<mesh ref={mesh} receiveShadow>
			<planeBufferGeometry
				attach="geometry"
				args={[100, 100, 275, 275]}
			/>
			<meshPhongMaterial
				attach="material"
				color={'#2b32be'}
				specular={new Color('#5b30be')}
				shininess={9}
				//eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				smoothShading
			/>
		</mesh>
	);
};
