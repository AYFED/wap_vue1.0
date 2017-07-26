<template>
  <div class="ay_tabbar">
    <slot></slot>
  </div>
</template>

<script>
  import {parentMixin} from '../../mixins/multi-items'

  export default {
    mixins: [parentMixin],
    props: {
      iconClass: String
    }
  }
</script>

<style lang="less">
  @import '../../styles/ayui/widget/ayui_tab/ayui_tab_tabbar';

  .ay_tabbar_icon {
    position: relative;
  }

  .ay_tabbar_icon > sup {
    position: absolute;
    top: -8px;
    left: 100%;
    transform: translateX(-50%);
    z-index: 101;
  }
</style>
