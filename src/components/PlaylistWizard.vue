<template>
  <div class="playlist-wizard">
    <div v-if="currentStep === STEP_ARTISTS" id="step-1">
      <h2>1. Start by adding the artists you'd like!</h2>
      <spotify-search
        class="spotify-search"
        :filter-artists="selectedArtists"
        @select-artist="onSelectArtist($event)"
      />
      <h3>Selected artists:</h3>
      <div class="artist-cards">
        <artist-card
          v-for="artist in selectedArtists"
          :key="artist.id"
          class="card"
          :artist-id="artist.id"
          :name="artist.name"
          :image-src="artist.image"
          @delete-click="onDeleteArtist(artist)"
        />
      </div>
      <button
        class="wizard-button"
        :disabled="!selectedArtists.length"
        @click="currentStep = STEP_PLAYLIST_DATA"
      >
        Continue
      </button>
    </div>
    <div v-if="currentStep === STEP_PLAYLIST_DATA" id="step-2">
      <button class="wizard-button" @click="currentStep = STEP_ARTISTS">Back</button>
    </div>
  </div>
</template>

<script>
import ArtistCard from "@/components/ArtistCard.vue";
import SpotifySearch from "@/components/SpotifySearch";

const STEP_ARTISTS = 0;
const STEP_PLAYLIST_DATA = 1;

export default {
  name: "PlaylistWizard",
  components: { ArtistCard, SpotifySearch },
  data() {
    return {
      currentStep: STEP_ARTISTS,
      selectedArtists: [],
      STEP_ARTISTS,
      STEP_PLAYLIST_DATA
    };
  },
  methods: {
    onSelectArtist(artist) {
      this.selectedArtists.push(artist);
    },
    onDeleteArtist(artist) {
      this.selectedArtists = this.selectedArtists.filter((a) => a.id !== artist.id);
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/style/mixins/corners"
@use "@/style/mixins/media"
@use "@/style/mixins/text"
@use "@/style/mixins/transitions"
@use "@/style/variables/colors"

.playlist-wizard
  h1, h2, h3, p
    color: var(--text-color)

  a
    color: var(--link-color)

  p
    @include text.text(default)

  .wizard-button
    height: 70px
    width: 33%
    margin-top: 20px
    border: 1px solid var(--spotify-color-border)
    background: var(--spotify-color)
    color: var(--button-text-color)
    @include text.text(xl)
    @include corners.rounded()
    @include transitions.short(background)

    &:disabled
      cursor: not-allowed
      transition: none
      opacity: 50%

    &:hover:not(:disabled)
      border: var(--spotify-color-border-lightened)
      background: var(--spotify-color-ligtened)

  #step-1
    .spotify-search
      margin: 0 auto

    .artist-cards
      display: flex
      flex-direction: column
      flex-wrap: wrap
      justify-content: space-between

      @include media.breakpoint-up(md)
        flex-direction: row
        width: 100%
        gap: 2%


      .card
        width: 94%
        margin-bottom: 15px

        @include media.breakpoint-up(md)
          max-width: 46%
</style>
