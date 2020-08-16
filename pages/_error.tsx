import Link from 'next/link';
import React from 'react';

function CustomError({ statusCode }) {
	if (typeof statusCode === 'undefined' || !statusCode) statusCode = 404;
	return (
		<div
			style={{
				margin: 0,
				padding: 0,
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
				backgroundSize: 'cover',
				color: 'white',
				userSelect: 'none',
				backgroundImage: `url(${
					statusCode === 404
						? '/images/source.gif'
						: 'https://http.cat/' + statusCode
				})`
			}}
		>
			<h1
				style={{
					fontSize: '4rem',
					margin: 0,
					color: 'white',
					WebkitTextStrokeColor: 'transparent',
					WebkitTextFillColor: 'transparent',
					WebkitTextStrokeWidth: 2,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					WebkitTextStrokeColor: 'white'
				}}
			>
				{statusCode}
			</h1>
			<Link href="/">
				<a>Go Home</a>
			</Link>
		</div>
	);
}

CustomError.getInitialProps = ({ res, err }) => {
	let statusCode;
	// If the res variable is defined it means nextjs
	// is in server side
	if (res) {
		statusCode = res.statusCode;
	} else if (err) {
		// if there is any error in the app it should
		// return the status code from here
		statusCode = err.statusCode;
	} else {
		// Something really bad/weird happen and status code
		// cannot be determined.
		statusCode = null;
	}
	return { statusCode };
};

export default CustomError;
