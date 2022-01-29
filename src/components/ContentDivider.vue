<template>
  <div :class="[baseClass, `${baseClass}--${variant}`]"></div>
</template>

<script>
export default {
  name: "ContentSeparator",
  props: {
    variant: {
      type: String,
      required: true,
      validator: (value) => ["horizontal", "vertical"].includes(value)
    }
  },
  data() {
    return {
      baseClass: "content-separator"
    };
  }
};
</script>

<style lang="sass" scoped>
.content-separator
  border-top: 1px solid #ccc
</style>
