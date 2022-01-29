<template>
  <div class="container">
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
      >
        <path d="m26 4 5 5-5 5M26 28l5-5-5-5" />
        <path d="M31 9h-8L9 23H0" />
        <path d="M31 23h-8L9 9H0" />
      </g>
    </svg>
    <span class="brand">artists2playlist</span>
  </div>
</template>

<script>
export default {
  name: "TheLogo"
};
</script>

<style lang="sass" scoped>
.container
  display: flex
  align-items: center

  .icon
    color: var(--text-color)
    padding-right: 1rem

  .brand
    font-size: 1.8rem
</style>
