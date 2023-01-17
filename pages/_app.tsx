import type { AppProps } from 'next/app';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Karla, Patua_One } from '@next/font/google';

import { Nav } from 'src/components/nav/Nav';
import { Layout } from 'src/components/Layout';
import { FiberContainer } from 'src/components/three-fibers/FiberContainer';
import { Footer } from 'src/components/footer/Footer';

import '../src/styles/app.scss';
import '../src/styles/one-dark-highlight.scss';
import '../src/styles/albums.scss';

const karla = Karla({
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  subsets: ['latin']
});
const patuaOne = Patua_One({ weight: '400', subsets: ['latin'] });

const globalStyles = `
  html, body, #__next {
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

  .post p > code, .code-fence pre, .code-fence code, .code-fence pre code {
    font-family: "Comic Code Ligatures", "Fira Code", "Source Code Pro", "Hack", "Dina", "DejaVu Sans Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace!important;
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
      <LazyMotion features={domAnimation}>
        <FiberContainer />
        <Nav />
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </LazyMotion>
    </>
  );
}
