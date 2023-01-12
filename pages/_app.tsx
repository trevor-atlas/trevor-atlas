import type { AppProps } from 'next/app';
import '../src/styles/app.scss';
import '../src/styles/one-dark-highlight.scss';
import '../src/styles/albums.scss';
import { Nav } from 'src/components/nav/Nav';

import { Karla, Patua_One } from '@next/font/google';
import { Layout } from 'src/components/Layout';
import { FiberContainer } from 'src/components/three-fibers/FiberContainer';
import { Footer } from 'src/components/footer/Footer';

export const karla = Karla({
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  subsets: ['latin']
});
const patuaOne = Patua_One({ weight: '400', subsets: ['latin'] });

const globalStyles = `
  html {
    font-family: ${karla.style.fontFamily};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${patuaOne.style.fontFamily};
  }
`;

const GlobalStyles = () => (
  <style jsx global>
    {globalStyles}
  </style>
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FiberContainer />
      <Nav />
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </>
  );
}
