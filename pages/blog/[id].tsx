import React, { useEffect } from 'react';
import { Container } from '../../src/components/Container';
import SEO from '../../src/components/Seo';
import { Blogpost, getAllPostIds, getPostData } from '../../lib/posts';
import Comments from 'src/components/blog/Comments';

import MarkdocRoot from 'src/components/MarkdocRoot';
import { css } from '@emotion/css';
import Balancer from 'react-wrap-balancer';
import { m, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { isBrowser } from 'src/utils/helpers';
import { Tag } from 'src/components/tags/Tags';
import { Facebook, Linkedin, Twitter } from 'src/components/Icons';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export const ParallaxText = ({
  children,
  range
}: {
  range: [number, number];
  children: React.ReactNode;
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], range);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <m.div style={{ y, scale }} className="w-full">
      {children}
    </m.div>
  );
};

export const Parallax = ({
  children,
  range
}: {
  range: [number, number];
  children: React.ReactNode;
}) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);

  return (
    <m.div style={{ scale }} className="w-full h-full">
      {children}
    </m.div>
  );
};

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
    tags
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
        contentReactAst: JSON.parse(contentReactAst as string)
      }
    }
  };
}

let addedClickListeners = false;

function useSetupCopyToClipboard() {
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
}

const getParallaxRange = (): [number, number] => {
  if (isBrowser) {
    const width = window.innerWidth;
    if (width >= 1920) {
      return [0, 350];
    } else if (width >= 1280) {
      return [0, 600];
    } else if (width >= 768) {
      return [0, 500];
    } else {
      return [0, 1300];
    }
  }
  return [0, 0];
};

export default function Post({
  post,
  baseUrl
}: {
  post: Blogpost;
  baseUrl: string;
}) {
  const {
    slug,
    title,
    date,
    featuredImage,
    description,
    readTime,
    tags = []
  } = post;
  useSetupCopyToClipboard();
  const url = `${baseUrl}/blog/${slug}`;

  return (
    <>
      <div
        className={css`
          @media (min-width: 768px) {
            margin-top: 4.5rem;
          }
          max-height: 45vh;
          background: #111;
          margin-bottom: 3.2rem;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.9);
          position: relative;
          z-index: 1;
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
              45deg,
              rgba(0, 78, 146, 0.3),
              rgba(38, 208, 206, 0.3)
            );
            -webkit-backdrop-filter: blur(15px);
            backdrop-filter: blur(15px);

            z-index: 1;
          `}
        />
        <div
          className={css`
            position: absolute;
            margin: 0 auto;
            z-index: 5;
            min-width: 350px;
            @media (max-width: 768px) {
              max-width: 100%;
            }
            max-width: 40vw;
          `}
        >
          <ParallaxText range={[0, 850]}>
            <Balancer ratio={1}>
              <h1
                className={css`
                  text-transform: capitalize;
                  margin-bottom: 1.6rem;
                `}
              >
                {title}
              </h1>
              <p className="text-xl">{description}</p>
            </Balancer>
            <div
              className={css`
                display: flex;
                flex-direction: column;
                @media (min-width: 768px) {
                  flex-direction: row;
                }
              `}
            >
              <div className="md:mr-8 mb-4">
                <strong className="uppercase tracking-widest text-xs">
                  Reading Time
                </strong>
                <div>
                  {readTime.text} (~{readTime.words} words)
                </div>
              </div>

              <div className="md:mr-8 mb-4">
                <strong className="uppercase tracking-widest text-xs">
                  Tags
                </strong>
                <div>
                  {tags.map((name) => (
                    <div key={name} className="inline-block cursor-pointer">
                      <Tag name={name} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:mr-8 mb-4">
                <strong className="uppercase tracking-widest text-xs">
                  Date
                </strong>
                <div>{new Date(date).toLocaleDateString('en-US', {})}</div>
              </div>
            </div>
            <div className="">
              <strong className="uppercase tracking-widest text-xs">
                Share
              </strong>
              <div className="flex md:text-xl text-3xl">
                <a
                  className="mr-3"
                  href={`https://twitter.com/intent/tweet?url=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter />
                </a>
                <a
                  className="mr-3"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook />
                </a>
                <a
                  className="mr-3"
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </ParallaxText>
        </div>
        <Parallax range={getParallaxRange()}>
          <Image
            width={1920}
            height={1080}
            className={css`
              margin: 0 auto;
              max-width: 1920px;
              width: 100%;
              object-fit: cover;
              object-position: center;
            `}
            src={featuredImage}
            alt={title}
          />
        </Parallax>
      </div>
      <Container className="post">
        <SEO
          title={title}
          ogTitle={title}
          ogImage={featuredImage}
          ogDescription={description}
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
