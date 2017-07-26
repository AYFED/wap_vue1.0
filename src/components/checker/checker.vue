<template>
  <div class="ay-checker-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    defaultItemClass: String,
    selectedItemClass: String,
    disabledItemClass: String,
    type: {
      type: String,
      default: 'radio'
    },
    value: {
      type: [String, Number, Array]
    },
    max: Number
  },
  watch: {
    value (newValue) {
      this.$emit('on-change', newValue)
    }
  }
}
</script>

<style>
.ay-checker-item {
  display: inline-block;
}
</style>
