import React, { FC } from 'react';
import { ISectionAccent } from 'src/components/section/Section';

export const TriangleTop: FC<ISectionAccent> = React.memo((props) => (
	<div
		style={{
			position: 'absolute',
			background: 'inherit',
			top: -50,
			left: '50%',
			width: 100,
			height: 100,
			transform: 'translateX(-50%) rotate(45deg)'
		}}
	/>
));
