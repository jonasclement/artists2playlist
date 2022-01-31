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
    >
      <div
        slot="suggestion-item"
        slot-scope="scope"
        class="suggestion-item"
        :title="scope.suggestion.name"
      >
        <img class="image" :src="scope.suggestion.image" />
        <div class="text">{{ scope.suggestion.name }}</div>
      </div>
    </vue-simple-suggest>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";
import { searchArtists, tokenIsExpired } from "@/api/spotify-helper";

export default {
  name: "SpotifySearch",
  components: { VueSimpleSuggest },
  props: {
    filterArtists: {
      type: Array,
      default: () => []
    }
  },
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
      return (
        artists
          // Simplify data structure
          .map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              image: artist.images[2]?.url ?? "/images/spotify-logo.png"
            };
          })
          // Avoid duplicates
          .filter((a) => this.filterArtists.filter((fa) => fa.id === a.id).length === 0)
      );
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
@use "@/style/mixins/images"
@use "@/style/mixins/shadows"
@use "@/style/mixins/text"
@use "@/style/variables/colors"

.spotify-search
  width: 70%

  .error
    color: var(--error-color)
    @include text.text(default)

.vue-simple-suggest.designed
  &::v-deep
    .input-wrapper input
      background: var(--page-bg)
      border: 1px solid var(--text-color)
      height: 40px
      @include text.text(s)

      &:disabled
        cursor: not-allowed
        opacity: 60%

    .suggestions
      text-align: left
      background: var(--dropdown-bg)
      @include shadows.default()

      .suggestion-item
        display: flex
        align-items: center
        gap: 20px
        width: 100%
        height: 75px

        .image
          @include images.round(60px)

        .text
          @include text.text(xl)

  &.focus::v-deep .input-wrapper input
    border: 1px solid var(--spotify-color)
</style>
