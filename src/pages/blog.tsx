declare const __PATH_PREFIX__: string;
import React from 'react'
import { Link, graphql } from "gatsby"
import { Location } from 'history';

import Layout from "../components/layout"
import SEO from "../components/seo"
import { AnimatedHeader } from '../components/AnimatedHeader';
import { Container } from '../components/Container';
// import { rhythm } from "../utils/typography"

class BlogIndex extends React.PureComponent<{data: any; location: Location}> {
	render() {
		const { data, location } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const posts = data.allMarkdownRemark.edges;
		const rootPath = `${__PATH_PREFIX__}/`
		const entries = posts.map(({ node }: any) => {
			const title = node.frontmatter.title || node.fields.slug
			return (
				<div key={node.fields.slug} className="mb5">
					<h4 className="muted">{node.frontmatter.date}</h4>
						<h2 className="bp3-heading">
								{title}
						</h2>
					<p
						className="bp3-running-text bp3-text-large"
						dangerouslySetInnerHTML={{
							__html: node.frontmatter.description || node.excerpt,
						}}
					/>
			<Link style={{ boxShadow: `none` }} className="underline" to={node.fields.slug}>
				Read article
			</Link>
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
					<Container>
						<div className="pv5">
							<h1>Blog</h1>
						</div>
						{entries}
					</Container>
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
