<template>
  <div class="ay-group-tip" :style="{'text-align':align}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style>
.ay-group-tip, .ay-group-tip p {
  font-size:14px;
  color:#888;
  text-align:center;
  padding-top:0.3em;
  padding-left:10px;
  padding-right:5px;
}
.ay-group-tip .ay_icon {
  padding-right: 3px;
}
</style>
