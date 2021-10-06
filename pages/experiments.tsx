import { IPost } from 'lib/posts';
import Link from 'next/link';
import React, { FC } from 'react';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';

const experiments = [
	{link: 'experiments/pathfinding-visualizer', title: 'Pathfinding Visualizer'},
	{link: 'experiments/qr-code-api', title: 'QR code generator'},
	{link: 'experiments/webgl-portal', title: 'WEBGL Portal'}
]

const Experiments: FC<{ posts: IPost[] }> = () => {
	return (
		<>
			<SEO
				title="All Posts"
				ogTitle="Experiments | Trevor Atlas"
				ogUrl="https://trevoratlas.com/experiments"
				ogDescription="Experiments in 3d graphics, encryption or whatever else strikes my fancy"
				ogImage="/images/blog.png"
			/>
			<Container>
				<div className="max-w-xl mx-auto mt-32">
					<h1 className="mb-16">Experiments</h1>
					<div className="card">
						{experiments.map(e => <Link href={e.link}>
							<a>{e.title}</a>
						</Link>)}
					</div>
				</div>
			</Container>
		</>
	);
};

export default React.memo(Experiments);
