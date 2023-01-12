import type { NextApiRequest, NextApiResponse } from 'next'
import { ISong } from 'src/components/now-playing/NowPlaying';
import { getTopTracks } from '../../lib/spotify';
import { ONE_DAY } from '../../src/utils/constants';

interface Artist {
  name: string;
}
type Response = Record<string, ISong[]>
export default async (_: NextApiRequest, res: NextApiResponse<Response>) => {
  res.setHeader('cache-control', `s-maxage=${ONE_DAY}`);

  try {
    const response = await getTopTracks();
    const { items } = await response.json();

    const result: Response = {};

    for (const track of items) {
      const image = track.album?.images?.pop();
      const artist = track.artists.map((a: Artist) => a.name).join(', ');
      const song = {
        artist,
        songUrl: track.external_urls.spotify,
        title: track.name,
        albumArt: image.url,
      };
      if (artist in result) {
        result[artist].push(song);
      } else {
        result[artist] = [song];
      }
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({});
  }
};
