import React, { useCallback, useState } from 'react';
import { Burger } from '@mantine/core';
import Link from 'next/link';
import styles from './nav.module.scss';
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';
import { css } from '@emotion/css';

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

const navStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  padding: 1rem 2rem;

  background-color: transparent;
  box-shadow: none;

  @media (min-width: 768px) {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: #13233cdd;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
  }
`;

function Logo() {
  return (
    <div
      title="home"
      className={css`
        display: inline-block;
        height: 36px;
        width: 36px;
      `}
    >
      <Link href="/" className="no-underline">
        <Image src="/logo.png" width="36" height="36" alt="logo" />
      </Link>
    </div>
  );
}

export function Nav() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';
  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.preventDefault();
      if (opened) {
        setOpened(false);
      }
    },
    [opened]
  );

  return (
    <nav className={`${navStyles} mx-auto`}>
      <Logo />
      <Burger
        className="md:hidden z-20"
        size={36}
        color="rgba(255, 255, 255, 0.8)"
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        title={title}
        aria-label={title}
      />
      <ul
        className={css`
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 100vh;
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: center;

          @media (max-width: 768px) {
            padding: 2rem;
            font-size: 2rem;
            -webkit-backdrop-filter: blur(15px);
            backdrop-filter: blur(15px);
            background-color: #13233cdd;
            box-shadow: 0 -2.8px 2.2px rgba(0, 0, 0, 0.034);
            transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
              opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            opacity: ${opened ? 1 : 0};
            transform: ${opened ? 'translateX(0)' : 'translateX(150%)'};
          }

          @media (min-width: 768px) {
            position: relative;
            top: auto;
            right: auto;
            left: auto;
            height: auto;
            display: flex;
            flex-direction: row;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
            align-items: center;
            justify-content: center;
          }
        `}
      >
        <li
          key="home"
          onClick={handleLinkClick}
          className={`${styles.link} ${
            isActive('/', router) && styles.active
          } relative block pr-1 py-1 md:hidden`}
        >
          <Link className="no-underline" href={'/'}>
            Home
          </Link>
        </li>
        {links.map((l) => (
          <li
            key={l.label}
            onClick={handleLinkClick}
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
