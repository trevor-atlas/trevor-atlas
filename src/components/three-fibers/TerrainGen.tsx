import React, { FC, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useMouse from 'src/hooks/useMouse';
import { clamp, getRelativeX } from 'src/utils/helpers';
import { makeNoise2D } from 'open-simplex-noise';
import { BufferGeometry, Mesh } from 'three';

const noise2D = makeNoise2D(Date.now());

const makeNoise = (x: number, y: number) => {
  return noise2D(x, y);
};

//a function to send an email to me when a field is empty

const onUpdate = ({ geometry }: { geometry: BufferGeometry }) => {
  const pos = geometry.getAttribute('position');
  const heightSegments = 1024;
  const widthSegments = 1024;
  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < widthSegments; i++) {
      // @ts-ignore
      pos.array[3 * (j * widthSegments + i) + 2] = makeNoise(i, j);
    }
  }
};

export const TerrainGen: FC = () => {
  const mesh = useRef<Mesh>();
  const mouse = useMouse();

  useFrame(() => {
    if (!mesh.current) return;
    const relativeMouseX = clamp(
      getRelativeX(mouse.current.x || 0) * 0.0000001,
      0.00001,
      0.005
    );
    mesh.current.rotation.z -= relativeMouseX;
  });

  return (
    <mesh
      // @ts-ignore
      ref={mesh}
      castShadow={true}
      receiveShadow
      onUpdate={onUpdate}
      position={[0, -2, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100, 275, 275]} />
      <meshStandardMaterial
        attach="material"
        color="#ffffff"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        shininess={0.0}
        flatShading={true}
        clipShadows={true}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      />
    </mesh>
  );
};
