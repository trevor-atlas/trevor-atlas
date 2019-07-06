import React from 'react';

export const Container: React.FunctionComponent = (props) => (
	<div style={{
		marginLeft: `auto`,
		marginRight: `auto`,
		maxWidth: 1280,
		padding: '0 1em 0 1em'
	}}>
		{props.children}
	</div>
)
