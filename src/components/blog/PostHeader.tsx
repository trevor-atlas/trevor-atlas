import { css } from '@emotion/css';
import { m, useScroll, useTransform } from 'framer-motion';
import { mq } from 'src/utils/constants';
import { isBrowser } from 'src/utils/helpers';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter } from '../Icons';
import { Tag } from '../tags/Tags';
import Balancer from 'react-wrap-balancer';
import { Blogpost } from 'lib/posts';

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export const ParallaxText = ({ children }: { children: React.ReactNode }) => {
  const scrollMax =
    typeof window !== 'undefined'
      ? window.innerWidth < 768
        ? 650
        : 1000
      : 1000;
  const { scrollYProgress, scrollY } = useScroll();
  const y = useTransform(scrollY, [0, scrollMax], [0, 550]);
  const x = useTransform(scrollY, [0, scrollMax], [0, -100]);
  const scaledY = useTransform(scrollY, [0, scrollMax], [0, -25]);
  const scale = useTransform(scrollY, [0, scrollMax], [1, 0.8]);

  return (
    <m.div
      transition={{
        ease: easeOutExpo
      }}
      style={{
        y,
        scale,
        rotateX: x,
        rotateY: scaledY,
        transformOrigin: 'top center'
      }}
      className={css`
        width: 100%;
        padding: 1rem;
        border-left: 6px solid transparent;
        border-image: linear-gradient(
          to bottom right,
          #b827fc 0%,
          #2c90fc 25%,
          #b8fd33 50%,
          #fec837 75%,
          #fd1892 100%
        );
        border-image-slice: 1;
      `}
    >
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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  return (
    <m.div style={{ scale }} className="w-full h-full absolute">
      {children}
    </m.div>
  );
};
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

const ImageOverlay = () => (
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
);

interface PostHeaderProps extends Blogpost {
  url: string;
}

export function PostHeader({
  title,
  featuredImage,
  description,
  readTime,
  tags,
  date,
  url
}: PostHeaderProps) {
  return (
    <div
      className={css`
        ${mq.desktop} {
          margin-top: 4.5rem;
          max-height: 75vh;
        }
        max-height: 80vh;
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
      <ImageOverlay />
      <div
        className={css`
          margin: 0 auto;
          z-index: 5;
          max-width: 80vw;
          padding: 5rem 1rem;
        `}
      >
        <ParallaxText>
          <Balancer>
            <h1
              className={css`
                text-transform: capitalize;
                margin-bottom: 1.2rem;
                text-shadow: 1px 3px 10px rgba(0, 0, 0, 0.4);
              `}
            >
              {title}
            </h1>
            <p className="text-xl text-shadow-md">{description}</p>
          </Balancer>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              ${mq.desktop} {
                flex-direction: row;
              }
            `}
          >
            <div className="md:mr-8 mb-4">
              <strong className="uppercase tracking-widest text-xs">
                Reading Time
              </strong>
              <div>{readTime}</div>
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
            <strong className="uppercase tracking-widest text-xs">Share</strong>
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
  );
}
