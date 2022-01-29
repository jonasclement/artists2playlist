<template>
  <button @click="onClick()">
    <spotify-logo role="presentation" />
    Log in with Spotify
  </button>
</template>

<script>
import SpotifyLogo from "@/components/SpotifyLogo.vue";

export default {
  name: "SpotifyButton",
  components: { SpotifyLogo }
};
</script>

<style lang="sass" scoped>
@use "@/style/mixins/corners"
@use "@/style/mixins/transitions"
@use "@/style/variables/sizes"

$spotify-color: #5cb85c
$border-color: darken($spotify-color, 10%)

button
  border: 1px solid $border-color
  background: $spotify-color
  color: white
  height: 50px
  width: 250px
  font-size: sizes.$text
  @include corners.rounded()
  @include transitions.short()

  &:hover
    border: lighten($border-color, 5%)
    background: lighten($spotify-color, 5%)
</style>
