import React from 'react';
import { Link, graphql } from 'gatsby';
import { Location } from 'history';
import SEO from '../components/Seo';
import { AnimatedHeader } from '../components/AnimatedHeader';
import { Container } from '../components/Container';

class BlogIndex extends React.PureComponent<{ data: any; location: Location }> {
	render() {
		const { data } = this.props;
		const posts = data.allMarkdownRemark.edges;
		const entries = posts.map(({ node }: any) => {
			const title = node.frontmatter.title || node.fields.slug;
			return (
				<div key={node.fields.slug} className='mb5'>
					<h4 className='muted'>{node.frontmatter.date}</h4>
					<h2 className='bp3-heading'>{title}</h2>
					<p
						className='bp3-running-text bp3-text-large'
						dangerouslySetInnerHTML={{
							__html: node.frontmatter.description || node.excerpt
						}}
					/>
					<small className='muted db mb2'>
						{node.fields.readingTime.text}
					</small>
					<Link
						style={{ boxShadow: `none` }}
						className='underline'
						to={node.fields.slug}
					>
						Read article
					</Link>
				</div>
			);
		});

		return (
			<>
				<SEO title='All posts' />
				<Container>
					<div className='pv5'>
						<h1>Blog</h1>
					</div>
					{entries}
				</Container>
			</>
		);
	}
}

export default BlogIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt(pruneLength: 200)
					fields {
						slug
						readingTime {
							text
						}
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
					}
				}
			}
		}
	}
`;
