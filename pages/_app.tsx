import React from 'react';
import '../src/styles/tailwind.scss';
import '../src/styles/app.scss';
import '../src/styles/one-dark-highlight.scss';
import { Footer } from 'src/components/footer/Footer';
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
