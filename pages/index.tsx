import React, { FC } from 'react';
import Bio from '../src/components/Bio';
import { Container } from '../src/components/Container';
import SEO from '../src/components/Seo';
import { getSortedPostsData, Blogpost } from '../lib/posts';
import { PostPreviewCard } from 'src/components/post-preview-card/PostPreviewCard';

export async function getStaticProps() {
  const data = await getSortedPostsData();

  return {
    props: {
      posts: data.slice(0, 5)
    }
  };
}

interface IHomeProps {
  posts: Blogpost[];
}

const Home: FC<IHomeProps> = ({ posts = [] }) => (
  <>
    <SEO title="Home Page" />
    <Container className="mt-32">
      <Bio key="bio" />
      <div className="mx-auto py-4">
        <h2 className="text-center mb-4">Latest Posts</h2>
        <div className="flex flex-col max-w-lg mx-auto">
          {posts.map((post) => (
            <PostPreviewCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </Container>
  </>
);

export default Home;
