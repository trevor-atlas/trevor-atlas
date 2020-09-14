import { getNowPlaying } from 'lib/spotify';

export default async function (_, res) {
	const response = await getNowPlaying();

	if (response.status === 204 || response.status > 400) {
		return res.status(200).json({ isPlaying: false });
	}

	res.setHeader('cache-control', 's-maxage=300');

	try {
		const { item, is_playing } = await response.json();
		const title = item.name;
		const artist = item.artists.map((_artist) => _artist.name).join(', ');
		const album = item.album.name;
		const albumImageUrl = item.album.images[0].url;
		const songUrl = item.external_urls.spotify;

		return res.status(200).json({
			album,
			albumImageUrl,
			artist,
			isPlaying: is_playing,
			songUrl,
			title
		});
	} catch (e) {
		return res.status(200).json({ isPlaying: false });
	}
}
