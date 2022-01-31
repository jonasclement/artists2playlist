import SpotifyWebApi from "spotify-web-api-node";

const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.VUE_APP_SPOTIFY_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({ clientId, redirectUri });

const ACCESS_TOKEN_KEY = "spotify_token";
const ACCESS_TOKEN_EXPIRES_AT_KEY = "spotify_token_expires_at";
const STATE_KEY = "auth_state";

/**
 * Create state for OAuth flow
 *
 * @returns {string}
 */
function createState() {
  const state = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substring(2);

  localStorage.setItem(STATE_KEY, state);

  return state;
}

/**
 * Get saved state for OAuth flow validation
 *
 * @returns {string}
 */
function getAndForgetState() {
  const state = localStorage.getItem(STATE_KEY);

  if (!state) {
    throw Error("State not set");
  }

  localStorage.removeItem(STATE_KEY);
  return state;
}

/**
 * Despite the documentation implying so, the Spotify node lib does NOT support the implicit grant flow auth.
 * This function handles it instead.
 *
 * @returns {string}
 */
function createAuthorizeURL() {
  const scopes = ["playlist-modify-public", "user-read-private"];
  const state = createState();

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += `&client_id=${encodeURIComponent(clientId)}`;
  url += `&scope=${encodeURIComponent(scopes.join(" "))}`;
  url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;
  url += `&state=${encodeURIComponent(state)}`;

  return url;
}

/**
 * Check whether or not our token is valid
 *
 * @returns {bool}
 */
export function tokenIsExpired() {
  const expiry = sessionStorage.getItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
  if (!expiry) {
    return true;
  }

  return new Date().getTime() > expiry;
}

export function deleteToken() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT_KEY);
}

/**
 * Set the Spotify API client up for our request, and validate the token.
 */
function setupRequest() {
  const authCode = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if (!authCode) {
    throw Error("No auth code");
  }

  if (tokenIsExpired()) {
    throw Error("Token expired");
  }

  spotifyApi.setAccessToken(authCode);
}

/**
 * Open Spotify authorization window
 */
export async function authorize() {
  window.location.href = createAuthorizeURL();
}

/**
 * Handle Spotify auth callback
 *
 * @param {string} state
 * @param {string} token
 * @param {number} expiresIn
 */
export function spotifyReturn(state, token, expiresIn) {
  const savedState = getAndForgetState();
  if (savedState !== state) {
    throw Error(`State does not match: ${savedState} - ${state}`);
  }

  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + parseInt(expiresIn));

  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  sessionStorage.setItem(ACCESS_TOKEN_EXPIRES_AT_KEY, expiry.getTime());
}

/**
 * Get the logged-in user
 *
 * @returns {SpotifyApi.CurrentUsersProfileResponse}
 */
export async function getMe() {
  setupRequest();
  return (await spotifyApi.getMe()).body;
}

/**
 * Get the artist's top tracks
 *
 * @param {string} artistId
 * @param {string} country ISO-3166-1 alpha-2 format
 * @returns {Promise<SpotifyApi.ArtistsTopTracksResponse>}
 */
export async function getArtistTopTracks(artistId, country = "DK") {
  setupRequest();
  return (await spotifyApi.getArtistTopTracks(artistId, country)).body.tracks;
}

/**
 * Search for artists
 *
 * @param {string} artist
 * @returns {Promise<SpotifyApi.SearchResponse>}
 */
export async function searchArtists(artist) {
  setupRequest();
  return (await spotifyApi.searchArtists(artist)).body.artists.items;
}

export async function createPlaylist(name, artists, tracksPerArtist, shuffle) {
  setupRequest();

  // Fetch top tracks for all artists
  let tracks = (
    await Promise.all(
      artists.map(async (artist) => {
        const topTracks = await getArtistTopTracks(artist.id);
        return topTracks.slice(0, tracksPerArtist).map((track) => track.uri);
      })
    )
  ).flat();

  if (shuffle) {
    tracks = tracks.sort(() => Math.random() - 0.5);
  }

  const playlistId = (
    await spotifyApi.createPlaylist(name, {
      description: "Created with artists2playlist",
      collaborative: false,
      public: true
    })
  ).body.id;

  return spotifyApi.addTracksToPlaylist(playlistId, tracks);
}
