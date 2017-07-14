<template>
  <div class="ay-alert">
    <dialog
    class="ay_dialog_alert"
    :show="show"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="ay_dialog_hd"><strong class="ay_dialog_title">{{title}}</strong><div v-if="close" class="ay-close" @click="onHide"></div></div>
      <div class="ay_dialog_bd"><slot></slot></div>
      <div class="ay_dialog_ft">
        <a v-if="!close" href="javascript:;" class="ay_btn_dialog primary" @click="onHide">{{buttonText}}</a>
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
    show: Boolean,
    close: {
      type: Boolean,
      default: true
    },
    title: String,
    buttonText: {
      type: String,
      default: 'OK'
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
    onHide () {
      this.show = false
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/ayui/widget/ayui_tips/ayui_mask';
@import '../../styles/ayui/widget/ayui_tips/ayui_dialog';

.ay_dialog_hd{
  position: relative;

  .ay-close{
    position: absolute;
    top:10px;
    right: 10px;
    width: 24px;
    height: 24px;
    display: block;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAW1JREFUSA2dlN1OwyAYhgvxEnZ/Zsa0JzvQqMmixyYe2OjJDmgXTe9vt2Dr+zJYOgb0GyT8FD6epwWKMsZsq6p6Qv6t63qrlBrRLk7TNOmu6z4AWCO3Nyg2yCvkFwysEHBfKnHwPViEM200CmObx2INyZ6Bsz5RMwLnPKNsacwX6ge2XeJyib8kAf9umubRCgjFXhRJcnByT4ISyRL8QnCNRAKPCiQSKTwpyEk4xpOGyh9FdtkNZSNMZ3sQDsY23sWI4IzNChgQkbDbp+Sb+4BFAQMTkkU450r/2D8GBynWF4TIlugTs3gZxlKLv/U5NuD7skuEpQnhg5t46wGos5KkIAbH/XRHMI7pDyqRJCpIwf017n40keRCsATnFzBJJWcCKfyokElOgmvhUokVlMIlEtX3/es4ju8+GPXA0+I3dNafbcb2RGv9pgFvZjOL4JzPF3LHePA8SGteFTvkA3Jb8uYexnomafF4wPPuHxWECWUSKpFnAAAAAElFTkSuQmCC) no-repeat;
    background-size: 50%;
    background-position: center;
  }
}
</style>
