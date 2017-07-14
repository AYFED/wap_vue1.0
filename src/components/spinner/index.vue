<template>
  <span class="ay-spinner" :class="className"></span>
</template>

<script>
import Spinner from './spinner'
const types = ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']

export default {
  ready () {
    Spinner(this.$el, this.type)
  },
  props: {
    type: {
      type: String,
      default: 'ios'
    }
  },
  computed: {
    className () {
      let rs = {}
      for (let i = 0; i < types.length; i++) {
        rs[`ay-spinner-${types[i]}`] = this.type === types[i]
      }
      return rs
    }
  }
}
</script>

<style>
.ay-spinner {
  stroke: #444;
  fill: #444;
  vertical-align: middle;
  display: inline-block;
  width: 28px;
  height: 28px;
}

.ay-spinner svg {
  width: 28px;
  height: 28px;
}

.ay-spinner.ay-spinner-inverse {
  stroke: #fff;
  fill: #fff;
}

.ay-spinner-android {
  stroke: #4b8bf4;
}

.ay-spinner-ios, .ay-spinner-ios-small {
  stroke: #69717d;
}

.ay-spinner-spiral .stop1 {
  stop-color: #fff;
  stop-opacity: 0;
}

.ay-spinner-spiral.ay-spinner-inverse .stop1 {
  stop-color: #000;
}

.ay-spinner-spiral.ay-spinner-inverse .stop2 {
  stop-color: #fff;
}
</style>
