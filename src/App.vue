<template>
  <div id="app">
    <div id="nav">
      <the-logo />
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
import ContentDivider from "./components/ContentDivider.vue";
import TheLogo from "./components/TheLogo.vue";

export default {
  name: "App",
  components: { TheLogo, ContentDivider }
};
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  max-width: 768px
  margin: 30px auto
</style>

<style lang="sass" scoped>
@use "@/style/mixins/media"
@use "@/style/variables/sizes"

#nav
  display: flex
  align-items: center
  flex-direction: column
  margin-bottom: 60px
  gap: 16px

  @include media.breakpoint-up(sm)
    flex-direction: row
    justify-content: space-between

  .links
    font-size: sizes.$text-xl

    a
      font-weight: bold
      color: #2c3e50

      &.router-link-exact-active
        color: #42b983
</style>
