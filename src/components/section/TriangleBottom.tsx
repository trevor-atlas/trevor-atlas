import React, { FC } from 'react';
import { ISectionAccent } from 'src/components/section/Section';

export const TriangleBottom: FC<ISectionAccent> = React.memo((props) => (
	<div
		style={{
			position: 'absolute',
			bottom: -50,
			zIndex: 10,
			background: 'inherit',
			left: '50%',
			width: 100,
			height: 100,
			transform: 'translateX(-50%) rotate(45deg)'
		}}
	/>
));
