import React, { FC } from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Container: FC<Props> = ({ className, children }) => (
  <div className={`container mx-auto p-6 md:p-0 ${className}`}>{children}</div>
);
