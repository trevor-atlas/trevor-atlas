import React, { Suspense, useMemo } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { Vector3 } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const fragmentShader = `
uniform float uShift;
uniform sampler2D uShape;

varying vec2 vUv;
varying vec3 vPosition;
vec2 uv = vUv;
uv.x += uShift;

vec4 shapeData = texture2D(uShape, gl_PointCoord);
if (shapeData.a < 0.0625)
  discard;

vec4 newColor = vec4(vPosition, 1.0);
newColor = newColor * shapeData;`;

const vertexShader = `
uniform float uScale;
uniform float uTime;
uniform vec3 uTargetPos;

varying vec2 vUv;
varying vec3 vPosition;
vec3 p = position;
// p += uTargetPos * 0.1;

vec3 f = gln_curl((p * 0.2) + uTime * 0.05);

vUv = uv;

vec3 newPos = position + f;

vec3 seg = newPos - uTargetPos;
vec3 dir = normalize(seg);
float dist = length(seg);
if (dist < 3.) {
  float force = clamp(1. / (dist * dist), 0., 1.);
  newPos += dir * force;
}

vPosition = newPos;
vec3 newNormal = normal;
`;
export const Procedural = () => {
  const disk = useLoader(TextureLoader, '/images/circle-sprite.png');
  const shader = useMemo(
    () => ({
      vertexShader,
      fragmentShader,
      uniforms: {
        uShift: {
          value: 0
        },
        uShape: {
          value: disk
        },
        uScale: {
          value: window.innerHeight / 2
        },
        uTime: {
          value: 0
        },
        uTargetPos: {
          value: new Vector3(0)
        }
      }
    }),
    []
  );
  return (
    <Canvas
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
        MsUserSelect: 'none'
      }}
    >
      <Suspense fallback={null}>
        <planeBufferGeometry attach="geometry" />
        <shaderMaterial attach="material" args={[shader]} />
      </Suspense>
    </Canvas>
  );
};
