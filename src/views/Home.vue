<template>
  <div class="home">
    <h1 class="header">artists2playlist</h1>
    <p class="tagline">Create a playlist from a set of artists' Top X songs.</p>

    <div v-if="hasValidToken" class="logged-in-container">
      <p>
        <span v-if="spotifyUser">Logged in as {{ spotifyUser }}. </span>
        <a href="#" @click="onLogOut()">Log out</a>
      </p>

      <content-divider variant="horizontal" />

      <playlist-wizard />
    </div>
    <spotify-button v-else class="spotify-button" />
  </div>
</template>

<script>
import ContentDivider from "@/components/ContentDivider";
import PlaylistWizard from "@/components/PlaylistWizard.vue";
import SpotifyButton from "@/components/SpotifyButton";
import { deleteToken, getMe, tokenIsExpired } from "@/api/spotify-helper";

export default {
  name: "Home",
  components: { ContentDivider, PlaylistWizard, SpotifyButton },
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
@use "@/style/mixins/media"
@use "@/style/mixins/text"
@use "@/style/variables/colors"

.home
  display: flex
  flex-direction: column
  align-items: center

  h1, h2, h3, p
    color: var(--text-color)

  a
    color: var(--link-color)

  p
    @include text.text(default)

    &.tagline
      @include text.text(xl)

  .logged-in-container
    display: flex
    flex-direction: column
    justify-content: center
    width: 100%
</style>
