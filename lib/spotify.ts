import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_ALBUMS_ENDPOINT =
  'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50';
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getTopArtists = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(`${TOP_ALBUMS_ENDPOINT}&offset=0`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const artists = await response.json();
    console.log(artists.items[0].artists);

    return artists;
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(`${TOP_TRACKS_ENDPOINT}?limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
