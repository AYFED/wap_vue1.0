<template>
  <div class="ay-color-picker">
    <flexbox>
      <flexbox-item v-for="color in colors" class="ay-color-box">
        <span class="ay-color-item" :style="{borderRadius: width/2 + 'px',backgroundColor: color, width: width + 'px', height: width + 'px',verticalAlign: 'middle'}" @click="change(color)" :class="{'ay-color-white': color === '#fff' || color === '#fff', 'ay-color-picker-small': size === 'small', 'ay-color-picker-middle': size === 'middle'}">
          <icon v-if="color === value" class="ay-color-checked" :style="{lineHeight: width + 'px'}" type="success_no_circle"></icon>
        </span>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Icon from '../icon'
import { Flexbox, FlexboxItem } from '../flexbox'

const sizeMap = {
  'large': 40,
  'middle': 30,
  'small': 20
}
export default {
  components: {
    Icon,
    Flexbox,
    FlexboxItem
  },
  props: {
    colors: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'large'
    },
    value: {
      type: String,
      twoWay: true
    }
  },
  computed: {
    width () {
      return sizeMap[this.size]
    }
  },
  methods: {
    change (color) {
      this.value = color
      this.$emit('on-change', color)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/icon/ayui_icon_font';

.ay-color-box {
  text-align: center;
}
.ay-color-picker {
  font-size: 0;
}
.ay-color-item {
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  position: relative
}
.ay-color-checked.ay_icon_success_no_circle:before {
  color: #fff;
}
.ay-color-checked {
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.ay-color-white {
  border: 1px solid #ccc;
}
.ay-color-white .ay-color-checked:before {
  color: #ccc;
}
.ay-color-picker-small .ay-color-checked:before{
  font-size: 10px;
}
.ay-color-picker-middle .ay-color-checked:before{
  font-size: 18px;
}
</style>
