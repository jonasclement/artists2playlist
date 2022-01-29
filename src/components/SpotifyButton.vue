<template>
  <button @click="authorize()">
    <spotify-logo role="presentation" />
    Log in with Spotify
  </button>
</template>

<script>
import SpotifyLogo from "@/components/SpotifyLogo.vue";
import { authorize } from "@/api/spotify-api";

export default {
  name: "SpotifyButton",
  components: { SpotifyLogo },
  methods: {
    authorize
  }
};
</script>

<style lang="sass" scoped>
@use "@/style/mixins/corners"
@use "@/style/mixins/transitions"
@use "@/style/variables/sizes"
@use "@/style/variables/colors"

button
  border: 1px solid var(--spotify-color-border)
  background: var(--spotify-color)
  color: white
  height: 50px
  width: 250px
  font-size: sizes.$text
  @include corners.rounded()
  @include transitions.short()

  &:hover
    border: var(--spotify-color-border-lightened)
    background: var(--spotify-color-ligtened)
</style>
