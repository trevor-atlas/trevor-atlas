import { Html } from '@react-three/drei';
import React, { FC, useRef } from 'react';
import { useOrbit } from 'src/hooks/useOrbit';
import { Mesh } from 'three';

interface IPlanet {
  name: string;
  scale: number;
  orbitSize: number;
  orbitSpeed: number;
  color: string | number;
  showLabel: boolean;
}

export const Planet: FC<IPlanet> = ({
  name,
  scale = 20,
  orbitSize = 10,
  orbitSpeed = 500,
  color = 'red',
  children,
  showLabel
}) => {
  const ref = useRef<Mesh>();
  useOrbit(ref, orbitSize, orbitSpeed);

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {children}
      <mesh
        scale={[scale, scale, scale]}
        castShadow={true}
        receiveShadow={true}
      >
        {showLabel && name && (
          <Html style={{ paddingBottom: Math.max(scale * 20, 35) }} center>
            <small>{name}</small>
          </Html>
        )}
        <icosahedronBufferGeometry args={[2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};
