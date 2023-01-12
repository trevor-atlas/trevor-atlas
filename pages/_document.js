import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Favicon from 'src/components/Favicon';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
        </Head>
        <body className="subpixel-antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
