import { ISong } from 'src/components/now-playing/NowPlaying';
import { getTopTracks } from '../../lib/spotify';

export default async (_, res) => {
  res.setHeader('cache-control', 's-maxage=300');

  try {
    const response = await getTopTracks();
    const { items } = await response.json();

    const result: Record<string, ISong[]> = {};

    for (const track of items) {
      const artist = track.artists.map((_artist) => _artist.name).join(', ');
      const song = {
        artist,
        songUrl: track.external_urls.spotify,
        title: track.name
      };
      if (artist in result) {
        result[artist].push(song);
      } else {
        result[artist] = [song];
      }
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(200).json({});
  }
};
