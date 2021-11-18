import React, {
  FC,
  useEffect,
  useRef,
  useState,
  Ref,
  MutableRefObject
} from 'react';
import {
  Clock,
  PerspectiveCamera,
  Scene,
  ImageUtils,
  ShaderMaterial,
  PlaneGeometry,
  WebGLRenderer,
  Mesh,
  Vector2,
  IUniform
} from 'three';
import { fragmentShader } from 'src/portal/fragment-shader';
import { vertexShader } from 'src/portal/vertex-shader';

interface IPortalProps {}

export const Wormhole: FC<IPortalProps> = React.memo((props) => {
  const container: Ref<HTMLDivElement> = useRef();
  const uniforms: MutableRefObject<
    Record<string, IUniform & { type: string }>
  > = useRef({
    iGlobalTime: { type: 'f', value: 0.0 },
    iResolution: { type: 'v2', value: new Vector2() }
  });
  const camera: MutableRefObject<PerspectiveCamera> = useRef();
  const scene: MutableRefObject<Scene> = useRef(new Scene());
  const renderer: MutableRefObject<WebGLRenderer> = useRef();

  const material = useRef(
    new ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader,
      fragmentShader
    })
  );
  const geometry = useRef(new PlaneGeometry(1, 1));
  const mesh = useRef(new Mesh(geometry.current, material.current));
  const clock = useRef(new Clock());

  function render() {
    uniforms.current.iGlobalTime.value += clock.current.getDelta() * 0.1;
    if (uniforms.current.iGlobalTime.value >= 100.0) {
      uniforms.current.iGlobalTime.value = 0.0;
    }
    renderer.current.render(scene.current, camera.current);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  useEffect(() => {
    camera.current = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000000
    );
    renderer.current = new WebGLRenderer();
    camera.current.position.z = 1;
    mesh.current.scale.x = window.innerWidth;
    mesh.current.scale.y = window.innerHeight;
    scene.current.add(mesh.current);
    container.current.appendChild(renderer.current.domElement);
    uniforms.current.iResolution.value.x = window.innerWidth;
    uniforms.current.iResolution.value.y = window.innerHeight;
    renderer.current.setSize(window.innerWidth, window.innerHeight);

    function onWindowResize() {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      uniforms.current.iResolution.value.x = window.innerWidth;
      uniforms.current.iResolution.value.y = window.innerHeight;
    }
    window.addEventListener('resize', onWindowResize, false);

    animate();
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={container} className="portal-root" />;
});
