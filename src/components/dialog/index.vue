<template>
  <div class="ay_dialog_alert" @touchmove="!this.scroll && $event.preventDefault()">
    <div class="ay_mask" @click="hideOnBlur" v-show="show" @touchMove.prevent="" :transition="maskTransition"></div>
    <div class="ay_dialog" v-show="show" @touchmove.self="!this.scroll && $event.preventDefault()" :transition="dialogTransition">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'ay-fade'
    },
    dialogTransition: {
      type: String,
      default: 'ay-dialog'
    },
    scroll: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    hideOnBlur () {
      this.$emit('on-hide')
    }
  },
  watch: {
    show (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/ayui/widget/ayui_tips/ayui_mask';
@import '../../styles/ayui/widget/ayui_tips/ayui_dialog';
</style>
