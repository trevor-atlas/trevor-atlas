import { graphql, Link } from 'gatsby'
import React from 'react'
import Bio from '../components/bio'
import { Container } from '../components/Container'
import SEO from '../components/seo'

const BlogPostTemplate: React.FunctionComponent<{ data: any, pageContext: any }> = (props) => {
	const {
		pageContext: { previous, next },
		data: {
			markdownRemark: post, site: { siteMetadata: { title } }
		}
	} = props

	return (
		<>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<Container>
				<div className="mt6 mb6">
					<h1>{post.frontmatter.title}</h1>
					<p
						style={{
							fontSize: '.8em',
							display: `block`,
						}}
						className="muted"
					>
						{post.frontmatter.date}
					</p>
				</div>
				<div
					className="post-body bp3-running-text bp3-text-large"
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>
				<hr className="mt5 mb4" />
				<Bio />

				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link className="underline" to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link className="underline" to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</Container>
		</>
	)
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
