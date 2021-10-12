import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { FC } from 'react';
import { HumanDate } from 'src/components/HumanDate';
import { Projects } from 'src/components/Projects';
import { RaycastHeader } from 'src/components/RaycastHeader';
import styles from 'src/components/three-fibers/solar-system.module.scss';
import Bio from '../src/components/Bio';
import { Container } from '../src/components/Container';
import SEO from '../src/components/Seo';
import { getSortedPostsData, IPost } from '../lib/posts';

const SolarSystem = dynamic(
  () =>
    import('src/components/three-fibers/SolarSystem').then(
      (mod) => mod.SolarSystem
    ),
  {
    ssr: false
  }
);

export async function getStaticProps() {
  const data = await getSortedPostsData();

  return {
    props: {
      posts: data.slice(0, 3)
    }
  };
}

interface IHomeProps {
  posts: IPost[];
}

const Home: FC<IHomeProps> = ({ posts }) => (
  <>
    <SEO title="Home Page" />
    <Bio key="bio" />
    <RaycastHeader />
    <Container>
      <div className="mx-auto py-4">
        <h2 className="text-center mb-4">Latest Posts</h2>
        <div className="flex flex-col max-w-lg mx-auto">
          {posts.map((post) => (
            <div className="mb-4" key={post.id}>
              <h4 className="mb-0">{post.title}</h4>
              <div className="flex flex-row justify-between mt-2 mx-0">
                <small className="muted">
                  <HumanDate date={post.date} />
                </small>
                <br />
                <small className="muted">{post.readTime.text}</small>
              </div>
              <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                <a className="underline inline-block" href="">
                  Read article
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </>
);

export default Home;
