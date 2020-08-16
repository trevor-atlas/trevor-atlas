import Link from 'next/link';
import React from 'react';
import { Colors } from '../utils/colors';

interface Props {
	title?: string;
	links?: { label: string; url: string }[];
}

export const Nav: React.FunctionComponent<Props> = ({ title, links }) => {
	return (
		<nav
			className="middle-xs "
			style={{
				position: 'relative',
				zIndex: 100,
				display: 'flex',
				background: Colors.primary.get(),
				color: 'white',
				marginBottom: '2em'
			}}
		>
			<div className="container mx-auto px-8">
				<div className="row start-xs py-4">
					<h4 className="white inline-block my-0">
						<Link href="/">
							<a>{title}</a>
						</Link>
					</h4>
					<ul
						style={{
							listStyle: 'none',
							display: 'inline-block',
							padding: 0,
							margin: '0 2em'
						}}
					>
						{links.map((l, i) => {
							return (
								<li
									key={i}
									style={{
										display: 'inline-block',
										marginRight: '1em'
									}}
								>
									<Link href={l.url}>
										<a>{l.label}</a>
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
