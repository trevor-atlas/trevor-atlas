import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { Container } from 'src/components/Container';
import { ISong } from 'src/components/now-playing/NowPlaying';
import SEO from 'src/components/Seo';
import Image from 'next/image';
import styles from '../src/styles/about.module.scss';
import profileImage from '../public/images/lensa-1.jpg';

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

interface IAbout {
  top: Record<string, ISong[]>;
}

const About: FC<IAbout> = ({ top }) => (
  <>
    <SEO title="Home Page" />
    <Container>
      <div className="max-w-5xl mx-auto py-32">
        <section className="py-32 ">
          <div className="flex space-x-8 flex-col md:flex-row">
            <div className="flex mr-4 mb-8 content-center justify-center">
              <Image
                alt="meeeee"
                src={profileImage}
                width={300}
                height={300}
                quality={100}
                className={styles.intro_image}
                placeholder="blur"
              />
            </div>
            <div className="flex-1">
              <h4>
                Hi there, I'm Trevor Atlas,
                <br />a tech enthusiast with over a decade of experience
                building web applications and software.
              </h4>
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
                experience with cloud infrastructure, including AWS, Heroku, and
                various CI/CD tools.
                <br />I strongly value kindness and believe that being kind to
                those around you is essential to reaching your full potential. I
                also enjoy sharing what I know through blog posts, talks, and
                code reviews, and I believe that when working together with
                others, we can achieve great things.
              </p>
            </div>
          </div>
        </section>
        <section className="flex space-x-4 flex-col md:flex-row">
          <div className="flex-1">
            <h2>Values I live by</h2>
            <h3>Kindness</h3>
            <p>
              You can be the smartest, most 'correct' software engineer in the
              world, but if you're not kind to the people around you, you'll
              never reach your full potential and you'll always be playing
              catch-up in life. <em>Be kind.</em>
            </p>
            <h3>Share knowledge</h3>
            <p>
              One of the biggest things that has helped me learn is sharing what
              I know with others. Between blog posts, talks, and code reviews, I
              force myself into situations where I have to be accountable to
              those around me to really know my stuff.
            </p>
            <h3>Collaborate with others</h3>
            <p>
              Collaboration with others is almost like a super power. I firmly
              believe that those who are most successful lift others up and
              celebrate their successes as a team. We can accomplish so much
              more together than apart.
            </p>
          </div>
          <div className="flex-1 flex content-center justify-center">
            <Image
              alt="Trevor in the garden"
              src="/images/about-astronaut.jpeg"
              className={styles.values_image}
              width={750}
              height={750}
              quality={100}
            />
          </div>
        </section>

        <section className="pb-32 max-w-5xl">
          <h2 className="text-center pb-8">Some of my hobbies include...</h2>
          <div className="flex space-x-4 flex-col md:flex-row mb-32">
            <div className="flex-1 flex  justify-center">
              <Image
                alt="ableton push"
                src="/images/music.gif"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="mt-0">Music &amp; Audio</h4>
              <p>
                I've always been fascinated by music and the process of making
                music. I haven't spent as much time on this as I'd like, so one
                of my goals for 2022 is to get back into the swing of things
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

          <div className="flex space-x-4 flex-col md:flex-row mb-32">
            <div className="flex-1 flex flex-col justify-center">
              <h4>Digital Art</h4>
              <p>
                Learning to draw and blend colors has been a fun way to learn
                something new
              </p>
            </div>
            <div className="flex-1 flex  justify-center">
              <Image
                alt="A red car"
                src="/images/car.jpg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex  justify-center">
              <Image
                alt="pikachu"
                src="/images/pika.jpg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex  justify-center">
              <Image
                alt="fractal shapes"
                src="/images/fractal.png"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex  justify-center">
              <Image
                alt="pulp fiction"
                src="/images/wallace.jpg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
          </div>

          <div className="flex space-x-4 flex-col md:flex-row mb-32">
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="Manassas battlefields"
                src="/images/battlefields.jpeg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="A waterfall in the hills"
                src="/images/shenandoah.jpeg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="rock formations over water"
                src="/images/great-falls.jpeg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="West coast beach"
                src="/images/beach.jpg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex  justify-center">
              <h4>Hiking &amp; being outdoors</h4>
            </div>
          </div>

          <div className="flex space-x-4 flex-col md:flex-row">
            <div className="flex-1 flex  justify-center">
              <h4>Being a cat dad</h4>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="cat sleeping in my lap"
                src="/images/cat1.jpeg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="cat sleeping in a blanket"
                src="/images/cat2.jpeg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="cat sleeping in bed"
                src="/images/cat3.jpeg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Image
                alt="Cats looking cute"
                src="/images/cats.jpeg"
                className={styles.values_image}
                width={350}
                height={350}
                quality={100}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto bg-gray-900 p-8 rounded-lg border-gray-800 border-solid border">
          <ul>
            <h2 className="text-center mb-8 text-slate-400">
              Top songs of the past ~6 months
            </h2>
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
        </section>
      </div>
    </Container>
  </>
);

export default About;
