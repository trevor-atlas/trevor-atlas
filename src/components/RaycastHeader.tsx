import React, { FC, MutableRefObject } from 'react';
import {
  AmbientLight,
  CircleGeometry,
  Color,
  DoubleSide,
  Fog,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
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

interface PolyCube extends Mesh {
  origin: { x: number; y: number; z: number };
}

function mathRandom(num = 1) {
  return -Math.random() * num + Math.random() * num;
}

export const RaycastHeader: FC<IRaycastHeader> = React.memo((props) => {
  const canvas = React.useRef();
  const renderer: MutableRefObject<WebGLRenderer> = React.useRef();
  const sceneGroup: MutableRefObject<Group> = React.useRef();
  const particleGroup: MutableRefObject<Group> = React.useRef();
  const modularGroup: MutableRefObject<Group> = React.useRef();
  const scene: MutableRefObject<Scene> = React.useRef();
  const camera: MutableRefObject<PerspectiveCamera> = React.useRef();

  React.useEffect(() => {
    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      antialias: true
    });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.shadowMap.enabled = false;
    renderer.current.shadowMap.type = PCFSoftShadowMap;
    renderer.current.shadowMap.needsUpdate = true;
    sceneGroup.current = new Group();
    particleGroup.current = new Group();
    modularGroup.current = new Group();
    scene.current = new Scene();
    camera.current = new PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    sceneGroup.current.add(particleGroup.current);
    scene.current.add(modularGroup.current);
    scene.current.add(sceneGroup.current);

    function onWindowResize() {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    }
    // @ts-ignore
    renderer.current.domElement.style = `
			background: rgba(25, 25, 25, .8);
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

    const cameraRange = 3;
    const setcolor = 0x111111;
    scene.current.background = new Color(setcolor);
    scene.current.fog = new Fog(setcolor, 1.5, 4.5);

    function generateParticle(num, amp = 2) {
      const gmaterial = new MeshPhysicalMaterial({
        color: 0xffffff,
        clearcoatMap: undefined,
        clearcoatRoughnessMap: undefined,
        side: DoubleSide
      });

      const gparticular = new CircleGeometry(0.2, 5);

      for (let i = 1; i < num; i++) {
        const pscale = 0.001 + Math.abs(mathRandom(0.03));
        const particular = new Mesh(gparticular, gmaterial);
        particular.position.set(
          mathRandom(amp),
          mathRandom(amp),
          mathRandom(amp)
        );
        particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
        particular.scale.set(pscale, pscale, pscale);
        // @ts-ignore
        particular.speed = particular.position.x + particular.position.z;
        particleGroup.current.add(particular);
      }
    }

    generateParticle(200, 3);

    function init() {
      for (let i = 0; i < 30; i++) {
        const geometry = new IcosahedronGeometry(1);
        const material = new MeshStandardMaterial({
          flatShading: true,
          color: 0x001122,
          transparent: false,
          opacity: 1,
          wireframe: false
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const cube: PolyCube = new Mesh(geometry, material);
        cube.origin = {
          x: mathRandom(3),
          y: mathRandom(3),
          z: mathRandom(3)
        };
        cube.castShadow = true;
        cube.receiveShadow = true;

        const scale = mathRandom(0.4);

        cube.scale.set(scale, scale, scale);
        cube.position.set(cube.origin.x, cube.origin.y, cube.origin.z);

        cube.rotation.x = mathRandom((80 * Math.PI) / 180);
        cube.rotation.y = mathRandom((180 * Math.PI) / 180);
        cube.rotation.z = mathRandom((280 * Math.PI) / 180);
        modularGroup.current.add(cube);
      }
    }

    camera.current.position.set(0, 0, cameraRange);

    //------------------------------------------------------------- SCENE
    const ambientLight = new AmbientLight(0xffffff, 1.5);

    const light = new SpotLight(0xffffff, 1);
    light.position.set(5, 8, -6);
    light.castShadow = true;
    light.shadow.mapSize.width = 100000;
    light.shadow.mapSize.height = 100000;
    light.penumbra = 1.5;

    const lightBack = new PointLight(0x0fffff, 3);
    lightBack.position.set(0, 8, -8);

    const rectLight = new RectAreaLight(0x0fffff, 3, 6, 6);
    rectLight.position.set(0, 0, 4);
    rectLight.lookAt(0, 0, 0);

    scene.current.add(rectLight);
    scene.current.add(ambientLight);
    scene.current.add(light);
    scene.current.add(lightBack);
    scene.current.add(sceneGroup.current);

    init();

    const animate = () => {
      const time = performance.now() * 0.0001;
      requestAnimationFrame(animate);
      for (let i = 0; i < particleGroup.current.children.length; i++) {
        const particle = particleGroup.current.children[i];
        // @ts-ignore
        const rot = particle.speed / 10;
        particle.rotation.x += rot;
        particle.rotation.y += rot;
        particle.rotation.z += rot;
      }

      for (let i = 0; i < modularGroup.current.children.length; i++) {
        const cube = modularGroup.current.children[i] as PolyCube;
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.005;
        cube.rotation.z += 0.003;
        cube.position.x = Math.sin(time * cube.origin.z) * cube.origin.y;

        cube.position.y = Math.cos(time * cube.origin.x) * cube.origin.z;

        cube.position.z = Math.sin(time * cube.origin.y) * cube.origin.x;
      }

      modularGroup.current.rotation.y += 0.0005;
      modularGroup.current.rotation.x += 0.0005;
      particleGroup.current.rotation.y += 0.005;
      camera.current.lookAt(scene.current.position);
      renderer.current.render(scene.current, camera.current);
    };
    animate();
  }, []);

  return <canvas ref={canvas} />;
});
