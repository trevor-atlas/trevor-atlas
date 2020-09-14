import Link from 'next/link';
import React, { FC } from 'react';
import { HumanDate } from 'src/components/HumanDate';
import { RaycastHeader } from 'src/components/RaycastHeader';
import experiments from '../content/experiments.json';
import projects from '../content/projects.json';
import Bio from '../src/components/Bio';
import { Container } from '../src/components/Container';
import SEO from '../src/components/Seo';
import { getSortedPostsData, IPost } from '../lib/posts';

export async function getStaticProps() {
	const data = getSortedPostsData();

	return {
		props: {
			posts: data,
			projects,
			experiments
		}
	};
}

interface IHomeProps {
	posts: IPost[];
	projects: [];
	experiments: [];
}

const Home: FC<IHomeProps> = ({ posts }) => {
	return (
		<>
			<RaycastHeader />
			<SEO title="Home Page" />
			<Bio key="bio" />
			<Container>
				<div className="mx-auto py-4">
					<h2 className="text-center mb-4">Latest Posts</h2>
					<div className="flex flex-col max-w-lg mx-auto">
						{posts.slice(0, 5).map((post) => (
							<div className="mb-4" key={post.id}>
								<h4 className="mb-0">{post.title}</h4>
								<div className="flex flex-row justify-between mb-2 mx-0">
									<small className="muted">
										<HumanDate date={post.date} />
									</small>
									<br />
									<small className="muted">
										{post.readTime.text}
									</small>
								</div>
								<Link
									href="/posts/[id]"
									as={`/posts/${post.id}`}
								>
									<a
										className="underline inline-block"
										href=""
									>
										Read article
									</a>
								</Link>
							</div>
						))}
					</div>
				</div>
			</Container>
		</>
	);
};

export default Home;
