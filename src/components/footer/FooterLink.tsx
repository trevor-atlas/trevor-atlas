import React, { useState } from 'react';
import styles from 'src/components/footer/footer.module.scss';

export const FooterLink = ({ title, url, icon: Icon }) => {
  const [animated, setAnimated] = useState(false);
  return (
    <a
      key={title}
      target="_blank"
      href={url}
      rel="noopener noreferrer"
      aria-hidden="true"
      className={`${styles.site_link} ${styles[title]} ${
        animated ? styles.animated : ''
      } p-3 inline-block`}
      onMouseEnter={() => setAnimated(true)}
      onAnimationEnd={() => setAnimated(false)}
    >
      <Icon />
    </a>
  );
};
