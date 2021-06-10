<template>
  <svg-icon
    :name="name"
    :class="className"
    :style="{
      width: `${typeof size === 'object' ? size[0] : size}px`,
      height: `${typeof size === 'object' ? size[1] : size}px`,
    }"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, Array],
    },
  },
  computed: {
    className() {
      return 'icon icon-' + this.name
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  display: block;
  fill: currentColor;
}
</style>
