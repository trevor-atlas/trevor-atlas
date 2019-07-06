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
							<div className="column">
								<h3 style={{color: 'white'}}>Projects</h3>
								<div className="row">

								<div className="col-xs-12 col-md-6">
									<GithubCard user="trevor-atlas" repo="vor" />
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
