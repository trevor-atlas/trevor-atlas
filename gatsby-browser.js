import React from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import 'modern-normalize/modern-normalize.css';
import './src/grid.css';
import './src/global.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { Layout } from './src/components/layout';

export const wrapPageElement = ({ element, props }) => {
	return <Layout {...props}>{element}</Layout>;
};

const transitionDelay = 300;
const pushCallback = () => requestAnimationFrame(() => window.scrollTo(0, 0));

export const shouldUpdateScroll = ({
	routerProps: { location },
	getSavedScrollPosition
}) => {
	if (location.action === 'PUSH') {
		window.setTimeout(pushCallback, transitionDelay);
	} else {
		const savedPosition = getSavedScrollPosition(location);
		window.setTimeout(
			() =>
				requestAnimationFrame(() =>
					window.scrollTo(
						...(Array.isArray(savedPosition)
							? savedPosition
							: [0, 0])
					)
				),
			transitionDelay
		);
	}
	return false;
};
