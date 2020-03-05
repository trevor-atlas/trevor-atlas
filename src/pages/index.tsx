import { Button, Intent } from '@blueprintjs/core'
import { graphql, Link } from 'gatsby'
import React from 'react'
import { AnimatedHeader } from '../components/AnimatedHeader'
import Bio from '../components/bio'
import { Container } from '../components/Container'
import Layout from '../components/layout'
import { Section } from '../components/Section'
import SEO from '../components/seo'
import { Colors } from '../utils/colors'
import { navigate } from 'gatsby'

const projects: { title: string; url: string; description: string; }[] = [
	{
		title: 'Vör – Jira & Git made simple',
		url: 'https://github.com/trevor-atlas/vor',
		description: 'Vör is a CLI tool that makes it easy to connect Jira and Git/Github - all without leaving the command line!'
	},
	{
		title: 'Monkey Interpreter',
		url: 'https://github.com/trevor-atlas/go-interpreter',
		description: 'A tree-walking interpreter for the Monkey programming language, written in golang'
	},
	{
		title: 'Typescript Dependency Injection',
		url: 'https://github.com/trevor-atlas/Typescript-Inject',
		description: 'A simple DI library based on decorators, for Typescript'
	}
];

const experiments: { title: string; url: string; description: string; }[] = [
	{title: 'Numeric Base Converter', url: '/experiments/numeric-base-converter', description: 'convert decimal numbers to other bases'},
];

class BlogIndex extends React.Component<{ location: Location, data: any }> {
	render() {
		const { data, location } = this.props
		const siteTitle = data.site.siteMetadata.title
		const rootPath = `${__PATH_PREFIX__}/`
		const color = Colors.lines.getRGB()

		return (
			<>
				{(location.pathname === rootPath) && (
					color && <AnimatedHeader animating color={`${color.r},${color.g},${color.b}`}/>
				)}
				<Layout location={this.props.location} title={siteTitle}>
					<SEO title="Home Page"/>
					<div className="pt5 pb6">
						<Bio/>
					</div>

					<Section
						background={Colors.primary.get()}
						type="triangles"
					>
						<Container>
							<div className="column center-md paxlg">
								<h2 className="tc mb5" style={{ color: 'white' }}>Projects</h2>
								{projects.map(project => {
									return (
										<div className="row center-xs mb4">
											<div className="col-xs-12">
												<h3 className="" style={{ color: 'white' }}>{project.title}</h3>
												<p className="bp3-running-text bp3-text-large" style={{ }}>{project.description}</p>
												<Button
													icon="code"
													text="View on Github"
													type="button"
													intent={Intent.PRIMARY}
													onClick={() => window.open(project.url)}
												/>
											</div>
										</div>
									)
								})}
							</div>
							<hr/>
							<div className="column center-md paxlg">
								<h2 className="tac mb5" style={{ color: 'white' }}>Experiments</h2>
								{experiments.map(exp => {
									return (
										<div className="row center-xs mbxlg">
											<div className="col-xs-12">
												<h3 className="" style={{ color: 'white' }}>{exp.title}</h3>
												<p className="bp3-running-text bp3-text-large" style={{ }}>{exp.description}</p>
												<Button
													icon="code"
													text="View"
													type="button"
													intent={Intent.PRIMARY}
													onClick={() => navigate(exp.url)}
												/>
											</div>
										</div>
									)
								})}
							</div>
						</Container>
					</Section>

					<Section background={''}>
						<Container>
							<div className="column center-md pv4">
								<h2 className="tc mb4">Latest Posts</h2>
								<div className="row center-xs">
									<div className="col-xs-12 col-md-8">
										{data.allMarkdownRemark.edges
											.map((node: any) => node.node)
											.slice(0, 5)
											.map((node: any) => (
												<div className="mb4">
													<h4 className="mb0">{node.frontmatter.title}</h4>
													<small className="dib mb2">{node.frontmatter.date}</small>
													<Link to={node.fields.slug} className="underline db">
														Read article
													</Link>
												</div>
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
