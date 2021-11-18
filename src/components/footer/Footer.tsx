import React, { FC, useState } from 'react';
import { FooterLink } from 'src/components/footer/FooterLink';
import links from 'src/components/footer/sites';
import {
  ISpotifyCurrentlyPlaying,
  NowPlaying
} from 'src/components/now-playing/NowPlaying';
import { Container } from 'src/components/Container';
import { useTimedUpdate } from 'src/hooks/useTimedUpdate';
import { ONE_MINUTE } from 'src/utils/constants';

interface IFooter {
  sites?: {
    url: string;
    icon: JSX.Element;
    title: string;
    color: string;
  }[];
}

export const Footer: FC<IFooter> = ({ sites = links }) => {
  const [data, setData] = useState<ISpotifyCurrentlyPlaying | null>(null);

  useTimedUpdate(
    () => {
      fetch('/api/spotify-current')
        .then((res) => res.json())
        .then((d) => setData(d));
    },
    !data ? 1000 : ONE_MINUTE * 5,
    [data]
  );

  return (
    <footer className="py-8">
      <Container>
        <NowPlaying {...data} />
        <div className="flex flex-col md:justify-between items-center content-center">
          <div className="flex">
            {sites.map((link) => (
              <FooterLink key={link.url} {...link} />
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
};
