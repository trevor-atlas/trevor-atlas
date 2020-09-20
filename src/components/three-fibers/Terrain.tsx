import React, { Suspense, useRef } from 'react';
import { TerrainGen } from 'src/components/three-fibers/TerrainGen';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows } from 'drei';
import { Mesh } from 'three';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
softShadows();

const increase = Math.PI / 500;
let counter = 0;
const FakeSphere = () => {
	const ref = useRef<Mesh>();
	useFrame(() => {
		ref.current.rotation.y -= 0.005;
		ref.current.rotation.x += 0.005;
		ref.current.position.y = Math.sin(counter) * 5;
		ref.current.position.x = Math.cos(counter) * 5;
		counter += increase;
	});
	return (
		<mesh ref={ref} castShadow position={[9, 3, 10]}>
			<icosahedronBufferGeometry attach="geometry" args={[1.5]} />
			<meshStandardMaterial
				attach="material"
				color="#142848"
				metalness={0.1}
				flatShading
			/>
		</mesh>
	);
};

export const Lights = () => {
	return (
		<group>
			<FakeSphere />
			<ambientLight position={[0, 2, 0]} intensity={0.5} />

			<pointLight
				castShadow
				shadow-mapSize-width={10024}
				shadow-mapSize-height={10024}
				intensity={1}
				position={[8, 8, 9]}
				color={0x0fff77}
			/>
		</group>
	);
};

export default function Terrain() {
	return (
		<Canvas
			shadowMap
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
