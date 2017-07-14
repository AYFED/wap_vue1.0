<template>
  <div class="ay_tab">
    <slot name="header"></slot>
    <div class="ay_tab_bd ay-fix-safari-overflow-scrolling" :class="{'fix-overflow':scroll}" v-el:view-box-body id="view_box_body">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      scroll: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_tab/ayui_tab_tabbar';

.fix-overflow{
  overflow: hidden !important;
  height: 100%;
  position: fixed;
  width: 100%;
  background: #f5f5f5;
}
</style>
