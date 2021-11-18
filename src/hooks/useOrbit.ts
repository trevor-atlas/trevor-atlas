import { MutableRefObject, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

export const useOrbit = (
  meshRef: MutableRefObject<Mesh>,
  orbitSize: number,
  orbitSpeed: number
) => {
  const counter = useRef(0);
  useFrame(() => {
    meshRef.current.position.z = -Math.cos(counter.current) * orbitSize;
    meshRef.current.position.x = -Math.sin(counter.current) * orbitSize;
    meshRef.current.rotation.y += 0.05;
    counter.current += Math.PI / orbitSpeed;
  });
};
