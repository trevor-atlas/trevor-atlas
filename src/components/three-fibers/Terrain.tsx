import React, { Suspense, useRef, useState } from 'react';
import { TerrainGen } from 'src/components/three-fibers/TerrainGen';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, PointLightShadow } from 'three';
import { useGLTF, softShadows } from '@react-three/drei';

softShadows();

function Model(props: any) {
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf'
  );
  return <primitive object={scene} {...props} />;
}

const Sphere = () => {
  const ref = useRef<Mesh>();
  useFrame(({ clock }, delta) => {
    if (!ref.current) {
      return;
    }
    const step = (clock.elapsedTime - delta) / 5;
    ref.current.position.y = -Math.cos(step) * 1;
    ref.current.position.x = -Math.sin(step) * 4;
    ref.current.position.z = -Math.cos(step) * 0.5;
    // ref.current.rotation.y += 0.01;
    ref.current.rotation.y += 0.01;
    // ref.current.rotation.z += 0.01;
  });

  return (
    // @ts-ignore
    <mesh ref={ref} castShadow position={[0, 3, 0]}>
      <Model />
    </mesh>
  );
};

export const Lights = () => {
  return (
    <group>
      <ambientLight color={0xaaddff} position={[0, 5, 0]} intensity={0.7} />
      <pointLight
        intensity={0.8}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        position={[0, 15, 0]}
        color={0xffffff}
        shadowBias={0.2}
      />
      <Sphere />
    </group>
  );
};

export default function Terrain() {
  const ref = useRef();
  return (
    <Canvas
      shadows
      softShadows
      // @ts-ignore
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
      camera={{
        zoom: 1,
        position: [0, 2, 25],
        rotation: [-Math.PI / 3, -0.5, 0.5]
      }}
    >
      <Suspense fallback={null}>
        <Lights />
        <TerrainGen />
      </Suspense>
    </Canvas>
  );
}
