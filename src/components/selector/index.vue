<template>
  <div class="ay_cell" :class="{'ay_select_after':title, 'ay_cell_select':!readonly}">
    <div class="ay_cell_hd" v-if="title" :class="{'ay_cell_primary':readonly}">
      <label for="" class="ay_label" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">{{title}}</label>
    </div>
    <div class="ay_cell_bd ay_cell_primary" v-if="!readonly">
      <select class="ay_select" :class="{'ay-selector-no-padding':!title}" :name="name" v-model="value" :style="{direction: direction}">
        <option value="" v-if="placeholder" :selected="placeholder && !value" class="ay_select_placeholder">{{placeholder}}</option>
        <option :value="one.key" v-for="one in processOptions">{{one.value}}</option>
      </select>
    </div>
    <div class="ay_cell_ft" v-else>
      {{value | findByKey processOptions}}
    </div>
  </div>
</template>

<script>
import find from 'array-find'

const findByKey = function (key, options) {
  const _rs = find(options, function (item) {
    return item.key === key
  })
  return _rs ? _rs.value : key
}

export default {
  computed: {
    processOptions () {
      if (this.options.length && this.options[0].key) {
        return this.options
      } else {
        return this.options.map(function (item) {
          return {
            key: item,
            value: item
          }
        })
      }
    }
  },
  filters: {
    findByKey
  },
  watch: {
    value (newValue) {
      this.$emit('on-change', newValue)
    }
  },
  props: {
    title: String,
    direction: String,
    options: {
      type: Array,
      required: true
    },
    name: String,
    placeholder: String,
    readonly: Boolean,
    value: String
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_access';
@import '../../styles/ayui/widget/ayui_cell/ayui_cell_global';
@import '../../styles/ayui/widget/ayui_cell/ayui_form/ayui_form_common';
@import '../../styles/ayui/widget/ayui_cell/ayui_form/ayui_select_after';
.ay-selector-no-padding {
  padding-left: 0;
}
</style>
