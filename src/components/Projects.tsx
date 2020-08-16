import React, { useState, useRef, useEffect, FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const onProjectClick = ({ url }: { url: string }) => (
	event: React.MouseEvent
) => {
	if (event.metaKey || event.ctrlKey) {
		const tab = window.open(url, '_blank');
		if (tab) tab.blur();
		window.focus();
	} else {
		window.open(url, '_blank');
	}
};

interface Project {
	title: string;
	url: string;
	description: string;
}

interface Props {
	title: string;
	projects: Project[];
}

const parentVariant = {
	end: {
		transition: { staggerChildren: 0.17, delayChildren: 0.2 }
	},
	start: {
		transition: {
			staggerChildren: 0.618,
			staggerDirection: -1
		}
	}
};

const variants = {
	start: {
		transition: {
			duration: 0.3
		},
		opacity: 0,
		x: -700
	},
	end: {
		transition: {
			duration: 0.3
		},
		opacity: 1,
		x: 0
	}
};

const titleVariants = {
	start: {
		transition: {
			duration: 0.3
		},
		opacity: 0,
		y: -500
	},
	end: {
		transition: {
			duration: 0.3
		},
		opacity: [0, 0.2, 0.3, 0.5, 1],
		y: 0
	}
};

export const Projects: FC<Props> = ({ title, projects }) => {
	const [visible, setVisibility] = useState(false);
	const ourRef = useRef(null);
	useEffect(() => {
		const topPosition =
			(ourRef &&
				ourRef.current &&
				ourRef.current.getBoundingClientRect().bottom) ||
			0;
		const onScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight * 0.85;
			if (topPosition < scrollPosition) {
				setVisibility(true);
			}
		};
		onScroll();

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<motion.div
			ref={ourRef}
			initial="start"
			animate={visible ? 'end' : 'start'}
			variants={parentVariant}
		>
			<motion.h2
				initial="start"
				animate={visible ? 'end' : 'start'}
				variants={titleVariants}
				className="text-center mb-12"
				style={{ color: 'white' }}
			>
				{title}
			</motion.h2>
			{projects.map((project, i) => {
				return (
					<motion.div
						key={i}
						variants={variants}
						className="row center-xs mb-12"
					>
						<div className="col-xs-12">
							<h3 className="white mt-0">{project.title}</h3>
							<p className="">{project.description}</p>

							<Link href={project.url}>
								<a className="underline">Learn More</a>
							</Link>
						</div>
					</motion.div>
				);
			})}
		</motion.div>
	);
};
