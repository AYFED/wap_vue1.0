<template>
  <div>
    <dialog class="ay_dialog_confirm"
            :show="show"
            :mask-transition="maskTransition"
            :dialog-transition="dialogTransition"
            @on-hide="$emit('on-hide')"
            @on-show="$emit('on-show')">
      <div class="ay_dialog_hd"><strong class="ay_dialog_title">{{title}}</strong></div>
      <div class="ay_dialog_bd"><slot></slot></div>
      <div class="ay_dialog_ft">
        <a href="javascript:;" class="ay_btn_dialog default" @click="onCancel">{{cancelText}}</a>
        <a href="javascript:;" class="ay_btn_dialog primary" @click="onConfirm">{{confirmText}}</a>
      </div>
    </dialog>
  </div>
</template>

<script>
import Dialog from '../dialog'

export default {
  components: {
    Dialog
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      twoWay: true
    },
    title: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    maskTransition: {
      type: String,
      default: 'ay-fade'
    },
    dialogTransition: {
      type: String,
      default: 'ay-dialog'
    }
  },
  methods: {
    onConfirm () {
      this.show = false
      this.$emit('on-confirm')
    },
    onCancel () {
      this.show = false
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/ayui/widget/ayui_tips/ayui_mask';
@import '../../styles/ayui/widget/ayui_tips/ayui_dialog';
</style>
