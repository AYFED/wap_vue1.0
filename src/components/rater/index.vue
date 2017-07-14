<template>
  <div class="ay-rater">
    <a class="ay-rater-box" v-for="i in max" @click="handleClick(i)" :class="{'is-active':value > i}" :style="{color: colors && colors[i] ? colors[i] : '#ccc',marginRight:margin+'px',fontSize: fontSize + 'px', width: fontSize + 'px', height: fontSize + 'px', lineHeight: fontSize + 'px'}">
      <span class="ay-rater-inner">{{star}}<span class="ay-rater-outer" :style="{color: activeColor, width: cutPercent + '%'}" v-if="cutPercent > 0 && cutIndex === i">{{star}}</span></span>
    </a>
  </div>
</template>

<script>
export default {
  ready () {
    this.updateStyle()
  },
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    star: {
      type: String,
      default: '★'
    },
    activeColor: {
      type: String,
      default: '#fc6'
    },
    margin: {
      type: Number,
      default: 2
    },
    fontSize: {
      type: Number,
      default: 25
    }
  },
  computed: {
    sliceValue () {
      const _val = this.value.toString().split('.')
      return _val.length === 1 ? [_val[0], 0] : _val
    },
    cutIndex () {
      return this.sliceValue[0] * 1
    },
    cutPercent () {
      return this.sliceValue[1] * 10
    }
  },
  methods: {
    handleClick (i, force) {
      if (!this.disabled || force) {
        if (this.value === i + 1) {
          this.value = i
          this.updateStyle()
        } else {
          this.value = i + 1
        }
      }
    },
    updateStyle () {
      for (var j = 0; j < this.max; j++) {
        if (j <= this.value - 1) {
          this.colors.$set(j, this.activeColor)
        } else {
          this.colors.$set(j, '#ccc')
        }
      }
    }
  },
  data () {
    return {
      colors: [],
      cutIndex: -1,
      cutPercent: 0
    }
  },
  watch: {
    value (val) {
      this.updateStyle()
    }
  }
}
</script>

<style>
.ay-rater {
  text-align: left;
  display: inline-block;
  line-height: normal;
}
.ay-rater a {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color: #ccc;
}
.ay-rater a:last-child {
  padding-right: 2px!important;
  margin-right: 0px!important;
}
.ay-rater a:hover {
  color: #ffdd99;
}
.ay-rater a.is-disabled {
  color: #ccc !important;
  cursor: not-allowed;
}
.ay-rater-box {
  position: relative;
}
.ay-rater-inner {
  position: relative;
  display: inline-block;
}
.ay-rater-outer {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  overflow: hidden;
}
</style>

