import NoisePlane from './Noiseplane';

// const Terrain = dynamic(() => import('src/components/three-fibers/Terrain'), {
//   ssr: false
// });
// const NoisePlane = dynamic(() => import('./NoisePlane'), {
//   ssr: false
// });

export function FiberContainer() {
  // const router = useRouter();
  // switch (router.pathname) {
  // case '/blog':
  // return <Terrain />;
  // default:
  return <NoisePlane />;
  // }
}
