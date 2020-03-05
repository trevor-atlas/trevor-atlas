import React from 'react'
import { Link } from 'gatsby'
import { Location } from 'history'
import { Container } from './Container'
import { Colors } from '../utils/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStackOverflow,
	faGithub,
	faTwitter,
	faLinkedin,
	faReddit,
	faDribbble,
	IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { faFilePdf, faPaperPlane } from '@fortawesome/pro-solid-svg-icons'

const sites: { url: string, icon: IconDefinition, title: string }[] = [
	{ url: 'https://github.com/trevor-atlas', icon: faGithub, title: 'Github' },
	{ url: 'https://twitter.com/trevoratlas', icon: faTwitter, title: 'Twitter' },
	{ url: 'https://www.linkedin.com/in/trevoristall/', icon: faLinkedin, title: 'Linkedin' },
	{ url: 'https://dribbble.com/trevoratlas', icon: faDribbble, title: 'Dribbble' },
	{
		url: 'https://stackoverflow.com/users/5770188/trevor-atlas',
		icon: faStackOverflow,
		title: 'Stack Overflow',
	},
	{ url: 'https://app.standardresume.co/r/TrevorAllen', icon: faFilePdf, title: 'Resume' },
	{ url: 'mailto:me@trevoratlas.com', icon: faPaperPlane, title: 'Email' },
]

const icons = sites.map((site) =>
	<a
		target="_blank"
		href={site.url}
		rel="noopener"
		aria-hidden="true"
		className="pa3 dib"
	>
		<FontAwesomeIcon
			icon={site.icon}
			title={site.title}
		/>
	</a>,
)

class Layout extends React.PureComponent<{ location: Location<any>, title: string }> {

	render() {
		const { location, title, children } = this.props
		const rootPath = `${__PATH_PREFIX__}/`

		return (
			<>
				<nav className="middle-xs" style={{
					padding: '1em',
					display: 'flex',
					background: Colors.primary.get(),
					color: 'white',
					marginBottom: '2em',
				}}
				>
					<div className="container">
						<div className="row start-xs">
							<h4 className="white mbn">
								<Link
									style={{
										boxShadow: `none`,
										textDecoration: `none`,
										color: `inherit`,
									}}
									to={`/`}
								>
									{title}
								</Link>
							</h4>
							<ul style={{
								listStyle: 'none',
								display: 'inline-block',
								padding: 0,
								margin: `0 2em`,
							}}>
								<li style={{ display: 'inline-block', marginRight: '1em'}}>
									<Link
										style={{
											boxShadow: `none`,
											textDecoration: `none`,
										}}
										to={`/blog`}
									>
										Blog
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<main>{children}</main>
				<footer
					style={{
						padding: '1em 0',
						background: Colors.primary.get(),
						color: 'white',
					}}
				>
					<Container>
						<div className="row between-md center-xs">
							<div className="col-12-xs col-6-md ph2 ">
								<p className="pa3 dib">© {`2014 - ${new Date().getFullYear()}`} Trevor Atlas</p>
							</div>
							<div className="col-12-xs col-6-md ph2">
								{icons}
							</div>
						</div>
					</Container>
				</footer>
			</>
		)
	}
}

export default Layout
