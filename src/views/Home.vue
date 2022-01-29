<template>
  <div class="home">
    <h1 class="header">artists2playlist</h1>
    <h2>Create a playlist from a set of artists' Top X songs.</h2>

    <spotify-button v-if="!hasValidToken" class="spotify-button" />
    <spotify-search v-else />
  </div>
</template>

<script>
import SpotifyButton from "@/components/SpotifyButton";
import SpotifySearch from "@/components/SpotifySearch.vue";
import { tokenIsExpired } from "@/api/spotify-helper";

export default {
  name: "Home",
  components: { SpotifyButton, SpotifySearch },
  computed: {
    hasValidToken() {
      return !tokenIsExpired();
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

  h1, h2
    color: var(--text-color)

  .spotify-button
    margin-bottom: 30px
</style>
