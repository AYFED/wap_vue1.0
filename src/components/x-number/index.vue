<template>
  <div class="ay_cell">
    <div class="ay_cell_bd ay_cell_primary">
      <p>{{title}}</p>
    </div>
    <div class="ay_cell_ft" v-show="!readonly" style="font-size:0">
      <a @click="sub" class="ay-number-selector ay-number-selector-sub":class="{'ay-number-disabled':disabledMin}">-</a>
      <input v-model="value" :name="name" class="ay-number-input" :style="{width: width+'px'}" number :readonly="!fillable" pattern="[0-9]*"  onfocus="if(value=defaultValue){value=''}"  onKeyUp="value=value.replace(/[^\d]/g,'') "/>
      <a @click="add" class="ay-number-selector ay-number-selector-plus" :class="{'ay-number-disabled':disabledMax}">+</a>
    </div>
    <div class="ay_cell_ft" v-else>
      {{value}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    obj: {
      type: Object,
      default () {
        return {}
      }
    },
    name: String,
    title: String,
    fillable: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 50
    }
  },
  computed: {
    disabledMin () {
      return typeof this.min === 'undefined' ? false : this.value <= this.min
    },
    disabledMax () {
      return typeof this.max === 'undefined' ? false : this.value >= this.max
    }
  },
  ready () {
  },
  watch: {
    value (newValue, old) {
      if (this.min && this.value < this.min) {
        this.value = this.min
      }
      if (this.max && this.value > this.max) {
        this.value = this.max
      }
      this.$emit('on-change', this.value,this.obj)
    }
  },
  methods: {
    add () {
      if (!this.disabledMax) {
        this.value += this.step
      }
    },
    sub () {
      if (!this.disabledMin) {
        this.value -= this.step
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_cell_global';

.ay-number-input {
  float:left;
  height:22px;
  font-size:.8rem;
  color: #666;
  appearance: none;
  border:1px solid #ececec;
  padding:3px 0;
  text-align:center;
  border-radius: 1px;
}
.ay-number-selector {
  float:left;
  height:20px;
  font-size: 1rem;
  line-height:18px;
  color:#E94709;
  border:1px solid #ececec;
}
.ay-number-selector.ay-number-disabled{
  color:#ccc;
}
.ay-number-selector-sub {
  border-right:none;
  padding:4px 10px;
  border-radius:2px 0 0 2px;
}
.ay-number-selector-plus {
  border-left:none;
  margin-right: 5px;
  padding:4px 8px;
  border-radius:0 2px 2px 0;
}
</style>
