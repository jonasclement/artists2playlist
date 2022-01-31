<template>
  <div class="about">
    <h1>artists2playlist</h1>
    <h2>FAQ</h2>
    <h3>How do I know you're not gonna steal my Spotify login details?</h3>
    <p>
      Everything this page does is done locally on your computer. It uses the official
      <a href="https://developer.spotify.com/documentation/web-api/" rel="noopener" target="_blank"
        >Spotify Web API</a
      >
      to do it's thing, and login is done through Spotify directly.
    </p>
    <h3>Can I view the source code for this project?</h3>
    <p>
      Glad you asked! The source code is available on my
      <a href="https://github.com/jonasclement/artists2playlist" rel="noopener" target="_blank"
        >GitHub</a
      >, and you are welcome to host this application yourself if you feel safer that way. You will
      have to register your application with Spotify yourself, however.
    </p>
  </div>
</template>

<style lang="sass" scoped>
@use "@/style/mixins/text"
@use "@/style/variables/colors"

h1, h2, h3
  color: var(--text-color)

p
  @include text.text(default)

a
  @include text.link()
</style>
