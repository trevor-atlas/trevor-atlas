import React, { FC, MutableRefObject } from 'react';
import {
  AmbientLight,
  CircleGeometry,
  Color,
  DoubleSide,
  Fog,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  RectAreaLight,
  Scene,
  SpotLight,
  Vector2,
  WebGLRenderer
} from 'three';


interface IRaycastHeader {}

function rand(num = 1) {
  return -Math.random() * num + Math.random() * num;
}

const dummy = new Object3D();
const origins: {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotation: {
    x: number;
    y: number;
    z: number
  }
}[] = [];

export const RaycastHeader: FC<IRaycastHeader> = React.memo((props) => {
  const canvas = React.useRef();
  const renderer: MutableRefObject<WebGLRenderer> = React.useRef();
  const sceneGroup: MutableRefObject<Group> = React.useRef();
  const particleGroup: MutableRefObject<Group> = React.useRef();
  const cubeGroup: MutableRefObject<Group> = React.useRef();
  const scene: MutableRefObject<Scene> = React.useRef();
  const camera: MutableRefObject<PerspectiveCamera> = React.useRef();

  React.useEffect(() => {
    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true
    });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.shadowMap.enabled = false;
    renderer.current.shadowMap.type = PCFSoftShadowMap;
    renderer.current.shadowMap.needsUpdate = true;
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    sceneGroup.current = new Group();
    cubeGroup.current = new Group();
    scene.current = new Scene();
    camera.current = new PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.set(0, 0, 5);
    scene.current.add(cubeGroup.current);
    scene.current.add(sceneGroup.current);

    function onWindowResize() {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    }
    // @ts-ignore
    renderer.current.domElement.style = `
			backface-visibility: hidden;
			perspective: 1000;
			transform: translate3d(0,0,0), translateZ(0);
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			backgroundSize: cover;
			backgroundPosition: center center;
			pointerEvents: none;
			z-index: -5`;
    window.addEventListener('resize', onWindowResize, false);

    scene.current.fog = new Fog(0x111111, 0, 7);

    const geometry = new IcosahedronGeometry(1);
    const material = new MeshStandardMaterial({
      flatShading: true,
      color: 0xf8b03a,// 0xfab576,
      transparent: false,
      opacity: 1,
      wireframe: false
    });

    const cubes = new InstancedMesh(geometry, material, 30);
    cubes.castShadow = true;
    cubes.receiveShadow = true;

    function init() {
      origins.splice(0, origins.length);

      for (let i = 0; i < 30; i++) {
        const scale = Math.abs(rand(.5));
        const values = {
          x: rand(4),
          y: rand(4),
          z: rand(4),
          scale,
          rotation: {
            x: rand((80 * Math.PI) / 180),
            y: rand((180 * Math.PI) / 180),
            z: rand((280 * Math.PI) / 180)
          }
        }
        origins.push(values);
        
        dummy.scale.set(scale, scale, scale);
        dummy.position.set(values.x, values.y, values.z);
        dummy.rotation.set(values.rotation.x, values.rotation.y, values.rotation.z)
        dummy.updateMatrix();
        cubes.setMatrixAt(i, dummy.matrix);
      }
      cubes.instanceMatrix.needsUpdate = true;
      cubeGroup.current.add(cubes);
    }


    const ambientLight = new AmbientLight(0xffffff, 0.4);
    const light = new SpotLight(0xffffff, .5);
    light.position.set(0, 8, -6);
    light.castShadow = true;
    light.shadow.mapSize.width = 1000;
    light.shadow.mapSize.height = 1000;
    light.penumbra = 1.5;
    light.lookAt(0, 0, 0)

    const lightBack = new PointLight(0xffffff, 0.1);
    lightBack.position.set(0, 8, -8);

    const rectLight = new RectAreaLight(0xffffff, 0.5, 6, 6);
    rectLight.position.set(0, 0, 4);
    rectLight.lookAt(0, 0, 0);

    scene.current.add(rectLight);
    scene.current.add(ambientLight);
    scene.current.add(light);
    scene.current.add(lightBack);
    scene.current.add(sceneGroup.current);

    init();

    const animate = () => {
      const time = performance.now() * 0.00005;

      for (let i = 0; i < 30; i++) {
        const values = origins[i];
        values.rotation.x += 0.00008;
        values.rotation.y += 0.00005;
        values.rotation.z += 0.00003;

        dummy.rotation.set(values.rotation.x, values.rotation.y, values.rotation.z);
        dummy.position.x = values.x + Math.sin(time * values.z);
        dummy.position.y = values.y + Math.cos(time * values.x);
        dummy.position.z = values.z + Math.sin(time * values.y);
        dummy.scale.set(values.scale, values.scale, values.scale);
        dummy.updateMatrix();

        cubes.setMatrixAt(i, dummy.matrix);
        cubes.instanceMatrix.needsUpdate = true;
      }

      cubeGroup.current.rotation.y += 0.0005;
      cubeGroup.current.rotation.x += 0.0005;
      cubeGroup.current.rotation.z += 0.0005;
      renderer.current.render(scene.current, camera.current);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvas} />;
});
