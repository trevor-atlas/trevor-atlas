import React, { FC, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useMouse from 'src/hooks/useMouse';
import { clamp, getRelativeX } from 'src/utils/helpers';
import { makeNoise2D } from 'open-simplex-noise';

const noise2D = makeNoise2D(Date.now());

const makeNoise = (x: number, y: number) => {
  const ex = 1.1;
  return (
    noise2D(x / 200, y / 200) +
    noise2D(x / 50, y / 50) * ex ** 1 +
    noise2D(x / 25, y / 25) * ex ** 2 +
    noise2D(x / 12.5, y / 12.5) * ex ** 3 +
    noise2D(x / 4, y / 4) * ex ** 4
  );
};

const onUpdate = ({ geometry }) => {
  const pos = geometry.getAttribute('position');
  const heightSegments = 275;
  const widthSegments = 275;
  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < widthSegments; i++) {
      pos.array[3 * (j * widthSegments + i) + 2] = makeNoise(i, j);
    }
  }
};

export const TerrainGen: FC = () => {
  const mesh = useRef();
  const mouse = useMouse();
  const center = window.innerWidth / 2;

  useFrame((time) => {
    if (!mesh.current) return;
    const relativeMouseX = clamp(
      getRelativeX(mouse.current.x) * 0.00001,
      0.00001,
      0.005
    );
    if (mouse.current.x < center) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mesh.current.rotation.z += relativeMouseX;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mesh.current.rotation.z -= relativeMouseX;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mesh.current.rotation.x = 175;
  });

  return (
    <mesh ref={mesh} receiveShadow onUpdate={onUpdate} position={[0, -2, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100, 275, 275]} />
      <meshPhongMaterial
        attach="material"
        color="#2b32be"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        specular={0x999999}
        shininess={9}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        smoothShading
      />
    </mesh>
  );
};
