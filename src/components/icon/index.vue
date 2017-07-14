<template>
  <i class="{{className}}"></i>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    className () {
      return `ay_icon ay_icon_${this.type}`
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/icon/ayui_icon_font';

.icon_big:before {
  font-size: 104px;
}

.icon_small:before {
  font-size: 12px;
}
</style>
