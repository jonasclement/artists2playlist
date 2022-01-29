<template>
  <div class="home">
    <h1 class="header">artists2playlist</h1>
    <p class="tagline">Create a playlist from a set of artists' Top X songs.</p>

    <spotify-button />
  </div>
</template>

<script>
import SpotifyButton from "@/components/SpotifyButton";

export default {
  name: "Home",
  components: { SpotifyButton }
};
</script>

<style lang="sass" scoped>
@use "@/style/variables/sizes"

.home
  .tagline
    font-size: sizes.$text-xl
</style>
