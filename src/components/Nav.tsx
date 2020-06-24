import React from 'react';
import { Colors } from '../utils/colors';
import { Link } from 'gatsby';

interface Props {
	title?: string;
	links?: { label: string; url: string }[];
}

export const Nav: React.FunctionComponent<Props> = ({ title, links }) => {
	return (
		<nav
			className='middle-xs'
			style={{
				position: 'relative',
				zIndex: 100,
				padding: '1em',
				display: 'flex',
				background: Colors.primary.get(),
				color: 'white',
				marginBottom: '2em'
			}}
		>
			<div className='container'>
				<div className='row start-xs'>
					<h4 className='white mbn'>
						<Link
							style={{
								boxShadow: `none`,
								textDecoration: `none`,
								color: `inherit`
							}}
							to={`/`}
						>
							{title}
						</Link>
					</h4>
					<ul
						style={{
							listStyle: 'none',
							display: 'inline-block',
							padding: 0,
							margin: `0 2em`
						}}
					>
						{links.map((l) => {
							return (
								<li
									style={{
										display: 'inline-block',
										marginRight: '1em'
									}}
								>
									<Link
										style={{
											boxShadow: `none`,
											textDecoration: `none`
										}}
										to={l.url}
									>
										{l.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
};

Nav.defaultProps = {
	title: 'Trevor Atlas',
	links: [{ label: 'Blog', url: '/blog' }]
};
