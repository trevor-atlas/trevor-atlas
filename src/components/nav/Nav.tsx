import Link from 'next/link';
import React from 'react';
import styles from './nav.module.scss';

interface Props {
	title?: string;
	links?: { label: string; url: string }[];
}

export const Nav: React.FunctionComponent<Props> = ({ title, links }) => {
	return (
		<nav className={`${styles.nav} middle-xs`} style={{}}>
			<div className="container mx-auto px-8">
				<div className="row start-xs py-4">
					<Link href="/">
						<a>
							<img
								className="inline-block my-0"
								width="40"
								src="/favicon.png"
								alt="logo"
							/>
						</a>
					</Link>
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
								<li key={i} className={styles.link}>
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
	links: [
		{ label: 'about', url: '/about' },
		{ label: 'blog', url: '/blog' },
		{ label: 'experiments', url: '/experiments' }
	]
};
