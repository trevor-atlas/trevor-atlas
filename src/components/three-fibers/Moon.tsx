import React, { FC, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface IMoon {
  scale?: number;
}

let counter = 0;
const increase = Math.PI / 500;

export function Moon({ scale = 0.08 }: IMoon) {
  const ref = useRef<Mesh>();
  useFrame(() => {
    if (!ref.current) {
      return;
    }
    ref.current.position.y = Math.cos(counter) / 2;
    ref.current.rotation.y -= 0.05;
    ref.current.rotation.x += 0.05;

    counter += increase;
  });
  return (
    <mesh
      // @ts-ignore
      ref={ref}
      position={[3, 0, 0]}
      scale={[scale, scale, scale]}
      castShadow={true}
      receiveShadow={true}
    >
      <icosahedronBufferGeometry attach="geometry" args={[2, 1]} />
      <meshStandardMaterial
        attach="material"
        color={'#ddddff'}
        emissive={0xddddff as any}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
