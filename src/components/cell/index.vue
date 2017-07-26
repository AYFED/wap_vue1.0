<template>
  <div class="ay_cell" :class="{'ay-tap-active': isLink || !!link}" @click="onClick">
    <div class="ay_cell_hd">
      <slot name="icon"></slot>
    </div>
    <div class="ay_cell_bd" :class="{'ay_cell_primary':primary==='title'}">
      <p v-bind:class="{ 'active': title==activename}">
        {{title}}
        <slot name="after-title"></slot>
      </p>
      <inline-desc>{{inlineDesc}}</inline-desc>
    </div>
    <div class="ay_cell_ft" :class="{'ay_cell_primary':primary==='content', 'with_arrow': isLink || !!link}">
      <p v-if="value">{{value}}</p>
      <slot name="value"></slot>
      <slot></slot>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
  import InlineDesc from '../inline-desc'
  import {go} from '../../libs/router'

  export default {
    components: {
      InlineDesc
    },
    props: {
      title: String,
      value: [String, Number],
      isLink: Boolean,
      inlineDesc: [String, Number],
      activename: String,
      primary: {
        type: String,
        default: 'title'
      },
      link: {
        type: [String, Object]
      }
    },
    methods: {
      onClick() {
        go(this.link, this.$router)
      }
    }
  }
</script>

<style lang="less">
  @import '../../styles/variable.less';
  @import '../../styles/tap.less';
  @import '../../styles/ayui/widget/ayui_cell/ayui_cell_global';

  .ay_cell_bd > p {
    color: @cell-body-label-color;
  }

  .ay_cell_ft.with_arrow:after {
    content: " ";
    display: inline-block;
    transform: rotate(45deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    position: absolute;
    top: 20px;
    right: 13px;
    margin-left: .3em;
  }
</style>
