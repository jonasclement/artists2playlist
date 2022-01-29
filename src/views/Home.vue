<template>
  <div class="home">
    <h1 class="header">artists2playlist</h1>
    <h2>Create a playlist from a set of artists' Top X songs.</h2>

    <div v-if="hasValidToken" class="logged-in-container">
      <p>
        <span v-if="spotifyUser">Logged in as {{ spotifyUser }}. </span>
        <a href="#" @click="onLogOut()">Log out</a>
      </p>
      <spotify-search class="spotify-search" />
    </div>
    <spotify-button v-else class="spotify-button" />
  </div>
</template>

<script>
import SpotifyButton from "@/components/SpotifyButton";
import SpotifySearch from "@/components/SpotifySearch.vue";
import { deleteToken, getMe, tokenIsExpired } from "@/api/spotify-helper";

export default {
  name: "Home",
  components: { SpotifyButton, SpotifySearch },
  data() {
    return {
      spotifyUser: ""
    };
  },
  computed: {
    hasValidToken() {
      return !tokenIsExpired();
    }
  },
  async mounted() {
    const userData = await getMe();
    this.spotifyUser = userData.display_name ?? userData.id;
  },
  methods: {
    onLogOut() {
      deleteToken();
      window.location.reload();
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/style/variables/colors"
@use "@/style/variables/sizes"

.home
  display: flex
  flex-direction: column
  align-items: center

  h1, h2, p
    color: var(--text-color)

  a
    color: var(--link-color)

  p
    font-size: sizes.$text

  .spotify-button
    margin-bottom: 30px

  .logged-in-container
    display: flex
    flex-direction: column
    justify-content: center
    width: 100%

    .spotify-search
      margin: 0 auto
</style>
