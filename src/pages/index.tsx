import React from 'react'
import posed from 'react-pose';
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { AnimatedHeader } from '../components/AnimatedHeader';
import { Container } from '../components/Container';
import { Colors } from '../utils/colors';
import { Section } from '../components/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faLinkedin, faReddit, faStackOverflow, faDribbble } from '@fortawesome/free-brands-svg-icons';
import { GithubCard } from '../components/GithubCard';
import { Card } from '../components/Card';
import vor from '../vor'

class BlogIndex extends React.Component<{ location: Location, data: any }> {
	render() {
		const { data, location } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const rootPath = `${__PATH_PREFIX__}/`
		const color = Colors.tertiary.getRGB();

		return (
			<>
				{(location.pathname === rootPath) && (
					color && <AnimatedHeader animating color={`${color.r},${color.g},${color.b}`} />
				)}
				<Layout location={this.props.location} title={siteTitle}>
					<SEO title="Home Page" />
					<Bio />

					<Section
						background={Colors.secondary.get()}
						invert={true}
					>
						<Container>
							<div className="column center-md">
								<h2 className="tac pblg" style={{ color: 'white' }}>Projects</h2>
								<div className="row center-xs mbxlg">
									<div className="col-xs-12 col-md-6">
										<h4 style={{color: 'white'}}>Vör – Jira & Git made simple</h4>
										<p style={{color: 'white', marginBottom: '.25em'}}>Vör is a CLI tool that makes it easy to connect Jira and Git/Github. It provides commands to create branches from a given jira ticket, github pull requests from that branch and makes it easy to view your assigned tickets - all without leaving the command line! </p>
										<a
											href="https://github.com/trevor-atlas/vor"
											target="_blank"
											className="button"
										>View on Github</a>
									</div>
								</div>
								<div className="row center-xs mbxlg">
									<div className="col-xs-12 col-md-6">
										<h4 style={{color: 'white'}}>Go Sitemap</h4>
										<p style={{color: 'white', marginBottom: '.25em'}}>A web scraper that builds a sitemap of a given website</p>
										<a
											href="https://github.com/trevor-atlas/go-sitemap"
											target="_blank"
											className="button"
										>View on Github</a>
									</div>
								</div>
							</div>
						</Container>
					</Section>
					<Section
						background={''}
					>
						<Container>
						<div className="column center-md ">
							<h2 className="tac pblg" >Latest Posts</h2>
							<div className="row center-xs mbxlg">
							<div className="col-xs-12 col-md-6">
								{data.allMarkdownRemark.edges
								.map(node => node.node)
								.slice(0,3)
								.map(node => (
									<Link to={node.fields.slug} className="mblg db">
										<h4>{node.frontmatter.title}</h4>
										<small>{node.frontmatter.date}</small>
									</Link>
									)
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
