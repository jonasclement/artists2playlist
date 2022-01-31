<template>
  <button @click="authorize()">
    <spotify-logo role="presentation" />
    Log in with Spotify
  </button>
</template>

<script>
import SpotifyLogo from "@/components/SpotifyLogo.vue";
import { authorize } from "@/api/spotify-helper";

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
@use "@/style/mixins/text"
@use "@/style/mixins/transitions"
@use "@/style/variables/colors"

button
  border: 1px solid var(--spotify-color-border)
  background: var(--spotify-color)
  color: var(--button-text-color)
  height: 50px
  width: 250px
  @include text.text(default)
  @include corners.rounded()
  @include transitions.short()

  &:hover
    border: var(--spotify-color-border-lightened)
    background: var(--spotify-color-ligtened)
</style>
