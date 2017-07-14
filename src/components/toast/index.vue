<template>
  <div class="ay-toast">
    <div class="ay_mask_transparent" v-show="show"></div>
      <div class="ay_toast" :style="{width: width}" :class="toastClass" v-show="show" :transition="transition">
        <i class="ay_icon_toast" v-show="type !== 'text'"></i>
        <p class="ay_toast_content" v-if="text" v-html="text"></p>
        <p class="ay_toast_content" v-else><slot></slot></p>
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
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: 'success'
    },
    transition: {
      type: String,
      default: 'ay-fade'
    },
    width: {
      type: String,
      default: '7.6em'
    },
    text: String
  },
  computed: {
    toastClass () {
      return {
        'ay_toast_forbidden': this.type === 'warn',
        'ay_toast_cancel': this.type === 'cancel',
        'ay_toast_success': this.type === 'success',
        'ay_toast_text': this.type === 'text'
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('on-hide')
        }, this.time)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/ayui/widget/ayui_tips/ayui_mask';
@import '../../styles/ayui/icon/ayui_icon_font';
@import '../../styles/ayui/widget/ayui_tips/ayui_toast';

.ay_toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.ay_toast_forbidden {
  color: #F76260;
}
.ay_toast.ay_toast_text{
  min-height: 0;
}
.ay_toast_text .ay_toast_content {
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
}
.ay_toast_success .ay_icon_toast:before {
  content: "\EA08";
}
.ay_toast_cancel .ay_icon_toast:before {
  content: "\EA0D";
}
.ay_toast_forbidden .ay_icon_toast:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
