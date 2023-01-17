import React from 'react';
import styles from 'src/components/footer/footer.module.scss';
import { iconMap } from './sites';

interface FooterLinkProps {
  title: keyof typeof iconMap;
  url: string;
}

export const FooterLink = ({ title, url }: FooterLinkProps) => {
  const Icon = iconMap[title];
  return (
    <a
      key={title}
      target="_blank"
      href={url}
      rel="noopener noreferrer"
      aria-hidden="true"
      className={`${styles.site_link} ${styles[title]} jello p-3 inline-block`}
    >
      <Icon />
    </a>
  );
};
