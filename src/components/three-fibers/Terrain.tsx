import React, { Suspense, useRef, useState } from 'react';
import { TerrainGen } from 'src/components/three-fibers/TerrainGen';
import { Canvas, useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

const Sphere = () => {
  const ref = useRef<Mesh>();
  useFrame(({ clock }, delta) => {
    const step = (clock.elapsedTime - delta) / 10;
    ref.current.position.y = -Math.cos(step) * 4 + 5;
    ref.current.position.x = -Math.sin(step) * 10;
    ref.current.position.z = -Math.cos(step) * 4 + 5;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} castShadow position={[0, 3, 0]}>
      <icosahedronBufferGeometry attach="geometry" args={[1]} />
      <meshStandardMaterial
        attach="material"
        color={0x000000}
        metalness={0.1}
        flatShading
      />
    </mesh>
  );
};

export const Lights = () => (
  <group>
    <ambientLight color={0x00ff99} position={[0, 5, 0]} intensity={0.5} />
    <pointLight
      intensity={0.7}
      castShadow
      shadowMapHeight={512}
      shadowMapWidth={512}
      shadow-mapSize-height={512}
      shadow-mapSize-width={512}
      position={[0, 15, 0]}
      color={0x0fff77}
    />
    <Sphere />
  </group>
);

export default function Terrain() {
  const ref = useRef();
  return (
    <Canvas
      shadows
      ref={ref}
      style={{
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MsUserSelect: 'none',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1
      }}
      camera={{ zoom: 8, position: [0, 0, 150] }}
    >
      <Suspense fallback={null}>
        <Lights />
        <TerrainGen />
      </Suspense>
    </Canvas>
  );
}
