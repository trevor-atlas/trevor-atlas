import React, { FC } from 'react';
import { ISectionAccent } from 'src/components/section/Section';
import { Color } from 'src/utils/colors';

export const InsetTriangleBottom: FC<ISectionAccent> = React.memo(
	({ backgroundColor }) => {
		const lightColor = Color.lighten(backgroundColor, 65);
		return (
			<svg
				xmlns="https://www.w3.org/2000/svg"
				version="1.1"
				width="100%"
				height="100"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				style={{ strokeWidth: 2 }}
			>
				<path
					fill={backgroundColor}
					stroke={backgroundColor}
					d="M0 0 L50 100 L100 0 Z"
				/>
				<path
					fill={lightColor}
					stroke={lightColor}
					d="M50 100 L100 40 L100 0 Z"
				/>
			</svg>
		);
	}
);
