// @ts-ignore
import { Math, SphereBufferGeometry, MeshBasicMaterial, Color } from 'three';
import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

function Stars() {
	const group = useRef();
	let theta = 0;
	useFrame(() => {
		// Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
		const r = 5 * Math.sin(Math.degToRad((theta += 0.1))) * 0.1;
		const s = Math.sin(Math.degToRad(theta * 1.2));
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		group.current.rotation.set(r, r, r);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		group.current.scale.set(s, s, s);
	});
	const [geo, mat, vertices, coords] = useMemo(() => {
		const geo = new SphereBufferGeometry(1, 3, 3);
		const mat = new MeshBasicMaterial({
			color: new Color('#171913')
		});
		const coords = Array(1000)
			.fill(0)
			.map(() => [
				Math.random() * 800 - 400,
				Math.random() * 800 - 400,
				Math.random() * 800 - 400
			]);
		return [geo, mat, vertices, coords];
	}, []);
	return (
		<group ref={group}>
			{coords.map(([p1, p2, p3], i) => (
				<mesh
					key={i}
					geometry={geo}
					material={mat}
					position={[p1, p2, p3]}
				/>
			))}
		</group>
	);
}
export function BlogHeader() {
	const [pixelRatio, setPixelRatio] = useState(1);
	useEffect(() => {
		setPixelRatio(window.devicePixelRatio);
	}, []);
	return (
		<Canvas
			id="main"
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
				MsUserSelect: 'none',
				width: '100vw',
				height: '100vh',
				position: 'fixed',
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				zIndex: -1
			}}
			pixelRatio={pixelRatio}
			camera={{ position: [0, 0, 35] }}
		>
			<ambientLight intensity={1} />
			<pointLight position={[40, 40, 40]} />
			<Suspense fallback={null}>
				<Stars />
			</Suspense>
		</Canvas>
	);
}
