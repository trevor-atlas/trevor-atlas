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
				<Bio />
			</div>

			<Section background={Colors.primary.get()} type='triangles'>
				<Container>
					<div className='column center-md paxlg'>
						<h2 className='tc mb5' style={{ color: 'white' }}>
							Projects
						</h2>
						<Projects projects={projects} />
					</div>
					<hr />
					<div className='column center-md paxlg'>
						<h2 className='tac mb5' style={{ color: 'white' }}>
							Experiments
						</h2>
						{experiments.map(
							(exp: {
								title: string;
								url: string;
								description: string;
							}) => {
								return (
									<div className='row center-xs mbxlg'>
										<div className='col-xs-12'>
											<h3
												className=''
												style={{ color: 'white' }}
											>
												{exp.title}
											</h3>
											<p
												className='bp3-running-text bp3-text-large'
												style={{}}
											>
												{exp.description}
											</p>
											<Button
												icon='code'
												text='View'
												type='button'
												intent={Intent.PRIMARY}
												onClick={() =>
													navigate(exp.url)
												}
											/>
										</div>
									</div>
								);
							}
						)}
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
											<small className='dib mb2'>
												{node.frontmatter.date}
											</small>
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
