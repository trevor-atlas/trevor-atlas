import React, { CSSProperties, FC } from 'react';

export interface ISectionAccent {
  backgroundColor: string;
}

interface ISection {
  background?: string;
  style?: CSSProperties;
  Before?: FC<ISectionAccent>;
  After?: FC<ISectionAccent>;
  children: React.ReactNode;
}

export const Section: FC<ISection> = ({ style, children }) => {
  return (
    <>
      <section
        className="py-16"
        style={{
          margin: 0,
          position: 'relative',
          ...style
        }}
      >
        {children}
      </section>
    </>
  );
};

Section.defaultProps = {
  background: ''
};
