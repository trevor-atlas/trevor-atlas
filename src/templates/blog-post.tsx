import React from 'react'
import { Link, graphql } from 'gatsby'
import { inspect } from 'util'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Container } from '../components/Container'
import { Colors } from '../utils/colors'

class BlogPostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark
		const siteTitle = this.props.data.site.siteMetadata.title
		const { previous, next } = this.props.pageContext

		return (
			<div className="post-body">

				<Layout location={this.props.location} title={siteTitle}>
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
							className="bp3-running-text bp3-text-large"
							dangerouslySetInnerHTML={{ __html: post.html }}/>
						<hr />
						<Bio/>

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
									<Link to={previous.fields.slug} rel="prev">
										← {previous.frontmatter.title}
									</Link>
								)}
							</li>
							<li>
								{next && (
									<Link to={next.fields.slug} rel="next">
										{next.frontmatter.title} →
									</Link>
								)}
							</li>
						</ul>
					</Container>
				</Layout>
			</div>
		)
	}
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
