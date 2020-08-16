import Link from 'next/link';
import React, { FC } from 'react';
import { HumanDate } from '../src/components/HumanDate';
import { Footer } from '../src/components/Footer';
import { Nav } from '../src/components/Nav';
import { Projects } from '../src/components/Projects';
import experiments from '../content/experiments.json';
import projects from '../content/projects.json';
import { AnimatedHeader } from '../src/components/AnimatedHeader';
import Bio from '../src/components/Bio';
import { Container } from '../src/components/Container';
import { Section } from '../src/components/Section';
import SEO from '../src/components/Seo';
import { Colors } from '../src/utils/colors';
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

const Home: FC<IHomeProps> = ({ posts, experiments, projects }) => {
	const color = Colors.lines.getRGB();
	return (
		<>
			<Nav />
			{color && (
				<AnimatedHeader
					animating
					color={`${color.r},${color.g},${color.b}`}
				/>
			)}
			<SEO title="Home Page" />
			<div className="py-8">
				<Bio key={`bio`} />
			</div>

			<Section background={Colors.primary.get()} type="triangles">
				<Container>
					<div className="max-w-lg mx-auto py-16">
						<Projects
							key={`projects`}
							title="Projects"
							projects={projects}
						/>
					</div>
					<hr />
					<div className="max-w-lg mx-auto py-16">
						<Projects
							key={`experiments`}
							title="Experiments"
							projects={experiments}
						/>
					</div>
				</Container>
			</Section>

			<Section background={''}>
				<Container>
					<div className=" mx-auto py-4">
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
			</Section>
			<Footer />
		</>
	);
};

export default Home;
