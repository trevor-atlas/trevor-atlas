import React, { FC } from 'react';
import { ISectionAccent } from 'src/components/section/Section';

export const InsetTriangleTop: FC<ISectionAccent> = React.memo(
	({ backgroundColor }) => {
		return (
			<svg
				style={{
					position: 'absolute',
					top: -100,
					strokeWidth: 2
				}}
				fill={backgroundColor}
				stroke={backgroundColor}
				transform="scale(1,-1)"
				id="bigTriangleColor"
				xmlns="https://www.w3.org/2000/svg"
				version="1.1"
				width="100%"
				height="100"
				viewBox="0 0 100 102"
				preserveAspectRatio="none"
			>
				<path d="M0 0 L50 0 L0 100 Z"></path>
				<path d="M100 0 L50 0 L100 100 Z"></path>
			</svg>
		);
	}
);
