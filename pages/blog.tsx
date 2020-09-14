import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { FC } from 'react';
import { HumanDate } from 'src/components/HumanDate';
import { getSortedPostsData, IPost } from 'lib/posts';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';

const Terrain = dynamic(() => import('src/components/three-fibers/Terrain'), {
	ssr: false
});

export async function getStaticProps() {
	// Get external data from the file system, API, DB, etc.
	const data = getSortedPostsData();

	// The value of the `props` key will be
	//  passed to the `Home` component
	return {
		props: {
			posts: data
		}
	};
}

const Blog: FC<{ posts: IPost[] }> = ({ posts }) => {
	const entries = posts.map(
		({ date, id, title, excerpt, readTime, thumbnail }) => {
			return (
				<div key={id} className="mb-16 flex flex-col">
					<h2 className="mt-0">{title}</h2>
					<p>{excerpt}</p>
					<div className="mb-2 flex flex-row justify-between">
						<small className="muted">
							<HumanDate date={date} />
						</small>
						<br />
						<small className="muted db mb2">{readTime.text}</small>
					</div>
					<Link href={`/posts/[id]`} as={`/posts/${id}`}>
						<a className="underline">Read article</a>
					</Link>
				</div>
			);
		}
	);

	return (
		<>
			<SEO
				title="All Posts"
				ogTitle="Blog | Trevor Atlas"
				ogUrl="https://trevoratlas.com/blog"
				ogDescription="Tutorials, musings and random information from the tech world."
				ogImage="/images/blog.png"
			/>
			<Container>
				<Terrain />
				<div className="max-w-xl mx-auto mt-32">
					<h1 className="mb-16">Blog</h1>
					{entries}
				</div>
			</Container>
		</>
	);
};

export default Blog;
