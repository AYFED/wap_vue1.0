<template>
  <div class="ay_loading_toast" v-show="show">
    <div class="ay_mask_transparent"></div>
    <div class="ay_toast" :style="{position: position}">
      <!--<div class="ay_loading">-->
        <!--<div class="ay_loading_leaf" v-for="i in 12" :class="['ay_loading_leaf_' + i]"></div>-->
      <!--</div>-->
      <div class="loading-box">
        <img name="img" src="//pic1.aoyou.com/load/loading.gif" />
      </div>
      <!--<p class="ay_toast_content">{{text}}<slot></slot></p>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: {
      type: String,
      default: 'Loading'
    },
    position: String
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_tips/ayui_mask';
@import '../../styles/ayui/widget/ayui_tips/ayui_toast';
.ay_toast{
  background:transparent;
  margin-top: -70px;/*0228 F*/
  top: 50%;

}
.loading-box{
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 6px;

  img{
    display: block;
    margin: 0 auto;
    width: 60px;
    border: none;
  }
}/*0228 F*/

  .ay_mask_transparent{
    background-color: #f5f5f5;
  }/*0302F*/
</style>
