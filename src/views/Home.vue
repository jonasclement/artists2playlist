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

      <h2>1. Start by adding the artists you'd like!</h2>
      <spotify-search class="spotify-search" @select-artist="onSelectArtist($event)" />
      <h3>Selected artists:</h3>
      <div class="artist-cards">
        <artist-card
          v-for="artist in selectedArtists"
          :key="artist.id"
          class="card"
          :name="artist.name"
          :image-src="artist.image"
          @delete-click="onDeleteArtist(artist)"
        />
      </div>
    </div>
    <spotify-button v-else class="spotify-button" />
  </div>
</template>

<script>
import ArtistCard from "@/components/ArtistCard.vue";
import ContentDivider from "@/components/ContentDivider";
import SpotifyButton from "@/components/SpotifyButton";
import SpotifySearch from "@/components/SpotifySearch";
import { deleteToken, getMe, tokenIsExpired } from "@/api/spotify-helper";

export default {
  name: "Home",
  components: { ArtistCard, ContentDivider, SpotifyButton, SpotifySearch },
  data() {
    return {
      selectedArtists: [],
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
    },
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
