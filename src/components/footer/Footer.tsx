import React, { FC } from 'react';
import { FooterLink } from 'src/components/footer/FooterLink';
import { links } from 'src/components/footer/sites';
import { css } from '@emotion/css';
import { CAREER_START_DATE } from 'src/utils/helpers';

interface IFooter {}

export const Footer: FC<IFooter> = () => {
  return (
    <footer
      className={css`
        padding: 0.25rem 0;
        background-color: rgba(0, 25, 50, 0.8);
        color: rgba(255, 255, 255, 0.8);
        margin-top: 4rem;
        background-color: #13233cdd;
        box-shadow: 0 -2.8px 2.2px rgba(0, 0, 0, 0.034),
          0 -6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
          0 -22.3px 17.9px rgba(0, 0, 0, 0.072),
          0 -41.8px 33.4px rgba(0, 0, 0, 0.086),
          0 100px 80px rgba(0, 0, 0, 0.12);
      `}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center content-center">
          <div className="flex">
            {Object.entries(links).map(([title, url]) => (
              <FooterLink
                key={url}
                title={title as keyof typeof links}
                url={url}
              />
            ))}
          </div>
          <div className="flex">
            <p className="p-3 inline-block mb-0">
              © {CAREER_START_DATE.getFullYear()} -{' '}
              {`${new Date().getFullYear()}`} Trevor Atlas
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
