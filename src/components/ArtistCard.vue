<template>
  <div class="artist-card">
    <div class="image">
      <a :href="artistLink" target="_blank" rel="noopener">
        <img :src="imageSrc" alt="" />
      </a>
    </div>
    <div class="info">
      <a :href="artistLink" target="_blank" rel="noopener" class="name">{{ name }}</a>
      <p class="tracks">{{ trackNames }}</p>
    </div>
    <div class="actions">
      <button class="delete-button" aria-label="Remove artist from your list" @click="onDelete()">
        x
      </button>
    </div>
  </div>
</template>

<script>
import { getArtistTopTracks } from "@/api/spotify-helper";

export default {
  name: "ArtistCard",
  props: {
    artistId: {
      type: String,
      required: true
    },
    artistLink: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return { trackNames: "..." };
  },
  async mounted() {
    const artistTopTracks = await getArtistTopTracks(this.artistId);
    this.trackNames = artistTopTracks.map((track) => track.name).join(", ");
  },
  methods: {
    onDelete() {
      this.$emit("delete-click");
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/style/mixins/images"
@use "@/style/mixins/shadows"
@use "@/style/mixins/text"
@use "@/style/mixins/transitions"
@use "@/style/variables/colors"

.artist-card
  display: flex
  flex-grow: 1
  align-items: center
  gap: 15px
  text-align: left
  height: 108px
  background: var(--card-bg)
  border: 1px solid var(--spotify-color-border)
  padding: 10px
  @include text.text(default)
  @include transitions.short(box-shadow)

  a
    display: block
    color: var(--active-link-color)

  &:hover
    @include shadows.default()

  .image
    display: flex
    align-items: center
    width: auto

    img
      @include images.round(81px)

  .info
    .name
      font-size: 1.8rem
      font-weight: bold
      margin: 10px 0px

    .tracks
      display: -webkit-box
      -webkit-line-clamp: 1
      -webkit-box-orient: vertical
      margin: 0 0 5px 0
      text-overflow: ellipsis
      overflow: hidden
      font-style: italic
      @include text.text(xs)

  .actions
    position: relative
    height: 100%

    .delete-button
      background: var(--button-bg)
      color: darken(red, 8%)
      position: relative
      top: 0
</style>
