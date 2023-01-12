import { Html } from '@react-three/drei';
import React, { FC, ReactNode, useRef } from 'react';
import { useOrbit } from 'src/hooks/useOrbit';
import { Mesh } from 'three';

interface IPlanet {
  name: string;
  scale: number;
  orbitSize: number;
  orbitSpeed: number;
  color: string | number;
  showLabel: boolean;
  children?: ReactNode | null;
}

export function Planet({
  name,
  scale = 20,
  orbitSize = 10,
  orbitSpeed = 500,
  color = 'red',
  children,
  showLabel
}: IPlanet) {
  const ref = useRef<Mesh>();
  useOrbit(ref.current, orbitSize, orbitSpeed);

  return (
    // @ts-ignore
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
}
