<template>
  <div class="ay-masker-box">
    <slot></slot>
    <div class="ay-masker" :style="style">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { toRGB } from './converter'

export default {
  props: {
    color: {
      type: String,
      default: '0, 0, 0'
    },
    opacity: {
      type: Number,
      default: 0.5
    }
  },
  computed: {
    style () {
      let color = /,/.test(this.color) ? this.color : toRGB(this.color.replace('#', '')).join(',')
      return {
        backgroundColor: `rgba(${color},${this.opacity})`
      }
    }
  }
}
</script>

<style>
.ay-masker-box {
  position: relative;
}
.ay-masker {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
}
</style>
