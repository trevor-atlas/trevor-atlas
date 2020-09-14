import React, { CSSProperties, FC } from 'react';

export interface ISectionAccent {
	backgroundColor: string;
}

interface ISection {
	background?: string;
	style?: CSSProperties;
	Before?: FC<ISectionAccent>;
	After?: FC<ISectionAccent>;
}

export const Section: FC<ISection> = ({ background, style, children }) => {
	return (
		<>
			<section
				className="py-16"
				style={{
					background,
					margin: 0,
					position: 'relative',
					...style
				}}
			>
				{children}
			</section>
		</>
	);
};

Section.defaultProps = {
	background: ''
};
