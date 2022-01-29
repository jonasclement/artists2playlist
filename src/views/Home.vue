<template>
  <div class="home">
    <h1 class="header">artists2playlist</h1>
    <h2>Create a playlist from a set of artists' Top X songs.</h2>

    <spotify-search />

    <spotify-button />

    <h2 class="without-login">... or continue without login</h2>
    <p>
      You can use this application without logging in, however, it will only be able to make a list
      of links for you to copy/paste into your Spotify client (desktop only)
    </p>
  </div>
</template>

<script>
import SpotifyButton from "@/components/SpotifyButton";
import SpotifySearch from "@/components/SpotifySearch.vue";

export default {
  name: "Home",
  components: { SpotifyButton, SpotifySearch }
};
</script>

<style lang="sass" scoped>
@use "@/style/variables/sizes"

.home
  display: flex
  flex-direction: column
  align-items: center

  h2
    font-size: sizes.$text-xl

    &.without-login
      margin-top: 30px

  p
    font-size: sizes.$text
</style>
