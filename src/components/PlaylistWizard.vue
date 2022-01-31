<template>
  <div class="playlist-wizard">
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
  </div>
</template>

<script>
import ArtistCard from "@/components/ArtistCard.vue";
import SpotifySearch from "@/components/SpotifySearch";

export default {
  name: "PlaylistWizard",
  components: { ArtistCard, SpotifySearch },
  data() {
    return {
      selectedArtists: []
    };
  },
  methods: {
    onSelectArtist(artist) {
      if (this.selectedArtists.findIndex((a) => a.id === artist.id) !== -1) {
        return;
      }

      this.selectedArtists.push(artist);
    },
    onDeleteArtist(artist) {
      this.selectedArtists = this.selectedArtists.filter((a) => a.id !== artist.id);
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/style/mixins/media"
@use "@/style/mixins/text"
@use "@/style/variables/colors"

.playlist-wizard
  h1, h2, h3, p
    color: var(--text-color)

  a
    color: var(--link-color)

  p
    @include text.text(default)



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
