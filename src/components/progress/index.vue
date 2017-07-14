<template>
  <div class="ay_progress">
    <div class="ay_progress_bar">
      <div class="ay_progress_inner_bar js_progress" :style="{width: percent + '%'}"></div>
    </div>
    <a href="javascript:;" class="ay_progress_opr" v-show="showCancel">
      <i class="ay_icon_cancel" @click="cancel"></i>
    </a>
  </div>
</template>

<script>
import Base from '../../libs/base'

export default {
  mixins: [Base],
  props: {
    percent: {
      type: Number,
      default: 0
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cancel () {
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_progress/ayui_progress';
</style>
