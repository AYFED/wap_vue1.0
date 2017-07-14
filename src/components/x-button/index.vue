<template>
  <button class="ay_btn" :class="classes" :disabled="disabled">
    {{text}}<slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean,
    text: String
  },
  computed: {
    classes () {
      return [
        {
          ay_btn_disabled: this.disabled,
          ay_btn_mini: this.mini
        },
        `ay_btn_${this.type}`,
        this.plain ? `ay_btn_plain_${this.type}` : ''
      ]
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_button/ayui_button.less';
</style>
