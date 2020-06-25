import React, { useLayoutEffect, useRef, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';
import { Section } from './Section';
import { Container } from './Container';
import { getCareerLength } from '../utils/helpers';

const link = (text: string, url: string) => (
	<a href={url} target='_blank' rel='noopener'>
		{text}
	</a>
);

interface Props {}
const delay = (n: number) => ({ animationDelay: `.${n}s` });

const Bio: React.FunctionComponent<Props> = (props) => {
	const [visible, setVisibility] = useState(false);
	const ourRef = useRef(null);
	useLayoutEffect(() => {
		const topPosition = ourRef.current.getBoundingClientRect().bottom;
		const onScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight;
			if (topPosition < scrollPosition) {
				setVisibility(true);
			}
		};
		onScroll();

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<StaticQuery
			query={bioQuery}
			render={(data) => {
				const {
					avatar: {
						childImageSharp: { fixed }
					},
					site: {
						siteMetadata: { author }
					}
				} = data;

				return (
					<div ref={ourRef}>
						<Section>
							{visible && (
								<Container>
									<div className='row center-xs start-md'>
										<div className='col-xs-12 col-sm-4 col-md-3 tac'>
											<Image
												fixed={fixed}
												alt={author}
												className={`${
													visible
														? 'slide-in-right'
														: ''
												}`}
												style={{
													marginBottom: 0,
													backgroundColor: '#ee966a',
													borderRadius: '50%'
												}}
												imgStyle={{
													borderRadius: `50%`
												}}
											/>
										</div>
										<div className='col-xs-12 col-sm-8 col-md-9'>
											<h1
												className={`${
													visible ? 'slide-in-up' : ''
												} bp1-heading`}
											>
												<span className='wave'>👋</span>{' '}
												Hello,
											</h1>
											<h3
												className={`${
													visible ? 'slide-in-up' : ''
												} bp3-heading`}
												style={{ ...delay(1) }}
											>
												My name is Trevor Atlas – I'm a
												Software Developer and Designer
												based in Northern Virginia.
											</h3>
											<p
												className={`${
													visible ? 'slide-in-up' : ''
												} bp3-running-text bp3-text-large`}
												style={{ ...delay(2) }}
											>
												For {getCareerLength()}, I've
												worked at agencies and startups
												building functional and
												intuitive interfaces, flexible
												and robust services, and
												powerful mobile applications.
											</p>

											<p
												className={`${
													visible ? 'slide-in-up' : ''
												} bp3-running-text bp3-text-large`}
												style={{ ...delay(3) }}
											>
												When I'm not building user
												interfaces in{' '}
												{link(
													'React',
													'https://reactjs.org/'
												)}
												, most of my day-to-day work
												involves microservices in{' '}
												{link(
													'AWS',
													'https://aws.amazon.com'
												)}{' '}
												using{' '}
												{link(
													'Terraform',
													'https://www.terraform.io/'
												)}{' '}
												to scaffold infrastructure,{' '}
												{link(
													'Typescript',
													'https://www.typescriptlang.org/'
												)}{' '}
												and{' '}
												{link(
													'Go',
													'https://golang.org/'
												)}{' '}
												for application logic and{' '}
												{link(
													'Postgres',
													'https://www.postgresql.org/'
												)}
												/
												{link(
													'Redis',
													'https://redis.io/'
												)}{' '}
												as a data store. I've also been
												working on mobile applications
												with{' '}
												{link(
													'React Native',
													'https://facebook.github.io/react-native/'
												)}{' '}
												and{' '}
												{link(
													'Expo',
													'https://expo.io/'
												)}
												.
											</p>
										</div>
									</div>
								</Container>
							)}
						</Section>
					</div>
				);
			}}
		/>
	);
};

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
`;

export default Bio;
