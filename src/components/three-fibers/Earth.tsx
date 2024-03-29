import React, { FC, MutableRefObject, useRef, memo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Moon } from 'src/components/three-fibers/Moon';
import { Color, DoubleSide, Mesh, Vector3 } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

interface EarthProps {
  scale: number;
  orbitSize: number;
  orbitSpeed: number;
}

export function Earth({ scale = 1, orbitSize = 3, orbitSpeed }: EarthProps) {
  const earth = useRef<Mesh>();
  const clouds = useRef<Mesh>();
  const earthMap = useLoader(TextureLoader, '/images/earthmap1k.jpeg');
  const earthBump = useLoader(TextureLoader, '/images/earthbump1k.jpeg');
  const earthSpec = useLoader(TextureLoader, '/images/water_4k.png');
  const cloudMap = useLoader(TextureLoader, '/images/fair_clouds_4k.png');
  const size: MutableRefObject<Vector3> = useRef([
    scale,
    scale,
    scale
  ] as unknown as Vector3);
  const counter = useRef(0);

  useFrame(() => {
    if (!earth.current || !clouds.current) {
      return;
    }
    earth.current.position.y = Math.cos(counter.current);
    earth.current.position.z = Math.cos(counter.current) * orbitSize;
    earth.current.position.x = Math.sin(counter.current) * orbitSize;
    earth.current.rotation.y += 0.02;

    clouds.current.rotation.y += 0.001;
    clouds.current.rotation.z += 0.001;
    counter.current += Math.PI / orbitSpeed;
  });
  return (
    // @ts-ignore
    <group ref={earth}>
      <Moon />
      <group>
        <mesh
          scale={size.current}
          position={[0, 0, 0]}
          castShadow={true}
          receiveShadow={true}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            bumpMap={earthBump}
            bumpScale={5}
            specularMap={earthSpec}
            specular={new Color('grey')}
            map={earthMap}
            color="white"
          />
        </mesh>

        <mesh
          // @ts-ignore
          ref={clouds}
          scale={size.current}
          position={[0, 0, 0]}
          castShadow={true}
          receiveShadow={true}
        >
          <sphereGeometry args={[1.01, 32, 32]} />
          <meshPhongMaterial
            side={DoubleSide}
            transparent={true}
            depthWrite={false}
            opacity={0.8}
            map={cloudMap}
          />
        </mesh>
      </group>
    </group>
  );
}
