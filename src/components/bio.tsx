import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { Section } from './Section';
import { Container } from './Container';
import { Duration } from 'luxon';

const getCareerLength = () => {
	const start = new Date('03/14/2014');
	const now = new Date();
	const duration = Duration.fromObject({
		years: now.getFullYear() - start.getFullYear(),
		months: (now.getMonth() - start.getMonth()) || 0
	});

	const years = duration.get('years');
	const months = duration.get('months');
	if (months >= 8) {
		return `nearly ${years + 1} years`
	}
	if (months > 5) {
		return `${years} and a half years`
	}
	return `${years} years`
}
 
const link = (text: string, url: string) => <a href={url} target="_blank" rel="noopener">{text}</a>

class Bio extends React.PureComponent {
	render() {
		return (
			<StaticQuery
				query={bioQuery}
				render={data => {
					const { author } = data.site.siteMetadata
					return (
						<Section
							background={''}
						>
							<Container>
								<div className="row center-xs start-md">
									<div className="col-xs-12 col-sm-4 col-md-3 tac">
										<Image
											fixed={data.avatar.childImageSharp.fixed}
											alt={author}
											style={{
												marginBottom: 0,
												backgroundColor: '#ee966a',
												borderRadius: '50%'
											}}
											imgStyle={{
												borderRadius: `50%`,
											}}
										/>
									</div>
									<div className="col-xs-12 col-sm-8 col-md-9">
										<h1 className="bp1-heading"><span className="wave">👋</span> Hello,</h1>
										<h3 className="bp3-heading">My name is Trevor Atlas – I'm a Software Developer and Designer based in Virginia.</h3>
										<p className="bp3-running-text bp3-text-large">For {getCareerLength()}, I've worked at agencies and startups building functional and intuitive interfaces, flexible and robust services, and powerful mobile applications.</p>

										<p className="bp3-running-text bp3-text-large">When I'm not building user interfaces in {link('React', 'https://reactjs.org/')}, most of my day-to-day work involves microservices in {link('AWS', 'https://aws.amazon.com')} using {link('Terraform', 'https://www.terraform.io/')} to scaffold infrastructure, {link('Typescript', 'https://www.typescriptlang.org/')} and {link('Go', 'https://golang.org/')} for application logic and {link('Postgres', 'https://www.postgresql.org/')}/{link('Redis', 'https://redis.io/')} as a data store.
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
    avatar: file(absolutePath: { regex: "/assets/portrait2020.png/" }) {
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
