import { CSSProperties, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import './noiseShader';
import { css } from '@emotion/css';

function NoisyPlane(props: any) {
  const ref = useRef<any>();
  const { viewport } = useThree();
  useFrame((state) => {
    if (!ref.current) {
      return;
    }
    ref.current.material.time = Math.sin(
      2 * Math.PI * state.clock.elapsedTime * 0.005
    );
  });

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      {/* @ts-expect-error unknown element */}
      <noiseMaterial transparent={true} opacity={0.4} />
    </mesh>
  );
}

const styles: CSSProperties = {
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
  zIndex: -5,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: 'fixed',
  pointerEvents: 'none'
};

const overlay = css`
  &::after {
    content: '';
    display: block;
    z-index: 10;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    background-image: linear-gradient(to right, #06b6d4 0%, #3b82f6 100%);
  }
`;

const classes = `${overlay}`;

export default function NoisePlane() {
  return (
    <Canvas
      style={styles}
      className={classes}
      resize={{ scroll: false, debounce: { scroll: 150, resize: 50 } }}
      dpr={[1, 2]}
      camera={{ position: [0, 1, 1] }}
    >
      <NoisyPlane rotation={[-1, -0.1, 0]} position={[0, 0, 0]} />
    </Canvas>
  );
}
