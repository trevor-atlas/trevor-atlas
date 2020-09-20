import { HTML } from 'drei';
import React, { FC, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

interface IPlanet {
	name: string;
	scale: number;
	orbitSize: number;
	orbitSpeed: number;
	color: string | number;
	showLabel: boolean;
}

const _Planet: FC<IPlanet> = ({
	name,
	scale,
	orbitSize,
	orbitSpeed,
	color,
	children,
	showLabel
}) => {
	const ref = useRef<Mesh>();
	const counter = useRef(0);

	useFrame(() => {
		// ref.current.position.y = Math.cos(counter.current) / 50;
		ref.current.position.z = -Math.cos(counter.current) * orbitSize;
		ref.current.position.x = -Math.sin(counter.current) * orbitSize;
		// ref.current.rotation.y = 45;
		ref.current.rotation.y += 0.05;
		counter.current += Math.PI / orbitSpeed;
	});

	return (
		<group ref={ref} position={[0, 0, 0]}>
			{children}
			<mesh
				scale={[scale, scale, scale]}
				castShadow={true}
				receiveShadow={true}
			>
				{showLabel && name && (
					<HTML
						style={{ paddingBottom: Math.max(scale * 20, 35) }}
						center
					>
						<small>{name}</small>
					</HTML>
				)}
				<icosahedronBufferGeometry attach="geometry" args={[2, 1]} />
				<meshStandardMaterial attach="material" color={color} />
			</mesh>
		</group>
	);
};

_Planet.defaultProps = {
	scale: 1,
	orbitSize: 10,
	color: 'red',
	orbitSpeed: 500
};

export const Planet: FC<IPlanet> = React.memo(_Planet);
