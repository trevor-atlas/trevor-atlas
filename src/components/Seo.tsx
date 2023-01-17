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
      {/*
      describe the page to searchers as they read through the SERPs.
      This tag doesn't influence ranking, but it's very important regardless.
      It's the ad copy that will determine if users click on your result.
      Keep it within 160 characters, and write it to catch the user's attention.
      Sell the page — get them to click on the result. */}
      <meta name="description" content={ogDescription} />

      <meta name="robots" content="index, follow" />

      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="keywords"
        content="Software Development, Typescript, Javascript, Programming, Educational"
      />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@trevoratlas" />
      <meta name="twitter:creator" content="@trevoratlas" />
    </Head>
  );
};

export default SEO;
