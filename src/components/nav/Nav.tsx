import React, { Fragment } from 'react';
import Link from 'next/link';
import styles from './nav.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';

const links = [
  { label: 'About', url: '/about' },
  { label: 'Blog', url: '/blog' },
  { label: 'Experiments', url: '/experiments' }
];

function isActive(url: string, router: any) {
  for (const part of router.pathname.split('/')) {
    if (part === url.replace('/', '') && part !== '') {
      return true;
    }
  }

  return router.pathname === url;
}

export function Nav() {
  const router = useRouter();
  return (
    <nav className={`${styles.nav} mx-auto`}>
      <ul className={`${styles.navContent} flex px-3 text-sm font-medium`}>
        <li
          className={`${styles.link} ${
            isActive('/', router) && styles.active
          } relative block px-3 py-1 `}
        >
          <Link href="/" className="no-underline">
            <Image src="/logo.png" width="25" height="25" alt="logo" />
          </Link>
        </li>
        {links.map((l) => (
          <li
            key={l.label}
            className={`${styles.link} ${
              isActive(l.url, router) && styles.active
            } relative block pr-1 py-1 `}
          >
            <Link className="no-underline" href={l.url}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
