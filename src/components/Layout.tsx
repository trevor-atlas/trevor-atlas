import React from 'react';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav } from './Nav';

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
			duration: duration,
			delay: duration,
			when: 'beforeChildren'
		}
	},
	exit: {
		y: 100,
		opacity: 0,
		transition: { duration: duration }
	}
};

export const Layout: React.FunctionComponent<{
	location: Location;
	data: any;
}> = ({ children, location }) => {
	return (
		<div key={`page-${location.pathname}`}>
			<Nav />
			<AnimatePresence>
				<motion.main
					key={location.pathname}
					variants={variants}
					initial='initial'
					animate='enter'
					exit='exit'
				>
					{children}
				</motion.main>
			</AnimatePresence>
			<Footer />
		</div>
	);
};
