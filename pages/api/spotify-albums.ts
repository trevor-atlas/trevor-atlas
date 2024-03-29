import type { NextApiRequest, NextApiResponse } from 'next';
import { getTopArtists } from '../../lib/spotify';
import { ONE_DAY } from '../../src/utils/constants';

export interface Albums {
  items?: ItemsEntity[] | null;
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous?: null;
  next?: null;
}
export interface ItemsEntity {
  external_urls: ExternalUrls;
  followers: Followers;
  genres?: string[] | null;
  href: string;
  id: string;
  images?: ImagesEntity[] | null;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface Followers {
  href?: null;
  total: number;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('cache-control', `s-maxage=${ONE_DAY}`);

  try {
    const { items } = await getTopArtists();
    const result: { title: string; image: string }[] = [];
    const seen: Record<string, boolean> = {};

    for (const album of items) {
      const {
        album: { id }
      } = album;
      if (!seen[id]) {
        seen[id] = true;
      } else {
        continue;
      }
      const image = album?.album?.images[0].url;
      const artists = album.artists
        .map(({ name }: { name: string }) => name)
        .join(', ');
      result.push({
        title: `${artists} - ${album?.name}`,
        image
      });
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(200).json({});
  }
};
