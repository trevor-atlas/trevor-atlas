import React from 'react'
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { AnimatedHeader } from '../components/AnimatedHeader';
// import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
	render() {
		const { data, location } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const posts = data.allMarkdownRemark.edges;
		const rootPath = `${__PATH_PREFIX__}/`
		const entries = posts.map(({ node }) => {
			const title = node.frontmatter.title || node.fields.slug
			return (
				<div key={node.fields.slug}>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
						<h3>
							<Link style={{ boxShadow: `none` }} to={node.fields.slug}>
								{title}
							</Link>
						</h3>
						<small>{node.frontmatter.date}</small>
					</div>
					<p
						dangerouslySetInnerHTML={{
							__html: node.frontmatter.description || node.excerpt,
						}}
					/>
				</div>
			)
		})

		return (
			<>
				{(location.pathname === rootPath) && (
					<AnimatedHeader animating />
				)}
				<Layout location={this.props.location} title={siteTitle}>
					<SEO title="All posts" />
					<Bio />
					{entries}
				</Layout>
			</>
		)
	}
}

export default BlogIndex

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
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
