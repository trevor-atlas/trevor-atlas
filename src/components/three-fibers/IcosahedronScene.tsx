import React, {
  CSSProperties,
  FC,
  MutableRefObject,
  RefObject,
  Suspense,
  useRef,
  useState
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { clamp } from 'src/utils/helpers';
import { BufferGeometry, Color, Material, Mesh, Object3D, Vector3 } from 'three';

const center = new Vector3(0, 0, 0);
const lookAtCenter = () => center;
const dpr = clamp(window.devicePixelRatio, 1, 2);
const styles: CSSProperties = {
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  background: '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  MsUserSelect: 'none',
  width: '100%',
  height: '100%',
  bottom: 0,
  zIndex: -5,
  backfaceVisibility: 'hidden',
  perspective: 1000,
  transform: 'translate3d(0,0,0), translateZ(0)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  pointerEvents: 'none'
};

function rand(num = 1) {
  return -Math.random() * num + Math.random() * num;
}
const fogColor = new Color(0x111111);

function IcosahedronScene() {
  return (
    <Canvas
      shadows
      dpr={dpr}
      style={styles}
      camera={{
        fov: 90,
        far: 1000,
        position: [0, 0, 5],
        aspect: window.innerWidth / window.innerHeight
      }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" color={fogColor} near={0} far={7} />
        <ambientLight intensity={0.4} color={0xffffff} />
        <pointLight
          intensity={0.3}
          position={[0, 8, -8]}
          color={0xffffff}
          castShadow
          shadow-camera-far={500}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          lookAt={lookAtCenter}
        />
        <spotLight
          position={[0, 8, 6]}
          castShadow
          intensity={0.5}
          color={0xffffff}
          penumbra={1.5}
          lookAt={lookAtCenter}
        />

        <Icosahedrons />
      </Suspense>
    </Canvas>
  );
}

function Icosahedrons() {
  const groupRef = useRef<Mesh>();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
      // groupRef.current.rotation.x += 0.0005;
      // groupRef.current.rotation.z += 0.0005;
    }
  });
  return (
    <group ref={groupRef}>
      {Array(30)
        .fill(0)
        .map((_, i) => {
          const scale = Math.abs(clamp(rand(0.75), .1, .4));
          const values = {
            position: {
              x: rand(4),
              y: rand(4),
              z: rand(4)
            },
            scale,
            rotation: {
              x: rand((80 * Math.PI) / 180),
              y: rand((180 * Math.PI) / 180),
              z: rand((280 * Math.PI) / 180)
            }
          };

          return (
            <Icosahedron
              idx={i}
              key={i.toString()}
              scale={scale}
              position={values.position}
              rotation={values.rotation}
            />
          );
        })}
    </group>
  );
}

function Icosahedron({
  idx,
  scale = 1,
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
}) {
  const ref = useRef<Mesh>();
  useFrame(({ clock }, delta) => {
    const step = (clock.elapsedTime - delta) / 6;
      // ref.current.rotation.x += 0.008;
      // ref.current.rotation.y += 0.005;
      // ref.current.rotation.z += 0.003;

      ref.current.position.x =
        position.x + Math.sin(step * position.z);
      ref.current.position.y =
        position.y + Math.cos(step * position.x);
      ref.current.position.z =
        position.z + Math.sin(step * position.y);
      const t = clock.getElapsedTime()

      ref.current.rotation.set(Math.cos(t / 4) / 2, Math.sin(t / 4) / 2, Math.cos(t / 1.5) / 2)
      ref.current.position.y += Math.sin(t / 1.5) / 2;

  });
  return (
    <mesh
      ref={ref}
      receiveShadow
      castShadow
      scale={scale}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <icosahedronGeometry args={[1]} />
      <meshStandardMaterial
        flatShading
        color={0xff9654}
        transparent={false}
        opacity={1}
      />
    </mesh>
  );
}

export default IcosahedronScene;
