<template>
  <div>
    <div class="ay_cells_title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
    <div class="ay_cells" :class="{'ay-no-group-title':!title}" :style="{marginTop: gutter}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    gutter: String
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_access';
@import '../../styles/ayui/widget/ayui_cell/ayui_cell_global';

.ay-no-group-title {
  margin-top:15px;
}
.ay_cells > a {
  color:#000;
}
</style>
