import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const duration = 0.3;
const variants = {
  initial: {
    y: -100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration,
      delay: duration,
      when: 'beforeChildren'
    }
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration }
  }
};

export const Layout: FC = ({ children }) => (
  <div key="page">
    <AnimatePresence>
      <motion.main
        key="foobar"
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  </div>
);
