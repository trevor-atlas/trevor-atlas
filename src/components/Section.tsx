import React from 'react';

export const Section: React.FunctionComponent<{background: string, invert: boolean}> = (props) => (
	<section
		style={{
			paddingTop: '2em',
			paddingBottom: '2em',
			background: props.background,
		}}
	>
		{props.children}
	</section>
)
