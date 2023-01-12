import React, { FC } from 'react';
import Head from 'next/head';

interface ISEOProps {
  title: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

const SEO: FC<ISEOProps> = (
  { title, ogTitle, ogDescription, ogImage, ogUrl } = {
    title: 'Trevor Atlas',
    ogDescription: 'Personal website and portfolio of Trevor Atlas',
    ogUrl: 'https://trevoratlas.com',
    ogImage: '/portrait-2023.png'
  }
) => {
  const combinedTitle = `${title} | Trevor Atlas`;
  return (
    <Head>
      <title>{combinedTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={ogTitle} key="title" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta
        property="og:description"
        content={ogDescription}
        key="ogDescription"
      />
      <meta property="og:image" content={ogImage} key="ogImage" />
    </Head>
  );
};

export default SEO;
