import React, { FC, useEffect, useState } from 'react';
import { getSortedPostsData, Blogpost } from 'lib/posts';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';
import { PostPreviewCard } from 'src/components/post-preview-card/PostPreviewCard';
import { Tag } from 'src/components/tags/Tags';
import { Button } from 'src/components/button/Button';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const posts = await getSortedPostsData();
  const tags = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, [] as string[]);

  return {
    props: {
      posts,
      tags
    }
  };
}

const Blog: FC<{ posts: Blogpost[]; tags: string[] }> = ({ posts, tags }) => {
  const [filteredPosts, setFilteredPosts] = useState<Blogpost[]>(posts);
  const router = useRouter();

  const setFilterTags = (tag?: string) => {
    const newState = {
      query: { ...router.query }
    };
    if (tag && typeof tag === 'string') {
      newState.query.filterTags = tag;
    }
    router.replace(newState);
  };

  const filterPosts = () => {
    if (!router.query.filterTags) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) =>
          post.tags.includes(router.query.filterTags as string)
        )
      );
    }
  };

  useEffect(() => {
    filterPosts();
  }, [router.query.filterTags]);

  useEffect(() => {
    if (router.query.filterTags) {
      filterPosts();
    }
  }, []);

  return (
    <>
      <SEO
        title="All Posts"
        ogTitle="Blog | Trevor Atlas"
        ogUrl="https://trevoratlas.com/blog"
        ogDescription="Tutorials, musings and random information from the tech world."
        ogImage="/images/blog.png"
      />
      <Container>
        <div className="max-w-xl mx-auto mt-32">
          <h1 className="mb-16">Blog</h1>
          <div className="p-4 flex flex-row justify-between items-center">
            <span>
              {tags.map((name) => (
                <div
                  key={name}
                  className="inline-block cursor-pointer"
                  onClick={() => setFilterTags(name)}
                >
                  <Tag name={name} />
                </div>
              ))}
            </span>
            <Button
              text="Clear Filter"
              className="inline-block cursor-pointer"
              onClick={setFilterTags}
            />
          </div>
          {filteredPosts.map((post) => (
            <PostPreviewCard key={post.slug} {...post} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Blog;
