<template>
  <div id="app">
    <div id="nav">
      <page-logo />
      <span class="links">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </span>
    </div>
    <content-divider variant="horizontal" />
    <router-view />
  </div>
</template>

<script>
import ContentDivider from "@/components/ContentDivider.vue";
import PageLogo from "@/components/PageLogo.vue";

export default {
  name: "App",
  components: { PageLogo, ContentDivider },
  mounted() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return this.setTheme("dark");
    }

    return this.setTheme("light");
  },
  methods: {
    setTheme(theme) {
      document.getElementById("app").classList.add(`theme-${theme}`);
    }
  }
};
</script>

<style lang="sass">
@use "./style/variables/colors.css"

body
  background: var(--page-bg)

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: var(--text-color)
  max-width: 768px
  margin: 30px auto
</style>

<style lang="sass" scoped>
@use "@/style/mixins/media"
@use "@/style/mixins/text"

#nav
  display: flex
  align-items: center
  flex-direction: column
  gap: 16px

  @include media.breakpoint-up(sm)
    flex-direction: row
    justify-content: space-between

  .links
    @include text.text(xl)

    a
      font-weight: bold
      @include text.link()

      &.router-link-exact-active
        color: var(--active-link-color)
</style>
