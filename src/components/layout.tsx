import React from 'react'
import { Link } from "gatsby"

// import { rhythm, scale } from "../utils/typography"
import { AnimatedHeader } from './AnimatedHeader';
import { Location } from 'history';

class Layout extends React.PureComponent<{ location: Location, title: string }> {
	constructor(props: Readonly<{ location: Location<any>; title: string; }>) {
		super(props);
	}

	render() {
		const { location, title, children } = this.props;
		const rootPath = `${__PATH_PREFIX__}/`;

		return (
			<>
			<div
				style={{
					marginLeft: `auto`,
					marginRight: `auto`,
					maxWidth: 1024
				}}
			>
				<header>
					<h1>
						<Link
							style={{
								boxShadow: `none`,
								textDecoration: `none`,
								color: `inherit`,
							}}
							to={`/`}
						>
							{title}
						</Link>
					</h1>
					{(location.pathname !== rootPath) && (
						<Link to={`/`}>{'← Return to index'}</Link>
					)}
				</header>
				<main
					style={{
						paddingBottom: '2em'
					}}
				>{children}</main>
			</div>
				<footer
					style={{
						padding: '1em',
						display: 'flex',
						background: '#222',
						color: 'white'
					}}
				>
					© {new Date().getFullYear()} Trevor Atlas</footer>
					</>
		)
	}
}

export default Layout
