import React, { CSSProperties } from 'react';
export const Card: React.FunctionComponent<{ style?: CSSProperties }> = (
	props
) => (
	<div className='card' style={props.style}>
		{props.children}
	</div>
);
