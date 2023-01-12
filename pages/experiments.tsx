import { Blogpost } from 'lib/posts';
import Link from 'next/link';
import React, { FC } from 'react';
import { Card } from 'src/components/Card';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';

const experiments = [
  {
    link: 'experiments/pathfinding-visualizer',
    title: 'Pathfinding Visualizer',
    image: '/images/experiments/pathfinder.png',
    description: "Visualize Djikstra's pathfinding algorithm"
  },
  {
    link: 'experiments/qr-code-api',
    title: 'QR code generator',
    image: '/images/experiments/qr-code.png',
    description:
      'Generate QR codes for anything, including your Wifi connection!'
  },
  {
    link: 'experiments/webgl-portal',
    title: 'WEBGL Portal',
    image: '/images/experiments/portal.png',
    description:
      'A portal effect using WebGL and a custom shader. Inspired by the Portal game and Blackbody radiation'
  }
];

const Experiments: FC<{ posts: Blogpost[] }> = () => (
  <>
    <SEO
      title="All Posts"
      ogTitle="Experiments | Trevor Atlas"
      ogUrl="https://trevoratlas.com/experiments"
      ogDescription="Experiments in Algorithms, 3d graphics, encryption or whatever else strikes my fancy"
      ogImage="/images/blog.png"
    />
    <Container>
      <div className="max-w-4xl mx-auto mt-32">
        <h1 className="">Experiments</h1>
        <p className="text-lg font-semibold mb-8 text-opacity-25">
          Experiments in algorithms, 3d graphics, encryption or whatever else
          strikes my fancy
        </p>
        <div className="text-center grid grid-cols-2 gap-4 mx-auto">
          {experiments.map((e) => (
            <Card
              key={e.link}
              label="Experiment"
              title={e.title}
              description={e.description}
              imageUrl={e.image}
              url={e.link}
            />
          ))}
        </div>
      </div>
    </Container>
  </>
);

export default Experiments;
