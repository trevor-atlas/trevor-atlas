import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async (context) => {
  const { URL } = process.env;
  const data = await fetch(`${URL}/api/spotify-albums`);
  const json = await data.json();
  return {
    props: {
      albums: json
    }
  };
};

interface IAlbums {
  albums: { title: string; image: string }[];
}

const Albums: FC<IAlbums> = ({ albums }) => {
  return (
    <>
      <SEO title="Albums" />
      <section className="mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap">
          {albums.map((track) => (
            <div
              key={track.title}
              className="card-zoom flex content-center justify-center w-1/5"
            >
              <img
                className="card-zoom-image w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover"
                alt={track.title}
                src={track.image}
              />
              <strong className="card-zoom-text absolute text-md font-black text-white transition-all duration-500 ease-in-out transform">
                {track.title}
              </strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Albums;
