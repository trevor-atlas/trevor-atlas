import { m } from 'framer-motion';
import { Children, ReactNode } from 'react';

const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: 'auto',
    transition: { when: 'beforeChildren', staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: 0 }
};

function List({ children, open }: { children: ReactNode; open: boolean }) {
  return (
    <m.ul
      variants={container}
      initial="hidden"
      animate={open ? 'show' : 'hidden'}
    >
      {Children.map(children, (child) => (
        <li>
          <m.div variants={item}>{child}</m.div>
        </li>
      ))}
    </m.ul>
  );
}
