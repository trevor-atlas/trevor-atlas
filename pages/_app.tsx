import React from 'react';
import '../src/styles/tailwind.scss';
import '../src/styles/app.scss';
import '../src/styles/one-dark-highlight.scss';
import { Footer } from 'src/components/footer/Footer';
import { Nav } from 'src/components/nav/Nav';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';
import useToggleNavigation from 'src/hooks/useToggleNavigation';
import { removeStaleServiceWorkers } from 'src/utils/helpers';

export default function App({ Component, pageProps }) {
  useIsomorphicLayoutEffect(removeStaleServiceWorkers, []);
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
