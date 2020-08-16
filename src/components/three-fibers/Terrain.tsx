import React, { Suspense, useEffect } from 'react';
import { Color } from 'three';
import { Canvas } from 'react-three-fiber';
import { useFrame, useUpdate } from 'react-three-fiber';
import { PerlinNoise } from './perlin';
const noise = new PerlinNoise(Math.random());

const Terrain = () => {
	const mesh = useUpdate(({ geometry }) => {
		const pos = geometry.getAttribute('position');
		const pa = pos.array;
		const hVerts = geometry.parameters.heightSegments + 1;
		const wVerts = geometry.parameters.widthSegments + 1;
		for (let j = 0; j < hVerts; j++) {
			for (let i = 0; i < wVerts; i++) {
				const ex = 1.1;
				pa[3 * (j * wVerts + i) + 2] =
					(noise.simplex2(i / 100, j / 100) +
						noise.simplex2((i + 200) / 50, j / 50) *
							Math.pow(ex, 1) +
						noise.simplex2((i + 400) / 25, j / 25) *
							Math.pow(ex, 2) +
						noise.simplex2((i + 600) / 12.5, j / 12.5) *
							Math.pow(ex, 3) +
						+(
							noise.simplex2((i + 800) / 6.25, j / 6.25) *
							Math.pow(ex, 4)
						)) /
					2;
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
		<mesh ref={mesh}>
			<planeBufferGeometry
				attach="geometry"
				args={[100, 100, 275, 275]}
			/>
			<meshPhongMaterial
				attach="material"
				color={'#2b32be'}
				specular={new Color('#5b30be')}
				shininess={9}
				smoothShading
			/>
		</mesh>
	);
};

const FakeSphere = () => (
	<mesh position={[8, 1, 2]}>
		<sphereBufferGeometry attach="geometry" args={[0.5, 150, 50]} />
		<meshBasicMaterial attach="material" color={0xd6d7ff} />
	</mesh>
);

export const Lights = () => {
	return (
		<group>
			<FakeSphere />
			<ambientLight position={[8, 2, 2]} intensity={0.5} />

			<directionalLight
				intensity={0.3}
				position={[8, 2, 2]}
				color={0xffffff}
			/>

			<pointLight intensity={1} position={[8, 2, 3]} color={0xffcc77} />
		</group>
	);
};

export default function FOO() {
	return (
		<Canvas
			style={{
				margin: 0,
				padding: 0,
				overflow: 'hidden',
				zIndex: 100,
				WebkitTouchCallout: 'none',
				WebkitUserSelect: 'none',
				KhtmlUserSelect: 'none',
				MozUserSelect: 'none',
				MsUserSelect: 'none',
				width: '100vw',
				height: '100vh',
				position: 'fixed',
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				zIndex: -1
			}}
			camera={{ zoom: 40, position: [0, 0, 500] }}
		>
			<Suspense fallback={null}>
				<Lights />
				<Terrain />
			</Suspense>
		</Canvas>
	);
}
