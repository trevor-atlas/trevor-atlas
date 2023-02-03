import { css } from '@emotion/css';
import React, { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => (
  <main
    className={css`
      min-height: 100vh;
    `}
  >
    {children}
  </main>
);
