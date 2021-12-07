import { ISong } from 'src/components/now-playing/NowPlaying';
import { getTopTracks } from '../../lib/spotify';

const ONE_DAY = '86400000';
export default async (_, res) => {
  res.setHeader('cache-control', `s-maxage=${ONE_DAY}`);

  try {
    const response = await getTopTracks();
    const { items } = await response.json();

    const result: Record<string, ISong[]> = {};

    for (const track of items) {
      const image = track.album?.images?.pop();
      const artist = track.artists.map((_artist) => _artist.name).join(', ');
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
    return res.status(200).json({});
  }
};
