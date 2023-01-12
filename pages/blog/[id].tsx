import React, { useEffect } from 'react';
import { Container } from '../../src/components/Container';
import SEO from '../../src/components/Seo';
import { HumanDate } from '../../src/components/HumanDate';
import { Blogpost, getAllPostIds, getPostData } from '../../lib/posts';
import Comments from 'src/components/blog/Comments';

// import { MarkdocRoot } from 'src/components/MarkdocRoot';
import { css } from '@emotion/css';
import Balancer from 'react-wrap-balancer';

import dynamic from 'next/dynamic';

const MarkdocRoot = dynamic(() => import('src/components/MarkdocRoot'), {
  ssr: false
});

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
    excerpt,
    readTime
  } = post;
  return {
    props: {
      post: {
        slug,
        title,
        date,
        featuredImage,
        excerpt,
        readTime,
        contentReactAst: JSON.parse(contentReactAst as string)
      }
    }
  };
}
let addedClickListeners = false;

export default function Post({ post }: { post: Blogpost }) {
  const { slug, title, date, featuredImage, excerpt, readTime } = post;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length > 0) {
      window.location.hash = '';
      window.location.hash = hash;
    }
  });

  useEffect(() => {
    if (addedClickListeners) {
      return;
    }
    document.querySelectorAll('.header-hash').forEach((el) => {
      el.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
      });
    });
    addedClickListeners = true;
  }, []);

  return (
    <>
      <div
        className={css`
          margin-top: 2.2rem;
          margin-bottom: 3.2rem;
          width: 100%;
          height: 450px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
          position: relative;
          z-index: 1;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.2);
            background: linear-gradient(
              to bottom-right,
              rgba(0, 78, 146, 0.3),
              rgba(38, 208, 206, 0.3)
            );

            z-index: 1;
          `}
        />
        <div
          className={css`
            position: absolute;
            margin: 0 auto;
            z-index: 5;
          `}
        >
          <div className={css``}>
            <h1
              className={css`
                text-transform: capitalize;
              `}
            >
              <Balancer ratio={1}>{title}</Balancer>
            </h1>
            <span>
              {readTime.text} (~{readTime.words} words)
            </span>
          </div>
        </div>
        <img
          className={css`
            width: 100%;
            object-fit: cover;
            object-position: center;
          `}
          src={featuredImage}
          alt={title}
        />
      </div>
      <Container className="post">
        <SEO
          title={title}
          ogTitle={title}
          ogImage={featuredImage}
          ogDescription={excerpt}
          ogUrl={`/posts/${slug}`}
        />
        <div className="max-w-2xl mx-auto">
          <MarkdocRoot ast={post.contentReactAst} />
          <Comments />
        </div>
      </Container>
    </>
  );
}
