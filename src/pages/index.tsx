import { graphql, Link } from 'gatsby'
import React from 'react'
import { AnimatedHeader } from '../components/AnimatedHeader'

import Bio from '../components/bio'
import { Container } from '../components/Container'
import Layout from '../components/layout'
import { Section } from '../components/Section'
import SEO from '../components/seo'
import { Colors } from '../utils/colors'

class BlogIndex extends React.Component<{ location: Location, data: any }> {
	render() {
		const { data, location } = this.props
		const siteTitle = data.site.siteMetadata.title
		const rootPath = `${__PATH_PREFIX__}/`
		const color = Colors.tertiary.getRGB()

		return (
			<>
				{(location.pathname === rootPath) && (
					color && <AnimatedHeader animating color={`${color.r},${color.g},${color.b}`}/>
				)}
				<Layout location={this.props.location} title={siteTitle}>
					<SEO title="Home Page"/>
					<Bio/>

					<Section
						background={Colors.secondary.get()}
						type="triangles"
					>

						<Container>
							<div className="column center-md">
								<h2 className="tac pblg" style={{ color: 'white' }}>Projects</h2>
								<div className="row center-xs mbxlg">
									<div className="col-xs-12">
										<h3 style={{ color: 'white' }}>Vör – Jira & Git made
											simple</h3>
										<p style={{ color: 'white', marginBottom: '.25em' }}>Vör is
											a CLI tool that makes it easy to connect Jira and
											Git/Github - all without leaving the command line! </p>
										<a
											href="https://github.com/trevor-atlas/vor"
											target="_blank"
											className="button"
										>View on Github</a>
									</div>
								</div>
								<div className="row center-xs mbxlg">
									<div className="col-xs-12">
										<h3 style={{ color: 'white' }}>go-interpreter</h3>
										<p style={{ color: 'white', marginBottom: '.25em' }}>A
											tree-walking interpreter for the Monkey programming
											language, written in golang </p>
										<a
											href="https://github.com/trevor-atlas/go-interpreter"
											target="_blank"
											className="button"
										>View on Github</a>
									</div>
								</div>
								<div className="row center-xs mbxlg">
									<div className="col-xs-12">
										<h3 style={{ color: 'white' }}>Typescript Dependency
											Injection</h3>
										<p style={{ color: 'white', marginBottom: '.25em' }}>A
											simple DI library based on decorators, for
											Typescript</p>
										<a
											href="https://github.com/trevor-atlas/Typescript-Inject"
											target="_blank"
											className="button"
										>View on Github</a>
									</div>
								</div>
							</div>
						</Container>
					</Section>

					<Section background={''}>
						<Container>
							<div className="column center-md ">
								<h2 className="tac pblg">Latest Posts</h2>
								<div className="row center-xs mbxlg">
									<div className="col-xs-12 col-md-6">
										{data.allMarkdownRemark.edges
											.map((node: any) => node.node)
											.slice(0, 5)
											.map((node: any) => (
													<Link to={node.fields.slug} className="mblg db">
														<h4>{node.frontmatter.title}</h4>
														<small>{node.frontmatter.date}</small>
													</Link>
												),
											)}
									</div>
								</div>
							</div>
						</Container>
					</Section>
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
