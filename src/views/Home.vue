<template>
  <div class="home">
    <h1 class="header">artists2playlist</h1>
    <p class="tagline">Create a playlist from a set of artists' Top X songs.</p>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="sass" scoped>
@use "@/style/variables/sizes"

.home
  .tagline
    font-size: sizes.$text-xl
</style>
