import React from 'react';
import styles from './youtube.module.scss';

interface YoutubeEmbedProps {
  title?: string;
  videoId: string;
}

export function Youtube({
  videoId,
  title = 'Embedded Video'
}: YoutubeEmbedProps) {
  return (
    <div className={styles.video}>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
}
