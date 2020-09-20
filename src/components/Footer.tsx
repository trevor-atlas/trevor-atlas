import React, { FC } from 'react';
import {
	ISpotifyCurrentlyPlaying,
	NowPlaying
} from 'src/components/spotify/NowPlaying';
import { fetcher } from 'src/utils/helpers';
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
import useSWR, { responseInterface } from 'swr';

interface Props {
	sites?: {
		url: string;
		icon: IconDefinition;
		title: string;
		color: string;
	}[];
}

export interface ISong {
	artist: string;
	songUrl: string;
	title: string;
}

export const Footer: FC<Props> = React.memo(({ sites }) => {
	const {
		data: playing
	}: responseInterface<ISpotifyCurrentlyPlaying, Error> = useSWR(
		'/api/spotify-current',
		fetcher,
		{
			refreshInterval: 5 * 1000 * 60
		}
	);

	return (
		<footer className="py-8">
			<Container>
				<NowPlaying {...playing} />
				<div className="flex flex-col  md:justify-between items-center content-center">
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
					<div className="flex">
						<small className="p-3 inline-block mb-0 muted">
							© {`2014 - ${new Date().getFullYear()}`} Trevor
							Atlas
						</small>
					</div>
				</div>
			</Container>
		</footer>
	);
});

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
			color: Colors.palette.ocean
		}
	]
};
