import React, { FC } from 'react';
import { FooterLink } from 'src/components/footer/FooterLink';
import { links } from 'src/components/footer/sites';
import { Container } from 'src/components/Container';

interface IFooter {
  sites?: {
    url: string;
    title: string;
    color: string;
  }[];
}

export const Footer: FC<IFooter> = ({ sites = links }) => {
  return (
    <footer className="py-8">
      <Container>
        <div className="flex flex-col md:justify-between items-center content-center">
          <div className="flex">
            {sites.map((link) => (
              <FooterLink key={link.url} {...link} />
            ))}
          </div>
          <div className="flex">
            <small className="p-3 inline-block mb-0">
              © 2012 - {`${new Date().getFullYear()}`} Trevor Atlas
            </small>
          </div>
        </div>
      </Container>
    </footer>
  );
};
