import * as React from 'react';
import { Container } from '../../src/components/Container';
import SEO from '../../src/components/Seo';
import Bio from '../../src/components/Bio';
import { HumanDate } from '../../src/components/HumanDate';
import { IPost } from '../../lib/posts';
import { Layout } from '../../src/components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import hydrate from 'next-mdx-remote/hydrate';

export default function Post({
	postData: {
		id,
		title,
		content,
		date,
		contentHtml,
		featuredImage,
		excerpt,
		readTime,
		isMDX
	}
}: {
	postData: IPost;
}) {
	const mdxcontent = isMDX
		? hydrate(content as any, {
				components: { Test: () => 'this is a test lol' }
		  })
		: null;
	return (
		<Layout>
			<>
				<SEO
					title={title}
					ogTitle={title}
					ogImage={featuredImage}
					ogDescription={excerpt}
					ogUrl={`/posts/${id}`}
				/>
				<Container className="post ">
					<div className="max-w-xl mx-auto mt-32">
						<div className="header mb-4">
							<h1>{title}</h1>
							<span className="muted">
								<HumanDate date={date} />
							</span>
							<br />
							<span className="muted">
								{readTime.text} (~{readTime.words} words)
							</span>
						</div>
						{isMDX ? (
							mdxcontent
						) : (
							<div
								dangerouslySetInnerHTML={{
									__html: contentHtml
								}}
							/>
						)}
					</div>
					<Bio />
				</Container>
			</>
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData
		}
	};
}
