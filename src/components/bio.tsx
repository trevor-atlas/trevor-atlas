import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import showdown from 'showdown';

const converter = new showdown.Converter();

class Bio extends React.PureComponent {
	render() {
		return (
			<StaticQuery
				query={bioQuery}
				render={data => {
					const { author, social, description } = data.site.siteMetadata
					return (
						<div
							style={{
								display: `flex`,
								marginBottom: '2em',
								justifyContent: 'space-between'
							}}
						>
							<Image
								fixed={data.avatar.childImageSharp.fixed}
								alt={author}
								style={{
									marginBottom: 0,
									marginRight: '2em',
									minWidth: 200,
									minHeight: 200
								}}
								imgStyle={{
									borderRadius: `50%`
								}}
							/>
							<div>
								<div dangerouslySetInnerHTML={{ __html: converter.makeHtml(description) }}></div>
								<a target="_blank" href={`https://twitter.com/${social.twitter}`}>
									You should follow him on Twitter
								</a>
							</div>
						</div>
					)
				}}
			/>
		)
	}
}
const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        description
        author
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Bio
