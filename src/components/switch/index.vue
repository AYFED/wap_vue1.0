<template>
  <div class="ay_cell ay_cell_switch">
    <div class="ay_cell_hd ay_cell_primary">
      <label class="ay_label" :style="labelStyle" v-html="title"></label>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="ay_cell_ft">
      <input class="ay_switch" type="checkbox" :disabled="disabled" v-model="value"/>
    </div>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc'

export default {
  components: {
    InlineDesc
  },
  computed: {
    labelStyle () {
      let isHTML = /<\/?[^>]*>/.test(this.title)
      let width = Math.min(isHTML ? 5 : (this.title.length + 1), 14) + 'em'
      return {
        width
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    },
    inlineDesc: String
  },
  watch: {
    value (newVal) {
      this.$emit('on-change', newVal)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_form/ayui_form_common';
@import '../../styles/ayui/widget/ayui_cell/ayui_switch';

.ay_cell_switch .ay_cell_ft {
  font-size: 0;
  height: 44px;
}
</style>
