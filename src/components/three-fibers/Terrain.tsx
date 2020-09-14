import React, { Suspense, useRef } from 'react';
import { TerrainGen } from 'src/components/three-fibers/TerrainGen';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows } from 'drei';

softShadows();

const FakeSphere = () => {
	const ref = useRef();
	useFrame(() => {
		if (ref.current) {
			ref.current.rotation.y += 0.005;
			ref.current.rotation.x += 0.005;
		}
	});
	return (
		<mesh ref={ref} castShadow position={[5, 0, 8]}>
			<icosahedronBufferGeometry attach="geometry" args={[1]} />
			<meshStandardMaterial
				attach="material"
				color="#001122"
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
				position={[8, 4, 8]}
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
