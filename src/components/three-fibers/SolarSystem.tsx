import React, { FC, Suspense, useState } from 'react';
import { Stars } from 'drei';
import { Canvas } from 'react-three-fiber';
import { Earth } from 'src/components/three-fibers/Earth';
import { Planet } from 'src/components/three-fibers/Planet';
import { Sun } from 'src/components/three-fibers/Sun';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const SolarSystem: FC = () => {
	const [showLabels, setShowLabels] = useState(false);
	const toggleLabels = () => setShowLabels(!showLabels);

	return (
		<div className="relative">
			<Canvas
				shadowMap
				pixelRatio={window.devicePixelRatio}
				style={{
					margin: 0,
					padding: 0,
					overflow: 'hidden',
					WebkitTouchCallout: 'none',
					WebkitUserSelect: 'none',
					KhtmlUserSelect: 'none',
					MozUserSelect: 'none',
					background:
						'linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.7), rgba(0,0,0,.0))',
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					MsUserSelect: 'none',
					width: '100%',
					minHeight: 800,
					height: '60vh',
					bottom: 0,
					zIndex: -1
				}}
				camera={{
					fov: 70,
					far: 2000,
					position: [0, 10, 45],
					rotation: [20, 0, 0]
				}}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={0.5} color={0xffffff} />
					<pointLight
						intensity={1.2}
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
						count={1000} // Amount of stars (default=5000)
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
							<ringBufferGeometry
								args={[3, 5, 8]}
								attach="geometry"
							/>
							<meshStandardMaterial
								attach="material"
								color={'#9DdFfE'}
							/>
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
				className="max-w-lg mx-auto"
				style={{ position: 'absolute', top: 10, left: '50%' }}
			>
				<div
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
				</div>
			</div>
		</div>
	);
};
