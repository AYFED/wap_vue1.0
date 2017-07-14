<template>
  <div class="ay_cells_radio">
    <label class="ay_cell ay_cell_radio ay_check_label" for="radio_{{uuid}}_{{index}}" v-for="(index,one) in options">
      <div class="ay_cell_bd ay_cell_primary">
        <p>{{one | getValue}}</p>
      </div>
      <div class="ay_cell_ft">
        <input type="radio" class="ay_check" v-model="value" id="radio_{{uuid}}_{{index}}" value="{{one | getKey}}">
        <span class="ay_icon_checked"></span>
      </div>
    </label>
    <div class="ay_cell" v-show="fillMode">
      <div class="ay_cell_hd"><label for="" class="ay_label">{{fillLabel}}</label></div>
      <div class="ay_cell_bd ay_cell_primary">
        <input class="ay_input needsclick" type="text" v-model="fillValue" placeholder="{{fillPlaceholder}}" @blur="isFocus=false" @focus="onFocus()">
      </div>
      <div class="ay_cell_ft" v-show="value==='' && !isFocus">
        <i class="ay_icon_warn"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Base from '../../libs/base'
import { getValue, getKey } from '../checklist/object-filter'

export default {
  mixins: [Base],
  filters: {
    getValue,
    getKey
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      twoWay: true
    },
    fillMode: {
      type: Boolean,
      default: false
    },
    fillPlaceholder: {
      type: String,
      default: '其他'
    },
    fillLabel: {
      type: String,
      default: '其他'
    }
  },
  ready () {
    this.handleChangeEvent = true
  },
  methods: {
    onFocus () {
      this.value = this.fillValue || ''
      this.isFocus = true
    }
  },
  watch: {
    value (newVal) {
      var isOption = contains(this.options, newVal)
      if (newVal !== '' && isOption) {
        this.fillValue = ''
      }
      this.$emit('on-change', newVal)
    },
    fillValue (newVal) {
      if (this.fillMode && this.isFocus) {
        this.value = newVal
      }
    }
  },
  data () {
    return {
      fillValue: '',
      isFocus: false
    }
  }
}

function contains (a, obj) {
  var i = a.length
  while (i--) {
    if (a[i] === obj) {
      return true
    }
  }
  return false
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_check';
@import '../../styles/ayui/widget/ayui_cell/ayui_form/ayui_form_common';
@import '../../styles/ayui/icon/ayui_icon_font';
.ay_cell_radio > * {
  pointer-events: none;
}
</style>
