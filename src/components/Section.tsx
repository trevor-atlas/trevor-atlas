import React, { CSSProperties } from 'react';

export const Section: React.FunctionComponent<{background: string, style?: CSSProperties, type?: 'triangles'}> = (props) => {
	const triangle = props.type === 'triangles';
	return <>
	<section
		className={props.type}
		style={{
			background: props.background,
			paddingTop: props.type === 'triangles' ? '2em' : '3em',
			marginTop: triangle ? '2em' : 0,
			paddingBottom: props.type === 'triangles' ? '1em' : '3em',
			margin: 0,
			position: 'relative',
			...props.style
		}}
	>
	{triangle &&
		<svg style={{position: 'absolute', top: -100, strokeWidth: 2}} fill={props.background} stroke={props.background} transform="scale(1,-1)" id="bigTriangleColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 102" preserveAspectRatio="none">
			<path d="M0 0 L50 0 L0 100 Z"></path>
			<path d="M100 0 L50 0 L100 100 Z"></path>
		</svg>
	}
		{props.children}
	</section>
	{triangle &&
		triangleDivider(props.background, setLightPercentage(props.background, 60), {strokeWidth: 2})
	}
	</>
};

const triangleDivider = (lightColor: string, darkColor: string, style?: CSSProperties) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		width="100%"
		height="100"
		viewBox="0 0 100 100"
		preserveAspectRatio="none"
		style={style}
	>
		<path
			fill={lightColor}
			stroke={lightColor}
			d="M0 0 L50 100 L100 0 Z"
		></path>
		<path
			fill={darkColor}
			stroke={darkColor}
			d="M50 100 L100 40 L100 0 Z"
		></path>
	</svg>
);

function setLightPercentage(col: any, p: number) {
    const R = parseInt(col.substring(1, 3), 16);
    const G = parseInt(col.substring(3, 5), 16);
    const B = parseInt(col.substring(5, 7), 16);
    const curr_total_dark = (255 * 3) - (R + G + B);

    // calculate how much of the current darkness comes from the different channels
    const RR = ((255 - R) / curr_total_dark);
    const GR = ((255 - G) / curr_total_dark);
    const BR = ((255 - B) / curr_total_dark);

    // calculate how much darkness there should be in the new color
    const new_total_dark = ((255 - 255 * (p / 100)) * 3);

    // make the new channels contain the same % of available dark as the old ones did
    const NR = 255 - Math.round(RR * new_total_dark);
    const NG = 255 - Math.round(GR * new_total_dark);
    const NB = 255 - Math.round(BR * new_total_dark);

    const RO = ((NR.toString(16).length === 1) ? "0" + NR.toString(16) : NR.toString(16));
    const GO = ((NG.toString(16).length === 1) ? "0" + NG.toString(16) : NG.toString(16));
    const BO = ((NB.toString(16).length === 1) ? "0" + NB.toString(16) : NB.toString(16));

    return "#" + RO + GO + BO;}
