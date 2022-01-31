<template>
  <div class="artist-card">
    <div class="image">
      <img :src="imageSrc" alt="" />
    </div>
    <div class="info">
      <p class="name">{{ name }}</p>
      <p class="tracks">{{ tracks }}</p>
    </div>
    <div class="actions">
      <button class="delete-button" @click="onDelete()">x</button>
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
    return { tracks: "..." };
  },
  async mounted() {
    const artistTopTracks = await getArtistTopTracks(this.artistId);
    this.tracks = artistTopTracks.map((track) => track.name).join(", ");
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
  color: var(--text-color)
  border: 1px solid var(--spotify-color-border)
  padding: 10px
  @include text.text(default)
  @include transitions.short(box-shadow)

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
      @include text.text(s)

  .actions
    position: relative
    height: 100%

    .delete-button
      background: var(--button-bg)
      color: red
      position: relative
      top: 0
</style>
