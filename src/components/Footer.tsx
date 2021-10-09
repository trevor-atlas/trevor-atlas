import React, { FC } from 'react';
import {
  ISpotifyCurrentlyPlaying,
  NowPlaying
} from 'src/components/spotify/NowPlaying';
import { fetcher } from 'src/utils/helpers';
import { IconContext } from 'react-icons';
import {
  AiOutlineDribbble,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineFilePdf
} from 'react-icons/ai';
import { FaStackOverflow } from 'react-icons/fa';
import { BsMailbox } from 'react-icons/bs';
import useSWR, { responseInterface } from 'swr';
import { Container } from './Container';
import { Colors } from '../utils/colors';
import styles from './footer.module.scss';

interface Props {
  sites?: {
    url: string;
    icon: React.ReactNode;
    title: string;
    color: string;
  }[];
}

export interface ISong {
  artist: string;
  songUrl: string;
  title: string;
}

export const Footer: FC<Props> = React.memo(
  ({
    sites = [
      {
        url: 'https://github.com/trevor-atlas',
        icon: AiOutlineGithub,
        title: 'Github',
        color: 'white'
      },
      {
        url: 'https://twitter.com/trevoratlas',
        icon: AiOutlineTwitter,
        title: 'Twitter',
        color: '#1da1f2'
      },
      {
        url: 'https://www.linkedin.com/in/trevoratlas',
        icon: AiOutlineLinkedin,
        title: 'Linkedin',
        color: '#2867b2'
      },
      {
        url: 'https://dribbble.com/trevoratlas',
        icon: AiOutlineDribbble,
        title: 'Dribbble',
        color: '#ea4c89'
      },
      {
        url: 'https://stackoverflow.com/users/5770188/trevor-atlas',
        icon: FaStackOverflow,
        title: 'Stack Overflow',
        color: '#FF9900'
      },
      {
        url: 'https://app.standardresume.co/r/TrevorAllen',
        icon: AiOutlineFilePdf,
        title: 'Resume',
        color: 'rgb(242, 7, 4)'
      },
      {
        url: 'mailto:me@trevoratlas.com',
        icon: BsMailbox,
        title: 'Email',
        color: Colors.palette.ocean
      }
    ]
  }) => {
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
              {sites.map((site) => (
                <a
                  key={site.title}
                  target="_blank"
                  href={site.url}
                  rel="noopener noreferrer"
                  aria-hidden="true"
                  className={`${styles.site_link} ${
                    styles[site.title]
                  } p-3 inline-block`}
                >
                  <site.icon />
                </a>
              ))}
            </div>
            <div className="flex">
              <small className="p-3 inline-block mb-0 muted">
                © {`2014 - ${new Date().getFullYear()}`} Trevor Atlas
              </small>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
);
