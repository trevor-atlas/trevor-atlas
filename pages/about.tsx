import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { Container } from 'src/components/Container';
import { ISong } from 'src/components/now-playing/NowPlaying';
import SEO from 'src/components/Seo';
import Image from 'next/image';
import styles from '../src/styles/about.module.scss';
import profileImage from '../public/images/lensa-1.jpg';
import astronaut from '../public/images/about-astronaut.jpeg';
import Balancer from 'react-wrap-balancer';
import { m, motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useIsVisible } from 'src/hooks/useIsVisible';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0 }
};

function AnimatedImages({
  images
}: {
  images: ReadonlyArray<{ src: string; alt: string }>;
}) {
  const [visible, ref] = useIsVisible();

  return (
    <m.div
      className="flex flex-col md:flex-row"
      variants={container}
      animate={visible ? 'show' : 'hidden'}
      initial="hidden"
    >
      {images.map(({ src, alt }) => {
        return (
          <m.div
            ref={ref}
            className="mb-4 m-2 flex justify-center md:w-1/5"
            key={src}
            variants={item}
          >
            <Image
              alt={alt}
              src={src}
              className={`${styles.values_image} drop-shadow-md w-full`}
              width={350}
              height={350}
              quality={100}
            />
          </m.div>
        );
      })}
    </m.div>
  );
}

function Animated({ children }: { children: React.ReactNode }) {
  const [visible, ref] = useIsVisible();

  return (
    <m.div
      ref={ref}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 100
      }}
      animate={{
        x: visible ? 0 : -1000,
        opacity: visible ? 1 : 0
      }}
    >
      {children}
    </m.div>
  );
}

export async function getStaticProps() {
  const { URL } = process.env;
  const data = await fetch(`${URL}/api/spotify-top`);
  const json = await data.json();
  return {
    props: {
      top: json
    }
  };
}

const images = {
  'Digital Art': [
    {
      alt: 'A red car',
      src: '/images/car.jpg'
    },
    {
      alt: 'pikachu',
      src: '/images/pika.jpg'
    },
    {
      alt: 'fractal shapes',
      src: '/images/fractal.png'
    },
    {
      alt: 'pulp fiction',
      src: '/images/wallace.jpg'
    }
  ],
  'Hiking & being outdoors': [
    {
      alt: 'Manassas battlefields',
      src: '/images/battlefields.jpeg'
    },
    {
      alt: 'A waterfall in the hills',
      src: '/images/shenandoah.jpeg'
    },
    {
      alt: 'rock formations over water',
      src: '/images/great-falls.jpeg'
    },
    {
      alt: 'West coast beach',
      src: '/images/beach.jpg'
    }
  ],
  'Being a cat dad': [
    {
      alt: 'cat sleeping in my lap',
      src: '/images/cat1.jpeg'
    },
    {
      alt: 'cat sleeping in a blanket',
      src: '/images/cat2.jpeg'
    },
    {
      alt: 'cat sleeping in bed',
      src: '/images/cat3.jpeg'
    },
    {
      alt: 'Cats looking cute',
      src: '/images/cats.jpeg'
    }
  ]
} as const;

interface IAbout {
  top: Record<string, ISong[]>;
}

const About: FC<IAbout> = ({ top }) => (
  <>
    <SEO title="About Me" />
    <Container>
      <div className="max-w-5xl mx-auto">
        <section className="mt-16 mb-16">
          <div className="flex flex-col md:flex-row content-center justify-center w-full">
            <m.div
              transition={{
                delay: 0.5,
                type: 'spring',
                damping: 15,
                stiffness: 100
              }}
              animate={{
                y: [-200, 0],
                opacity: [0, 1]
              }}
              className="flex flex-wrap w-full md:w-1/4 md:mr-8 flex-row md:flex-col content-center justify-center wrap"
            >
              <Image
                alt="meeeee"
                src={profileImage}
                width={300}
                height={300}
                quality={100}
                className={`${styles.intro_image} w-60 md:w-full`}
                placeholder="blur"
              />
            </m.div>
            <div className="shrink w-full md:w-3/4">
              <h2 className="mb-0">Hi there, I'm Trevor Atlas</h2>
              <Balancer ratio={1}>
                <h4 className="mt-0">
                  I'm a tech enthusiast with over a decade of experience
                  building web applications and software.
                </h4>
              </Balancer>
              <p className="faded">
                I am currently employed at{' '}
                <a href="hubpot.com" target="_blank">
                  HubSpot
                </a>
                , where I write applications, infrastructure, tools, and
                services in Typescript and Node.
              </p>
              <p>
                I've worked on everything from local business sites to
                large-scale international SaaS applications, and I'm well-versed
                in both front-end and back-end technologies like React,
                React-Native, Typescript, Rust, Go, Java, and PHP. I also have
                experience with cloud infrastructure, having worked extensively
                in AWS using Lambda, DynamoDB, S3, APIGateway etc. I'm also well
                versed in various CI/CD tools, and Infrastructure As Code
                (primarily through Terraform).
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col-reverse md:flex-row mb-16 md:mb-32">
          <div className="w-full md:w-2/3">
            <h2>Values I live by</h2>
            <Animated>
              <h3>Kindness</h3>
              <p>
                I strongly believe in the value of kindness and that being kind
                to those around you is essential if you want reach your full
                potential. You can be the smartest, most 'correct' software
                engineer in the world, but if you're not kind to the people
                around you, you'll never reach your full potential. More than
                what you say or do, people remember how you make them feel.{' '}
                <em>Be excellent to each other.</em>
              </p>
            </Animated>
            <Animated>
              <h3>Share knowledge</h3>
              <p>
                One of the biggest things that has helped me learn and grow is
                sharing what I know with others. Between blog posts, talks, 1:1s
                and code reviews, I force myself into situations where I have to
                be accountable to those around me to really know my stuff. (Or
                find someone who does)
              </p>
            </Animated>
            <Animated>
              <h3>Collaborate with others</h3>
              <p>
                I firmly believe that when we work together with others, we can
                achieve much greater things than we could on our own.
                Collaboration with others is almost like a super power and I
                firmly believe that those who are most successful lift others up
                and celebrate their successes as a team. We can accomplish so
                much more together than apart.
              </p>
            </Animated>
          </div>
          <m.figure
            className="relative flex w-full md:w-1/3 md:ml-8 content-center justify-center"
            transition={{
              delay: 0.5,
              type: 'spring',
              damping: 15,
              stiffness: 100
            }}
            animate={{
              x: [300, 0],
              opacity: [0, 1]
            }}
          >
            <div
              className="z-10 absolute top-0 left-0 right-0 bottom-0 w-full h-full"
              style={{
                background:
                  'linear-gradient(45deg, rgba(0,25,50,.8), transparent);'
              }}
            />
            <Image
              alt="Dall-e austronaut"
              src={astronaut}
              className={`${styles.values_image} drop-shadow-md`}
              width={750}
              height={750}
              quality={100}
              placeholder="blur"
            />
            <figcaption className="z-10 absolute bottom-3 text-slate-300 text-center">
              Dall-E makes some pretty cool stuff!
            </figcaption>
          </m.figure>
        </section>

        <section>
          <h2 className="text-center pb-8">Some of my hobbies include...</h2>
          <div className="flex flex-col">
            {Object.entries(images).map(([title, images], i) => {
              return (
                <div
                  key={title}
                  className={`${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } flex flex-col md:flex-row mb-4 md:mb-8`}
                >
                  <div className={`flex md:flex-col justify-center md:w-1/5`}>
                    <h3>{title}</h3>
                  </div>
                  <AnimatedImages images={images} />
                </div>
              );
            })}
          </div>
        </section>

        <section className="p-4 max-w-5xl mb-8 md:mb-16">
          <div className="mx-auto bg-gray-900 text-slate-300 p-8 rounded-lg border-gray-800 border-solid border">
            <div className="flex flex-col">
              <div className="flex md:flex-row flex-col">
                <div className="flex justify-center md:w-1/4 w-full mb-8 md:mb-0 md:mr-8">
                  <Image
                    alt="ableton push"
                    src="/images/music.gif"
                    className={`${styles.values_image} w-full`}
                    width={350}
                    height={350}
                    quality={100}
                  />
                </div>
                <div className="flex flex-col justify-center md:w-3/4 mb-8">
                  <h3 className="mt-0">Music &amp; Audio</h3>
                  <p>
                    I've always been fascinated by music and the process of
                    making music. I haven't spent as much time on this as I'd
                    like, so one of my goals for 2023 is to get back into the
                    swing of things
                  </p>
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/98042245&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                  />
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#cccccc',
                      lineBreak: 'anywhere',
                      wordBreak: 'normal',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      fontFamily:
                        'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
                      fontWeight: 100
                    }}
                  >
                    <a
                      href="https://soundcloud.com/ampleheights"
                      title="AmpleHeights"
                      target="_blank"
                      style={{ color: '#cccccc', textDecoration: 'none' }}
                    >
                      AmpleHeights
                    </a>{' '}
                    ·{' '}
                    <a
                      href="https://soundcloud.com/ampleheights/a-remix-or-something"
                      title="Pyramid song remix"
                      target="_blank"
                      style={{ color: '#cccccc', textDecoration: 'none' }}
                    >
                      Pyramid song remix
                    </a>
                  </div>
                </div>
              </div>
              <ul>
                <h3 className="text-center mb-8 text-slate-300">
                  Top songs of the past ~6 months
                </h3>
                {Object.entries(top).map(([key, value]) => (
                  <div key={key}>
                    {value.map((s) => {
                      return (
                        <li
                          key={s.songUrl}
                          className="hover:bg-blue-600 hover:text-blue-200 border-b border-gray-800"
                        >
                          <a
                            className="flex items-center p-4 no-underline"
                            target="_blank"
                            href={s.songUrl}
                            rel="noreferrer noopener nofollow"
                          >
                            <div className="mr-4">
                              <Image
                                alt={s.title}
                                src={s.albumArt}
                                width={48}
                                height={48}
                                quality={100}
                              />
                            </div>
                            <div>
                              <strong className="text-md text-white m-0">
                                {key} - {s.title}
                              </strong>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Container>
  </>
);

export default About;
