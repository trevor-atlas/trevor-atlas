import Link from 'next/link';
import React, { FC } from 'react';
import styles from './nav.module.scss';

interface INav {
	links?: { label: string; url: string }[];
}

export const Nav: FC<INav> = ({ links }) => {
	return (
		<nav className={`${styles.nav} middle-xs`}>
			<div className={styles.navContent}>
				<div className="container mx-auto px-8">
					<div
						className={`flex flex-col md:flex-row justify-center items-center py-4`}
					>
						<Link href="/">
							<a>
								<img
									className="inline-block mb-4 md:mb-0 md:mr-4"
									width="50"
									src="/logo.png"
									style={{ borderRadius: 5 }}
									alt="logo"
								/>
							</a>
						</Link>
						{links.map((l, i) => {
							return (
								<div
									key={i}
									className={`${styles.link} mb-2 md:mb-0 md:mr-2`}
								>
									<Link href={l.url}>
										<a>{l.label}</a>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</nav>
	);
};

Nav.defaultProps = {
	links: [
		{ label: 'about', url: '/about' },
		{ label: 'blog', url: '/blog' },
		{ label: 'experiments', url: '/experiments' }
	]
};
