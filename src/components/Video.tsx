import React from 'react';

interface VideoDescriptor {
	src: string;
	type: string;
}

interface Props {
	video: VideoDescriptor;
}

export const Video: React.FunctionComponent<Props> = (props) => {
	return (
		<video
			style={{
				borderRadius: 8,
				maxWidth: '100%',
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto'
			}}
			autoPlay
			loop
			muted
			playsInline
		>
			{props.video ? (
				<source src={props.video.src} type={props.video.src} />
			) : (
				<p>Your browser doesn't support this embedded video.</p>
			)}
		</video>
	);
};
