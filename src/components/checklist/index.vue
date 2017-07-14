<template>
  <div v-show="title" class="ay_cells_title">{{title}}</div>
  <div class="ay_cells ay_cells_checkbox">
    <label class="ay_cell ay_check_label" for="checkbox_{{uuid}}_{{index}}" v-for="(index, one) in options">
      <div class="ay_cell_hd">
        <input type="checkbox" class="ay_check" value="{{one | getKey}}" v-model="value" id="checkbox_{{uuid}}_{{index}}">
        <i class="ay_icon_checked"></i>
      </div>
      <div class="ay_cell_bd ay_cell_primary">
        <p>{{one | getValue}}</p>
      </div>
    </label>
  </div>
  <tip v-show="!valid && dirty"><icon type="warn" class="icon_small"></icon>{{error}}</tip>
</template>

<script>
import Base from '../../libs/base'
import Tip from '../tip'
import Icon from '../icon'
import { getValue, getKey } from './object-filter'
import shuffle from 'array-shuffle'

export default {
  components: {
    Tip,
    Icon
  },
  filters: {
    getValue,
    getKey
  },
  mixins: [Base],
  props: {
    title: String,
    required: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      twoWay: true
    },
    max: Number,
    min: Number,
    fillMode: Boolean,
    randomOrder: Boolean
  },
  ready () {
    this.handleChangeEvent = true
    if (this.randomOrder) {
      this.options = shuffle(this.options)
    }
  },
  computed: {
    _total () {
      return this.fillMode ? (this.options.length + 1) : this.options.length
    },
    _min () {
      if (!this.required) {
        return 0
      }
      if (this.min) {
        if (this.min < 0) {
          return 1
        }
        if (this.min >= this._total) {
          return this._total
        }
        return this.min
      } else {
        return 1
      }
    },
    _max () {
      if (!this.required) {
        return this._total
      }
      if (this.max) {
        if (this.max > this._total) {
          return this._total
        }
        return this.max
      } else {
        return this._total
      }
    },
    valid () {
      return this.value.length >= this._min && this.value.length <= this._max
    },
    error () {
      let err = []
      if (this.value.length < this._min) {
        err.push(this.$interpolate('最少要选择{{_min}}个哦'))
      }
      if (this.value.length > this._max) {
        err.push(this.$interpolate('最多只能选择{{_max}}个哦'))
      }
      return err
    }
  },
  watch: {
    value (newVal) {
      this.$emit('on-change', JSON.parse(JSON.stringify(newVal)))
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_cell_global';
@import '../../styles/ayui/widget/ayui_cell/ayui_check';

.ay_cells_checkbox > label > * {
  pointer-events: none;
}
.ay_cells > a {
  color:#000;
}
</style>
