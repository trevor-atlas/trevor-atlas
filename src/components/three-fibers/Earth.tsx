import React, { FC, MutableRefObject, useRef, memo } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { Moon } from 'src/components/three-fibers/Moon';
import { Geometry, Mesh, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface IEarth {
	scale: number;
	orbitSize: number;
	orbitSpeed: number;
}
const _Earth: FC<IEarth> = ({ scale, orbitSize, orbitSpeed }) => {
	const ref: MutableRefObject<Mesh> = useRef();
	const { nodes } = (useLoader(GLTFLoader, '/out.glb') as unknown) as {
		nodes: {
			'URF-Height_Lampd_0': {
				geometry: Geometry;
			};
			'URF-Height_Lampd_Ice_0': {
				geometry: Geometry;
			};
			'URF-Height_watr_0': {
				geometry: Geometry;
			};
		};
	};
	const size: MutableRefObject<Vector3> = useRef(([
		scale,
		scale,
		scale
	] as unknown) as Vector3);
	const counter = useRef(0);

	useFrame(() => {
		ref.current.position.y = Math.cos(counter.current);
		ref.current.position.z = Math.cos(counter.current) * orbitSize;
		ref.current.position.x = Math.sin(counter.current) * orbitSize;
		ref.current.rotation.y += 0.05;
		counter.current += Math.PI / orbitSpeed;
	});
	return (
		<group ref={ref}>
			<Moon />
			<group>
				<mesh
					scale={size.current}
					geometry={nodes['URF-Height_Lampd_0'].geometry}
					position={[0, 0, 0]}
					castShadow={true}
					receiveShadow={true}
				>
					<meshStandardMaterial
						attach="material"
						color="lightgreen"
					/>
				</mesh>
				<mesh
					scale={size.current}
					geometry={nodes['URF-Height_Lampd_Ice_0'].geometry}
					position={[0, 0, 0]}
					castShadow={true}
					receiveShadow={true}
				>
					<meshStandardMaterial attach="material" color="white" />
				</mesh>

				<mesh
					scale={size.current}
					geometry={nodes['URF-Height_watr_0'].geometry}
					position={[0, 0, 0]}
					castShadow={true}
					receiveShadow={true}
				>
					<meshStandardMaterial attach="material" color="#3355ff" />
				</mesh>
			</group>
		</group>
	);
};

_Earth.defaultProps = {
	scale: 1,
	orbitSize: 3
};

export const Earth = memo(_Earth);
