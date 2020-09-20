import React, { FC, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';
interface ISun {
	scale?: number;
}
export const _Sun: FC<ISun> = ({ scale }) => {
	const ref = useRef<Mesh>();
	useFrame(() => {
		ref.current.rotation.y -= 0.005;
		ref.current.rotation.x += 0.005;
	});
	return (
		<mesh
			ref={ref}
			position={[0, 0, 0]}
			scale={[scale, scale, scale]}
			castShadow={false}
			receiveShadow={false}
		>
			<icosahedronBufferGeometry attach="geometry" args={[2, 1]} />
			<meshStandardMaterial
				attach="material"
				color={'#fff546'}
				emissive={0xf8d586 as any}
				emissiveIntensity={1.2}
			/>
		</mesh>
	);
};

_Sun.defaultProps = {
	scale: 1.5
};

export const Sun: FC<ISun> = React.memo(_Sun);
