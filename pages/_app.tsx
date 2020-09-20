import React from 'react';
import '../styles/tailwind.scss';
import '../styles/app.scss';
import '../styles/one-dark-highlight.scss';
import { Footer } from 'src/components/Footer';
import { Nav } from 'src/components/nav/Nav';

export default function MyApp({ Component, pageProps }: any) {
	return (
		<>
			<Nav />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
