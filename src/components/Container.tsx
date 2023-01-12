import React, { FC } from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Container: FC<Props> = ({ className, children }) => (
  <div className={`container mx-auto p-2 md:p-6 ${className}`}>{children}</div>
);
