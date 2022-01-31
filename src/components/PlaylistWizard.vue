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
      <div class="form-container">
        <form action="#">
          <label>
            Name your playlist:
            <input v-model="playlistName" type="text" placeholder="My awesome playlist" />
          </label>
          <label>
            How many tracks per artist? (1-10)
            <input v-model="tracksPerArtist" type="number" placeholder="5" />
          </label>
          <label>
            Shuffle the tracks?
            <input v-model="shuffleTracks" type="checkbox" />
          </label>
        </form>
      </div>
      <button class="wizard-button" type="submit" @click="onSubmit()">Create playlist</button>
      <button class="wizard-button wizard-button--gray" @click="currentStep = STEP_ARTISTS">
        Back
      </button>
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
      playlistName: "artists2playlist Playlist",
      selectedArtists: [],
      shuffleTracks: false,
      tracksPerArtist: 5,
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
  h2, h3
    color: var(--text-color)

  a
    color: var(--link-color)

  p, label, input
    @include text.text(default)

  .wizard-button
    display: block
    margin: 0 auto
    height: 70px
    width: 33%
    margin-top: 20px
    border: 1px solid var(--spotify-color-border)
    background: var(--spotify-color)
    @include text.text(xl)
    @include corners.rounded()
    @include transitions.short(background)
    color: var(--button-text-color)

    &--gray
      $bg-color: #aaa
      border-color: darken($bg-color, 10%)
      background: $bg-color

      &:hover
        border-color: darken($bg-color, 20%) !important
        background: darken($bg-color, 10%) !important

    &:disabled
      cursor: not-allowed
      transition: none
      opacity: 50%

    &:hover:not(:disabled)
      border-color: var(--spotify-color-border-lightened)
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

  #step-2
    label
      display: flex
      flex-direction: column
      margin: 10px 0 0 0

      @include media.breakpoint-up(md)
        flex-direction: row
        justify-content: flex-end
        align-items: center
        width: 83%
        margin: 0 0 10px 0

      input
        height: 20px
        flex: 0 0 20px
        background: var(--page-bg)
        border: 1px solid var(--text-color)
        margin: 8px 0
        padding: 8px
        @include text.text(default)
        @include media.breakpoint-up(md)
          flex: 0 0 200px
          margin-left: 15px

        &[type="checkbox"]
          flex: 0 0 20px
          width: 20px
          height: 20px
          margin: 10px auto

          @include media.breakpoint-up(md)
          margin: 0 240px 0 10px
</style>
