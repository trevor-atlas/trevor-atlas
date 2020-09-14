import React, { FC, Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { CircleGeometry, Color, DoubleSide, Object3D, Vector3 } from 'three';

function mathRandom(num = 1) {
	return -Math.random() * num + Math.random() * num;
}

interface IHomePage {}

interface IParticleGroup {
	count: number;
}

const ParticleGroup: FC<IParticleGroup> = ({ count }) => {
	const mesh = useRef();
	const dummy = useMemo(() => new Object3D(), []);
	// Generate some random positions, speed factors and timings
	const particles = useMemo(() => {
		return Array(count)
			.fill(0)
			.map(() => {
				const t = Math.random() * 100;
				const factor = 20 + Math.random() * 100;
				const speed = 0.01 + Math.random() / 200;
				const xFactor = -50 + Math.random() * 100;
				const yFactor = -50 + Math.random() * 100;
				const zFactor = -50 + Math.random() * 100;
				return {
					t,
					factor,
					speed,
					xFactor,
					yFactor,
					zFactor,
					mx: mathRandom(),
					my: mathRandom()
				};
			});
	}, [count]);
	// The innards of this hook will run every frame
	useFrame(() => {
		// Makes the light follow the mouse
		// Run through the randomized data to calculate some movement
		particles.forEach((particle, i) => {
			let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
			// There is no sense or reason to any of this, just messing around with trigonometric functions
			t = particle.t += speed / 2;
			const a = Math.cos(t) + Math.sin(t) / 10;
			const b = Math.sin(t) + Math.cos(t * 2) / 10;
			const s = Math.cos(t);
			particle.mx += particle.mx * 0.1;
			particle.my += particle.my * 0.1;
			// Update the dummy object
			dummy.position.set(
				(particle.mx / 10) * a +
					xFactor +
					Math.cos((t / 10) * factor) +
					(Math.sin(t) * factor) / 10,
				(particle.my / 10) * b +
					yFactor +
					Math.sin((t / 10) * factor) +
					(Math.cos(t * 2) * factor) / 10,
				(particle.my / 10) * b +
					zFactor +
					Math.cos((t / 10) * factor) +
					(Math.sin(t * 3) * factor) / 10
			);
			dummy.scale.set(s, s, s);
			dummy.rotation.set(s * 5, s * 5, s * 5);
			dummy.updateMatrix();
			// And apply the matrix to the instanced item
			mesh.current.setMatrixAt(i, dummy.matrix);
		});
		mesh.current.instanceMatrix.needsUpdate = true;
	});
	return (
		<instancedMesh ref={mesh} args={[null, null, count]}>
			<dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
			<meshStandardMaterial attach="material" color="#200020" />
		</instancedMesh>
	);
};

interface IMeshGroup {
	numMeshes: number;
}

const MeshGroup: FC<IMeshGroup> = ({ numMeshes }) => {
	return <group></group>;
};

const Lights = () => {
	return (
		<group>
			<ambientLight
				color="#ffffff"
				intensity={1000}
				position={[5, 8, 6]}
				castShadow
			/>
		</group>
	);
};

export const Homepage: FC<IHomePage> = (props) => {
	return (
		<Canvas
			camera={{
				zoom: 0,
				position: [0, 0, 10],
				fov: 65,
				far: 500,
				near: 0.1
			}}
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
				zIndex: 5,
				background: '#333333'
			}}
		>
			<Lights />
			<ParticleGroup count={200} />
			<MeshGroup numMeshes={0} />
		</Canvas>
	);
};
