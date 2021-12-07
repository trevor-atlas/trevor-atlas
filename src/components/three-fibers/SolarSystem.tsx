import React, { FC, Suspense, useState } from 'react';
import { Stars } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import { Earth } from 'src/components/three-fibers/Earth';
import { Planet } from 'src/components/three-fibers/Planet';
import { Sun } from 'src/components/three-fibers/Sun';
import { clamp } from 'src/utils/helpers';

export const SolarSystem: FC = () => {
  const [showLabels, setShowLabels] = useState(true);
  const toggleLabels = () => setShowLabels(!showLabels);

  return (
    <div className="relative">
      <Canvas
        shadowMap
        pixelRatio={clamp(window.devicePixelRatio, 1, 2)}
        style={{
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
          height: '60vh',
          bottom: 0,
          zIndex: -1
        }}
        camera={{
          fov: 90,
          far: 1000,
          position: [0, 10, 35],
          rotation: [-0.3, 0, 0]
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} color={0xffffff} />
          <pointLight
            intensity={1}
            position={[0, 0, 0]}
            color={0xffffff}
            castShadow
            shadow-camera-far={500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={500} // Amount of stars (default=5000)
            factor={8} // Size factor (default=4)
            saturation={0.5} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
          <Sun />
          <Planet
            showLabel={showLabels}
            name="mercury"
            orbitSpeed={88}
            orbitSize={5}
            scale={0.2}
            color={'#777777'}
          />
          <Planet
            showLabel={showLabels}
            name="venus"
            orbitSpeed={225}
            orbitSize={10}
            scale={0.3}
            color={'#EFCB8B'}
          />
          <Earth orbitSpeed={365} orbitSize={20} scale={1} />
          <Planet
            showLabel={showLabels}
            name="mars"
            orbitSpeed={687}
            orbitSize={30}
            scale={0.5}
            color={'#EA2600'}
          />
          <Planet
            showLabel={showLabels}
            name="jupiter"
            orbitSpeed={365 * 12}
            orbitSize={150}
            scale={4}
            color={'#AD8F8E'}
          />
          <Planet
            showLabel={showLabels}
            name="saturn"
            orbitSpeed={365 * 29}
            orbitSize={250}
            scale={3}
            color={'#dDdF8E'}
          >
            <mesh
              rotation={[Math.PI / 2.2, 0, 0]}
              position={[0, 0, 0]}
              scale={[3, 3, 3]}
              castShadow={true}
              receiveShadow={true}
            >
              <ringBufferGeometry args={[3, 5, 8]} attach="geometry" />
              <meshStandardMaterial attach="material" color={'#9DdFfE'} />
            </mesh>
          </Planet>
          <Planet
            showLabel={showLabels}
            name="uranus"
            orbitSpeed={365 * 84}
            orbitSize={500}
            scale={2.8}
            color={'#D0F5F8'}
          />
          <Planet
            showLabel={showLabels}
            name="neptune"
            orbitSpeed={365 * 165}
            orbitSize={1000}
            scale={2.8}
            color={'#99ddff'}
          />
        </Suspense>
      </Canvas>
      <div
        className=" mx-auto flex justify-center"
        style={{ width: '100%', position: 'absolute', bottom: -50 }}
      >
        <button
          style={{
            cursor: 'pointer',
            display: 'inline-block',
            margin: 0,
            background: 'rgba(255,255,255,.05)',
            padding: '.5em 1em',
            borderRadius: 5,
            userSelect: 'none',
            fontSize: 14,
            zIndex: 10
          }}
          onClick={toggleLabels}
        >
          {showLabels ? 'hide' : 'show'} labels
        </button>
      </div>
    </div>
  );
};
