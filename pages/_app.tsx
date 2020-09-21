import React, { useEffect } from 'react';
import '../styles/tailwind.scss';
import '../styles/app.scss';
import '../styles/one-dark-highlight.scss';
import { Footer } from 'src/components/Footer';
import { Nav } from 'src/components/nav/Nav';
import { removeStaleServiceWorkers } from 'src/utils/helpers';

export default function MyApp({ Component, pageProps }: any) {
	useEffect(removeStaleServiceWorkers, []);
	return (
		<>
			<Nav />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
