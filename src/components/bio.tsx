import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import showdown from 'showdown';
import { Section } from './Section';
import { Container } from './Container';
import { DateTime, Duration } from 'luxon';

const converter = new showdown.Converter();
const getCareerLength = () => {
	const start = new Date('03/14/2014');
	const now = new Date();
	const duration = Duration.fromObject({
		years: now.getFullYear() - start.getFullYear(),
		months: (now.getMonth() - start.getMonth()) || 0
	});

	return duration.get('months') > 5
		? `${duration.get('years')} and a half years`
		: `${duration.get('years')} years`
}
 
const link = (text: string, url: string) => <a href={url} target="_blank">{text}</a>
class Bio extends React.PureComponent {
	render() {
		return (
			<StaticQuery
				query={bioQuery}
				render={data => {
					const { author, social, description } = data.site.siteMetadata
					return (
						<Section
							background={''}
							invert={false}
						>
							<Container>
								<div className="row center-xs start-sm">
									<div className="col-xs-12 col-sm-4 col-md-3 center-xs">
										<Image
											fixed={data.avatar.childImageSharp.fixed}
											alt={author}
											style={{
												marginBottom: 0,
												minWidth: 200,
												minHeight: 200
											}}
											imgStyle={{
												borderRadius: `50%`
											}}
										/>
									</div>
									<div className="col-xs-12 col-sm-8 col-md-9">
										<h3>👋 Hello,</h3>

										<p>My name is Trevor Atlas – I'm a Software Developer and Designer based in Washington, DC</p>
										<p>I've been working for the last {getCareerLength()} for agencies and startups building functional and intuitive interfaces, flexible and robust services and powerful mobile applications</p>

										<p>Much of my day-to-day work involves microservices in {link('AWS', 'https://aws.amazon.com')} using {link('Terraform', 'https://www.terraform.io/')} to scaffold infrastructure, {link('Typescript', 'https://www.typescriptlang.org/')} and {link('Go', 'https://golang.org/')} for application logic and {link('Postgres', 'https://www.postgresql.org/')}/{link('Redis', 'https://redis.io/')} as a data store.
											I've also been working on mobile applications with {link('React Native', 'https://facebook.github.io/react-native/')} and {link('Expo', 'https://expo.io/')}.
										</p>
									</div>
								</div>
							</Container>
						</Section>
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
