import React, { useEffect } from 'react';

import { Container } from '../../src/components/Container';
import SEO from '../../src/components/Seo';
import { Blogpost, getAllPostIds, getPostData } from '../../lib/posts';
import Comments from 'src/components/blog/Comments';
import MarkdocRoot from 'src/components/MarkdocRoot';
import { PostHeader } from 'src/components/blog/PostHeader';
import { useClipboard } from 'src/hooks/useClipboard';

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  const {
    contentReactAst,
    slug,
    title,
    date,
    featuredImage,
    description,
    readTime,
    tags,
    meta
  } = post;
  const { URL } = process.env;
  return {
    props: {
      baseUrl: URL,
      post: {
        slug,
        title,
        date,
        featuredImage,
        description,
        readTime,
        tags,
        meta,
        contentReactAst: JSON.parse(contentReactAst as string)
      }
    }
  };
}

let addedClickListeners = false;

export default function Post({
  post,
  baseUrl
}: {
  post: Blogpost;
  baseUrl: string;
}) {
  const { slug, title, featuredImage, description, meta } = post;
  useClipboard('.header-hash');

  return (
    <>
      <PostHeader url={`${baseUrl}/blog/${slug}`} {...post} />
      <Container className="post">
        <SEO
          title={title}
          ogTitle={title}
          ogImage={featuredImage}
          ogDescription={description}
          ogUrl={`/posts/${slug}`}
          keywords={meta?.keywords}
        />
        <div
          className="max-w-2xl mx-auto"
          style={{
            scrollPaddingTop: '8rem'
          }}
        >
          <MarkdocRoot ast={post.contentReactAst} />
          <Comments />
        </div>
      </Container>
    </>
  );
}
