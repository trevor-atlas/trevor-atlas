import { Button, Intent } from '@blueprintjs/core';
import { graphql, Link, navigate } from 'gatsby';
import React from 'react';
import { Projects } from '../components/Projects';
// @ts-ignore
import experiments from '../../content/experiments.json';
// @ts-ignore
import projects from '../../content/projects.json';
import { AnimatedHeader } from '../components/AnimatedHeader';
import Bio from '../components/Bio';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import SEO from '../components/Seo';
import { Colors } from '../utils/colors';

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
						readingTime {
							text
						}
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
					}
				}
			}
		}
	}
`;

export default function(props: { location: Location; data: any }) {
	const { data, location } = props;
	const color = Colors.lines.getRGB();

	return (
		<>
			{location.pathname === '/' && color && (
				<AnimatedHeader
					animating
					color={`${color.r},${color.g},${color.b}`}
				/>
			)}
			<SEO title='Home Page' />
			<div className='pt5 pb6'>
				<Bio key={`bio-${window.location.pathname}`} />
			</div>

			<Section background={Colors.primary.get()} type='triangles'>
				<Container>
					<div className='column center-md paxlg'>
						<Projects
							key={`projects-${window.location.pathname}`}
							title='Projects'
							projects={projects}
						/>
					</div>
					<hr />
					<div className='column center-md paxlg'>
						<Projects
							key={`experiments-${window.location.pathname}`}
							title='Experiments'
							projects={experiments}
						/>
					</div>
				</Container>
			</Section>

			<Section background={''}>
				<Container>
					<div className='column center-md pv4'>
						<h2 className='tc mb4'>Latest Posts</h2>
						<div className='row center-xs'>
							<div className='col-xs-12 col-md-8'>
								{data.allMarkdownRemark.edges
									.map((node: any) => node.node)
									.slice(0, 5)
									.map((node: any) => (
										<div className='mb4'>
											<h4 className='mb0'>
												{node.frontmatter.title}
											</h4>
											<div className='row between-xs mb2 mh0'>
												<small>
													{node.frontmatter.date}
												</small>
												<small className='muted'>
													{
														node.fields.readingTime
															.text
													}
												</small>
											</div>
											<Link
												to={node.fields.slug}
												className='underline db'
											>
												Read article
											</Link>
										</div>
									))}
							</div>
						</div>
					</div>
				</Container>
			</Section>
		</>
	);
}
