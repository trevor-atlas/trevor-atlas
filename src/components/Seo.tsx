import React, { FC } from 'react';
import Head from 'next/head';

interface ISEOProps {
	title: string;
	ogTitle: string;
	ogDescription: string;
	ogUrl: string;
	ogImage: string;
}

const SEO: FC<ISEOProps> = ({
	title,
	ogTitle,
	ogDescription,
	ogImage,
	ogUrl
}) => {
	return (
		<Head>
			<title>{title} | Trevor Atlas</title>
			<meta
				name='viewport'
				content='initial-scale=1.0, width=device-width'
			/>
			<meta property='og:title' content={ogTitle} key='title' />
			<meta property='og:type' content='website' />
			<meta property='og:url' content={ogUrl} />
			<meta
				property='og:description'
				content={ogDescription}
				key='ogDescription'
			/>
			<meta property='og:image' content={ogImage} key='ogImage' />
		</Head>
	);
};

SEO.defaultProps = {
	title: 'Trevor Atlas',
	ogDescription: 'a nice page on next and vercel',
	ogUrl: 'https://trevoratlas.com',
	ogImage: 'http://fillmurray.com/300/300'
};

export default SEO;
