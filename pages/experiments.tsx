import { IPost } from 'lib/posts';
import Link from 'next/link';
import React, { FC } from 'react';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';

const experiments = [
  {
    link: 'experiments/pathfinding-visualizer',
    title: 'Pathfinding Visualizer',
    image: '/images/experiments/pathfinder.png'
  },
  {
    link: 'experiments/qr-code-api',
    title: 'QR code generator',
    image: '/images/experiments/qr-code.png'
  },
  {
    link: 'experiments/webgl-portal',
    title: 'WEBGL Portal',
    image: '/images/experiments/portal.png'
  }
];

const Experiments: FC<{ posts: IPost[] }> = () => (
  <>
    <SEO
      title="All Posts"
      ogTitle="Experiments | Trevor Atlas"
      ogUrl="https://trevoratlas.com/experiments"
      ogDescription="Experiments in Algorithms, 3d graphics, encryption or whatever else strikes my fancy"
      ogImage="/images/blog.png"
    />
    <Container>
      <div className="max-w-xl mx-auto mt-32">
        <h1 className="">Experiments</h1>
        <p className="text-lg font-semibold mb-8 text-opacity-25">
          Experiments in algorithms, 3d graphics, encryption or whatever else
          strikes my fancy
        </p>

        <div className="text-center grid grid-cols-2 gap-4 mx-auto">
          {experiments.map((e) => (
            <div className="relative max-w-sm min-w-[340px] bg-gray-800 shadow-md rounded p-2 mx-1 my-3">
              <Link href={e.link}>
                <img
                  className="h-40 cursor-pointer rounded w-full object-contain"
                  src={e.image}
                  alt={e.title}
                />
              </Link>
              <div className="mt-4 pl-2 mb-2 flex justify-between ">
                <div>
                  <Link href={e.link}>
                    <a className="text-lg font-semibold mb-0">{e.title}</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </>
);

export default Experiments;
