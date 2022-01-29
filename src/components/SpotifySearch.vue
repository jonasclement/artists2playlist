<template>
  <div class="spotify-search">
    <vue-simple-suggest
      v-model="inputValue"
      display-attribute="name"
      value-attribute="id"
      placeholder="Search artists..."
      :debounce="200"
      :disabled="disabled"
      :max-suggestions="15"
      :min-length="3"
      :list="fetchArtists"
      @select="onSelect($event)"
    ></vue-simple-suggest>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { searchArtists, tokenIsExpired } from "@/api/spotify-helper";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";

export default {
  name: "SpotifySearch",
  components: { VueSimpleSuggest },
  data() {
    return {
      inputValue: "",
      disabled: tokenIsExpired(),
      error: ""
    };
  },
  methods: {
    async fetchArtists(query) {
      if (tokenIsExpired()) {
        this.disabled = true;
        this.error = "Please log out and log back in.";
      }

      const artists = await searchArtists(query);
      return artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images[2]
      }));
    },
    async onSelect(artist) {
      this.$emit("select-artist", artist);
      await this.$nextTick();
      this.inputValue = "";
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/style/variables/colors"
@use "@/style/variables/sizes"

.spotify-search
  width: 70%

  .error
    font-size: sizes.$text
    color: var(--error-color)

.vue-simple-suggest.designed
  &::v-deep
    .input-wrapper input
      font-size: sizes.$text-s
      background: var(--page-bg)
      border: 1px solid var(--text-color)
      color: var(--text-color)
      height: 40px

      &:disabled
        cursor: not-allowed
        opacity: 60%

    .suggestions
      text-align: left
      font-size: sizes.$text-s
      background: var(--dropdown-bg)
      color: var(--text-color)
      box-shadow: 5px 2px 14px -2px rgba(0,0,0,0.79)

  &.focus::v-deep .input-wrapper input
    border: 1px solid var(--spotify-color)
</style>
