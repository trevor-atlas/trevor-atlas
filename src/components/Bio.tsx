import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { getCareerLength } from '../utils/helpers';
import { Container } from './Container';
import { Section } from './Section';

const link = (text: string, url: string) => (
	<a href={url} target='_blank' rel='noopener'>
		{text}
	</a>
);

interface Props {}
const delay = (n: number) => ({ animationDelay: `.${n}s` });

const Bio: FC<Props> = () => {
	const [visible, setVisibility] = useState(false);
	const ourRef: Ref<HTMLDivElement> = useRef(null);
	useEffect(() => {
		const topPosition =
			(ourRef &&
				ourRef.current &&
				ourRef.current.getBoundingClientRect().bottom) ||
			0;
		const onScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight;
			if (topPosition < scrollPosition) {
				setVisibility(true);
			}
		};
		onScroll();

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div ref={ourRef}>
			<Section>
				{visible && (
					<Container>
						<div className='flex flex-col md:flex-row content-center items-center'>
							<div className='flex text-center'>
								<img
									alt='Portrait of Trevor Atlas'
									src={'/portrait2020.png'}
									className={`${
										visible ? 'slide-in-right' : ''
									}`}
									style={{
										height: 250,
										width: 250,
										marginBottom: 0,
										backgroundColor: '#ee966a',
										borderRadius: '50%'
									}}
								/>
							</div>
							<div className='flex-1 ml-8'>
								<h2
									className={
										visible ? 'slide-in-up mb-0' : ''
									}
								>
									<span className='wave'>👋</span> Hello,
								</h2>
								<h4
									className={`mt-0 ${
										visible ? 'slide-in-up' : ''
									} bp3-heading`}
									style={{ ...delay(1) }}
								>
									My name is Trevor Atlas – I'm a Software
									Developer and Designer based in Northern
									Virginia.
								</h4>
								<p
									className={`${
										visible ? 'slide-in-up' : ''
									} bp3-running-text bp3-text-large`}
									style={{ ...delay(2) }}
								>
									For {getCareerLength()}, I've worked at
									agencies and startups building functional
									and intuitive interfaces, flexible and
									robust services, and powerful mobile
									applications.
								</p>

								<p
									className={`${
										visible ? 'slide-in-up' : ''
									} bp3-running-text bp3-text-large`}
									style={{ ...delay(3) }}
								>
									When I'm not building user interfaces in{' '}
									{link('React', 'https://reactjs.org/')},
									most of my day-to-day work involves
									microservices in{' '}
									{link('AWS', 'https://aws.amazon.com')}{' '}
									using{' '}
									{link(
										'Terraform',
										'https://www.terraform.io/'
									)}{' '}
									to scaffold infrastructure,{' '}
									{link(
										'Typescript',
										'https://www.typescriptlang.org/'
									)}{' '}
									and {link('Go', 'https://golang.org/')} for
									application logic and{' '}
									{link(
										'Postgres',
										'https://www.postgresql.org/'
									)}
									/{link('Redis', 'https://redis.io/')} as a
									data store. I've also been working on mobile
									applications with{' '}
									{link(
										'React Native',
										'https://facebook.github.io/react-native/'
									)}{' '}
									and {link('Expo', 'https://expo.io/')}.
								</p>
							</div>
						</div>
					</Container>
				)}
			</Section>
		</div>
	);
};

export default Bio;
