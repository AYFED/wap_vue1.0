<template>
  <div class="ay_tab">
    <slot name="header"></slot>
    <div class="ay_tab_bd_input ay-fix-safari-overflow-scrolling" v-el:view-box-body id="view_box_body">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<style lang="less">
@import '../../styles/ayui/widget/ayui_tab/ayui_tab_tabbar';
</style>
