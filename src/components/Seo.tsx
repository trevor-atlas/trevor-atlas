import React, { FC } from 'react';
import Head from 'next/head';
import { isSome } from 'src/utils/helpers';
import { Nullable } from 'src/types';

interface ISEOProps {
  title: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  keywords?: string;
}

const SEO: FC<ISEOProps> = ({
  title = 'Trevor Atlas',
  ogTitle = 'Trevor Atlas Personal Website',
  ogDescription = 'Portfolio and blog of Trevor Atlas',
  ogImage = '/portrait-2023.png',
  ogUrl = 'https://trevoratlas.com',
  keywords = 'Trevor Atlas, Software Development, Typescript, Javascript, Programming, Educational'
}) => {
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
      <meta name="keywords" content={keywords} />

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
