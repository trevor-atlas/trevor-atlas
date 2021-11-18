import React from 'react';
import '../src/styles/tailwind.scss';
import '../src/styles/app.scss';
import '../src/styles/one-dark-highlight.scss';
import { Footer } from 'src/components/footer/Footer';
import { Nav } from 'src/components/nav/Nav';
import useToggleNavigation from 'src/hooks/useToggleNavigation';

export default function App({ Component, pageProps }) {
  const disable = useToggleNavigation();
  if (disable) return <Component {...pageProps} />;

  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
