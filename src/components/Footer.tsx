import React from 'react';
import { Colors } from '../utils/colors';
import { Container } from './Container';
import {
	faDribbble,
	faGithub,
	faLinkedin,
	faStackOverflow,
	faTwitter,
	IconDefinition
} from '@fortawesome/free-brands-svg-icons';
import { faFilePdf, faPaperPlane } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	sites?: { url: string; icon: IconDefinition; title: string }[];
}

export const Footer: React.FunctionComponent<Props> = ({ sites }) => {
	return (
		<footer
			style={{
				padding: '1em 0',
				background: Colors.primary.get(),
				color: 'white'
			}}
		>
			<Container>
				<div className='row between-md center-xs'>
					<div className='col-12-xs col-6-md ph2 '>
						<p className='pa3 dib'>
							© {`2014 - ${new Date().getFullYear()}`} Trevor
							Atlas
						</p>
					</div>
					<div className='col-12-xs col-6-md ph2'>
						{sites.map((site) => (
							<a
								target='_blank'
								href={site.url}
								rel='noopener'
								aria-hidden='true'
								className='pa3 dib'
							>
								<FontAwesomeIcon
									icon={site.icon}
									title={site.title}
								/>
							</a>
						))}
					</div>
				</div>
			</Container>
		</footer>
	);
};

Footer.defaultProps = {
	sites: [
		{
			url: 'https://github.com/trevor-atlas',
			icon: faGithub,
			title: 'Github'
		},
		{
			url: 'https://twitter.com/trevoratlas',
			icon: faTwitter,
			title: 'Twitter'
		},
		{
			url: 'https://www.linkedin.com/in/trevoristall/',
			icon: faLinkedin,
			title: 'Linkedin'
		},
		{
			url: 'https://dribbble.com/trevoratlas',
			icon: faDribbble,
			title: 'Dribbble'
		},
		{
			url: 'https://stackoverflow.com/users/5770188/trevor-atlas',
			icon: faStackOverflow,
			title: 'Stack Overflow'
		},
		{
			url: 'https://app.standardresume.co/r/TrevorAllen',
			icon: faFilePdf,
			title: 'Resume'
		},
		{ url: 'mailto:me@trevoratlas.com', icon: faPaperPlane, title: 'Email' }
	]
};
