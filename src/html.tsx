import React from 'react'
import { graphql } from 'gatsby';

interface Props {
	htmlAttributes: object,
	headComponents: any[],
	bodyAttributes: object,
	preBodyComponents: any[],
	body: string,
	postBodyComponents: any[],
}

const HTML: React.FunctionComponent<Props> = (props) => {
	return (
		<html {...props.htmlAttributes}>
		<head>
			<meta charSet="utf-8"/>
			<meta httpEquiv="x-ua-compatible" content="ie=edge"/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
			{props.headComponents}
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
		</head>
		<body className={'bp3-dark'} {...props.bodyAttributes}>
			{props.preBodyComponents}
			<div
				key={`body`}
				id="___gatsby"
				dangerouslySetInnerHTML={{ __html: props.body }}
			/>
			{props.postBodyComponents}
		</body>
		</html>
	);
};

export default HTML;

