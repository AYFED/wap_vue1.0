<template>
  <span v-text="text" :class="['ay-badge', {'ay-badge-single': text.length === 1}]"></span>
</template>

<script>
export default {
  props: {
    text: [String, Number]
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.ay-badge {
  display: inline-block;
  text-align: center;
  background: @badge-bg-color;
  color: #fff;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  border-radius: 8px;
  padding: 0 6px;
  vertical-align: middle;
  background-clip: padding-box;
}
.ay-badge-single {
  padding: 0;
  width: 16px;
}
</style>
