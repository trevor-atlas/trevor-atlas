import { RefObject, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Nullable } from 'src/types';

export const useOrbit = (
  meshRef: Nullable<Mesh>,
  orbitSize: number,
  orbitSpeed: number
) => {
  const counter = useRef(0);
  useFrame(() => {
    if (!meshRef) {
      return;
    }
    meshRef.position.z = -Math.cos(counter.current) * orbitSize;
    meshRef.position.x = -Math.sin(counter.current) * orbitSize;
    meshRef.rotation.y += 0.05;
    counter.current += Math.PI / orbitSpeed;
  });
};
