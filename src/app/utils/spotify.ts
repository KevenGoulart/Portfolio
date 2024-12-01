import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    cache: 'no-cache',
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  console.log(response)
  return response.json();
}

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5`;
const CURRENTLY_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export const fetchTopTracks = async () => {
  const { access_token } = await getAccessToken();

  const topTracks = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((data) => data.json())
    .catch((e) => console.log(e));

    console.log(topTracks)
  return topTracks;
};

export const fetchCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();

  const currentTrack = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((data) => data.json())
    .catch((e) => console.log(e));

  return currentTrack;
};

export async function getTopTracks() {
  try {
    const {items} = await fetchTopTracks();

    const tracks = items?.map((track, index) => ({
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      songUrl: track.external_urls.spotify,
      title: track.name,
      key: index + 1,
      albumCover: track.album.images[0],
    }));
    return tracks;
  } catch (e) {
    console.log(e);
  }
}

export async function getCurrentlyPlaying() {
  try {
    const currentTrack = await fetchCurrentlyPlaying();
    if (currentTrack?.item) {
      const track = {
        artist: currentTrack.item.artists.map((_artist) => _artist.name).join(", "),
        songUrl: currentTrack.item.external_urls.spotify,
        title: currentTrack.item.name,
        albumCover: currentTrack.item.album.images[0],
      };
      return track;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}