import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { Container } from 'src/components/Container';
import { ISong } from 'src/components/now-playing/NowPlaying';
import SEO from 'src/components/Seo';
import Image from 'next/image';
import styles from '../src/styles/about.module.scss';

const SolarSystem = dynamic(
  () =>
    import('src/components/three-fibers/SolarSystem').then(
      (mod) => mod.SolarSystem
    ),
  {
    ssr: false
  }
);

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch(`https://trevoratlas.com/api/spotify-top`);
  const json = await data.json();
  return {
    props: {
      top: json
    }
  };
};

interface IAbout {
  top: Record<string, ISong[]>;
}

const About: FC<IAbout> = ({ top }) => (
  <>
    <SEO title="Home Page" />
    <Container>
      <div className="mx-auto py-32">
        <div className="flex space-x-8 flex-col md:flex-row">
          <div className="flex mr-4 mb-8 content-center justify-center">
            <Image
              alt="meeeee"
              src="/images/portrait-bw.png"
              width={300}
              height={300}
              quality={100}
              className={styles.intro_image}
            />
          </div>
          <div className="flex-1">
            <h1>
              Hi, I'm Trevor Atlas,
              <br />
              I'm a Software developer and technology enthusiast.
            </h1>
            <p className="faded">
              I am currently employed at iFIT, where I write mobile
              applications, infrastructure, tools, and services in typescript
              and node.
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 flex-col md:flex-row">
        <div className="flex-1 ">
          <h2>Values I live by</h2>
          <h3>Kindness</h3>
          <p>
            You can be the smartest, most 'correct' software engineer in the
            world, but if you're not kind to the people around you, you'll never
            reach your full potential and you'll always be playing catch-up in
            life. <em>Be kind.</em>
          </p>
          <h3>Share knowledge</h3>
          <p>
            One of the biggest things that has helped me learn is sharing what I
            know with others. Between blog posts, talks, and code reviews, I
            force myself into situations where I have to be accountable to those
            around me to really know my stuff.
          </p>
          <h3>Collaborate with others</h3>
          <p>
            Collaboration with others is almost like a super power. I firmly
            believe that those who are most successful lift others up and
            celebrate their successes as a team. We can accomplish so much more
            together than apart.
          </p>
        </div>
        <div className="flex-1 flex content-center justify-center">
          <Image
            alt="Mountains"
            src="/images/greenery.jpeg"
            className={styles.values_image}
            objectFit="cover"
            width={400}
            height={600}
            quality={100}
            placeholder="blur"
            blurDataURL="LJFYiD?GNEIUTw-;VrV?~URQWDbb"
          />
        </div>
      </div>
      <div className="py-32">
        <SolarSystem />
      </div>
      <h4 className="text-center">Top songs of the past ~6 months</h4>
      <ul className="text-center grid grid-cols-2 gap-4 mx-auto">
        {top &&
          Object.keys(top).map((e, i) => (
            <div key={e}>
              <strong>{e}</strong>
              {top[e].map((s) => (
                <li key={s.songUrl}>
                  <a
                    className="cultured-60"
                    href={s.songUrl}
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </div>
          ))}
      </ul>
    </Container>
  </>
);

export default React.memo(About);
