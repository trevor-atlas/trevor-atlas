import React, { FC } from 'react';
import styles from 'src/components/now-playing/now-playing.module.scss';

export interface ISong {
  artist: string;
  songUrl: string;
  title: string;
}

export interface ISpotifyCurrentlyPlaying extends ISong {
  album: string;
  albumImageUrl: string;
  isPlaying: boolean;
}

export const NowPlaying: FC<ISpotifyCurrentlyPlaying> = React.memo(
  ({
    isPlaying = false,
    songUrl = '',
    album = 'Not Playing',
    artist = 'Not Playing',
    title = 'Not Playing',
    albumImageUrl = '/images/jeffrey.png'
  }) => (
    <div className={styles.container}>
      <a
        className={styles.wrapper_link}
        href={songUrl}
        target="_blank"
        rel="noreferrer noopener nofollow"
      >
        <small>Currently listening to...</small>
        <div className={styles.player}>
          <img src={albumImageUrl} alt={album} />
          <div className={styles.player_metadata}>
            <div className={styles.artist}>{artist}</div>
            {isPlaying && <div className={styles.track}>{title}</div>}
          </div>
        </div>
      </a>
    </div>
  )
);
