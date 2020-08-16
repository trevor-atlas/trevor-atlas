import React, { Suspense } from 'react';
import { TerrainGen } from 'src/components/three-fibers/TerrainGen';
import { Canvas } from 'react-three-fiber';

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

export default function Terrain() {
	return (
		<Canvas
			style={{
				margin: 0,
				padding: 0,
				overflow: 'hidden',
				WebkitTouchCallout: 'none',
				WebkitUserSelect: 'none',
				KhtmlUserSelect: 'none',
				MozUserSelect: 'none',
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
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
				<TerrainGen />
			</Suspense>
		</Canvas>
	);
}
