import React, { FC, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Color, Mesh } from 'three';
interface ISun {
	scale?: number;
}
const color = new Color('#ff8d11');
export const Sun: FC<ISun> = ({ scale = 3 }) => {
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
			<sphereGeometry args={[1, 20, 20]} />
			<meshPhongMaterial
				color={color}
				emissive={color}
				emissiveIntensity={1}
			/>
		</mesh>
	);
};
