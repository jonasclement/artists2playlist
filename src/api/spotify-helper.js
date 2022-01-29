import SpotifyWebApi from "spotify-web-api-node";

const clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.VUE_APP_SPOTIFY_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({ clientId, redirectUri });

export const AUTH_CODE_KEY = "spotify_auth_code";
const AUTH_CODE_EXPIRES_AT_KEY = "spotify_auth_code_expires_at";
const STATE_KEY = "auth_state";

function createState() {
  const state = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substring(2);

  localStorage.setItem(STATE_KEY, state);

  return state;
}

function getAndForgetState() {
  const state = localStorage.getItem(STATE_KEY);

  if (!state) {
    throw Error("State not set");
  }

  localStorage.removeItem(STATE_KEY);
  return state;
}

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

function setupRequest() {
  const authCode = sessionStorage.getItem(AUTH_CODE_KEY);
  if (!authCode) {
    throw Error("No auth code");
  }

  if (tokenIsExpired()) {
    throw Error("Token expired");
  }

  spotifyApi.setAccessToken(authCode);
}

export async function authorize() {
  window.location.href = createAuthorizeURL();
}

export function spotifyReturn(state, token, expiresIn) {
  const savedState = getAndForgetState();
  if (savedState !== state) {
    throw Error(`State does not match: ${savedState} - ${state}`);
  }

  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + parseInt(expiresIn));

  sessionStorage.setItem(AUTH_CODE_KEY, token);
  sessionStorage.setItem(AUTH_CODE_EXPIRES_AT_KEY, expiry.getTime());
}

export async function searchArtists(artist) {
  setupRequest();
  return spotifyApi.searchArtists(artist);
}

export function tokenIsExpired() {
  const expiry = sessionStorage.getItem(AUTH_CODE_EXPIRES_AT_KEY);
  if (!expiry) {
    return true;
  }

  return new Date().getTime() > expiry;
}
