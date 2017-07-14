<template>
  <div class="ay-flexbox" :class="{'ay-flex-col': orient === 'vertical', 'ay-flex-row': orient === 'horizontal'}" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    gutter: {
      type: Number,
      default: 8
    },
    orient: {
      type: String,
      default: 'horizontal'
    },
    justify: String,
    align: String,
    wrap: String,
    direction: String
  },
  computed: {
    styles () {
      return {
        'justify-content': this.justify,
        'align-items': this.align,
        'flex-wrap': this.wrap,
        'flex-direction': this.direction
      }
    }
  }
}
</script>

<style lang="less">
.ay-flexbox{
  width: 100%;
  text-align: left;
  display: flex;
  box-align: center;
  align-items: center;
}
.ay-flexbox .ay-flexbox-item {
  flex: 1;
  min-width: 20px;
  width: 0%;
}
.ay-flexbox-item > .ay-flexbox {
  width: 100%;
}

.ay-flexbox .ay-flexbox-item:first-child{
  margin-left: 0!important;
  margin-top: 0!important;
}
.ay-flex-col {
  box-orient: vertical;
  flex-direction: column;
}
.ay-flex-col > .ay-flexbox-item {
  width: 100%;
}
.ay-flex-row {
  box-direction: row;
  box-orient: horizontal;
  flex-direction: row;
}
</style>
