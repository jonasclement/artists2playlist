<template>
  <div class="spotify-search">
    <vue-simple-suggest
      v-model="chosen"
      display-attribute="text"
      value-attribute="id"
      placeholder="Search artists..."
      :max-suggestions="15"
      :min-length="3"
      :list="fetchArtists"
    ></vue-simple-suggest>
  </div>
</template>

<script>
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";

export default {
  name: "SpotifySearch",
  components: { VueSimpleSuggest },
  data() {
    return {
      chosen: "",
      list: ["Test", "Hest", "Vest"]
    };
  },
  methods: {
    async fetchArtists(query) {
      const url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&namespace=*&search=${query}&limit=10&namespace=0&format=json`;

      const response = await fetch(url);
      if (!response.ok) {
        return;
      }

      const json = await response.json();
      // remove input text from result
      json.shift();
      console.log(json);
      const fields = ["text", "description", "link"];
      const results = [];

      json.forEach((field, i) => {
        field.forEach((el, j) => {
          if (!results[j]) {
            results.push({ id: j + 1 });
          }

          results[j][fields[i]] = el;
        });
      });

      console.log(results);
      return results;
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/style/variables/colors"
@use "@/style/variables/sizes"

.spotify-search
  width: 70%
  margin-bottom: 30px

.vue-simple-suggest.designed
  &::v-deep
    .input-wrapper input
      font-size: sizes.$text-s
      height: 40px
      border: 1px solid #000

    .suggestions
      text-align: left
      font-size: sizes.$text-s

  &.focus::v-deep .input-wrapper input
    border: 1px solid var(--spotify-color)
</style>
