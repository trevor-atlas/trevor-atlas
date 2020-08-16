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
	sites?: {
		url: string;
		icon: IconDefinition;
		title: string;
		color: string;
	}[];
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
				<div className="flex flex-col md:flex-row md:justify-between items-center content-center">
					<div className="flex">
						<p className="p-3 inline-block mb-0">
							© {`2014 - ${new Date().getFullYear()}`} Trevor
							Atlas
						</p>
					</div>
					<div className="flex">
						{sites.map((site, i) => (
							<a
								key={i}
								target="_blank"
								href={site.url}
								rel="noopener noreferrer"
								aria-hidden="true"
								className="p-2 inline-block"
							>
								<FontAwesomeIcon
									icon={site.icon}
									title={site.title}
									color={site.color}
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
			title: 'Github',
			color: 'white'
		},
		{
			url: 'https://twitter.com/trevoratlas',
			icon: faTwitter,
			title: 'Twitter',
			color: '#1da1f2'
		},
		{
			url: 'https://www.linkedin.com/in/trevoristall/',
			icon: faLinkedin,
			title: 'Linkedin',
			color: '#2867b2'
		},
		{
			url: 'https://dribbble.com/trevoratlas',
			icon: faDribbble,
			title: 'Dribbble',
			color: '#ea4c89'
		},
		{
			url: 'https://stackoverflow.com/users/5770188/trevor-atlas',
			icon: faStackOverflow,
			title: 'Stack Overflow',
			color: '#FF9900'
		},
		{
			url: 'https://app.standardresume.co/r/TrevorAllen',
			icon: faFilePdf,
			title: 'Resume',
			color: 'rgb(242, 7, 4)'
		},
		{
			url: 'mailto:me@trevoratlas.com',
			icon: faPaperPlane,
			title: 'Email',
			color: Colors.links.get()
		}
	]
};
