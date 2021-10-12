import React, { Suspense, useRef, useState } from 'react';
import { TerrainGen } from 'src/components/three-fibers/TerrainGen';
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows } from '@react-three/drei';
import useMouse from 'src/hooks/useMouse';
import { clamp, getRelativeY } from 'src/utils/helpers';
import { Mesh } from 'three';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
softShadows();

const Sphere = () => {
  const ref = useRef<Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(({ clock }, delta) => {
    ref.current.rotation.y -= 0.005;
    ref.current.rotation.x += 0.005;
    ref.current.position.x = Math.cos(clock.elapsedTime) * 12;
    ref.current.position.y = Math.sin(clock.elapsedTime) * 4;
    ref.current.position.z = -Math.sin(clock.elapsedTime) * 2 + 10;
  });

  return (
    <mesh
      ref={ref}
      castShadow
      position={[0, 1, -10]}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <icosahedronBufferGeometry attach="geometry" args={[1.5]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'orange' : '#142848'}
        metalness={0.1}
        flatShading
      />
    </mesh>
  );
};

export const Lights = () => (
  <group>
    <Sphere />
    <ambientLight position={[0, 2, 0]} intensity={0.5} />
    <pointLight
      castShadow
      shadow-mapSize-width={10024}
      shadow-mapSize-height={10024}
      intensity={1}
      position={[8, 8, 9]}
      color={0x0fff77}
    />
  </group>
);

export default function Terrain() {
  const ref = useRef();
  return (
    <Canvas
      shadowMap
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
      camera={{ zoom: 40, position: [0, 0, 500] }}
    >
      <Suspense fallback={null}>
        <Lights />
        <TerrainGen />
      </Suspense>
    </Canvas>
  );
}
