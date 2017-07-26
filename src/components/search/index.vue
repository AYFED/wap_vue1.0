<template>
  <div class="ay-search-box" :class="{'ay-search-fixed':isFixed}" :style="{top: isFixed ? top : ''}">
    <div class="ay_search_bar" id="search_bar" :class="{ay_search_focusing: !isCancel}">
      <form class="ay_search_outer" @submit.prevent="$emit('on-submit', value)">
        <div class="ay-search-mask" @click="touch" v-show="!isFixed || autoFixed"></div>
        <div class="ay_search_inner">
          <i class="ay_icon_search"></i>
          <input type="search" class="ay_search_input" id="search_input" :placeholder="placeholder" autocomplete="off"
                 :required="required" v-model="value" v-el:input
                 @focus="isFocus = true"
                 @blur="isFocus = false"/>
          <a href="javascript:" class="ay_icon_clear" id="search_clear" @click="clear"></a>
        </div>
        <!--<label for="search_input" class="ay_search_text" id="search_text" v-show="!isFocus && !value">-->
        <!--<i class="ay_icon_search"></i>-->
        <!--<span>{{placeholder}}</span>-->
        <!--</label>-->
      </form>
      <a href="javascript:" class="ay_search_cancel" id="search_cancel" @click="cancel">{{cancelText}}</a>
    </div>
    <div class="ay_cells ay_cells_access ay-search_show" id="search_show" v-show="isResult"
         :style="{height:listHeight}">
      <slot></slot>
      <div class="ay_cell" v-for="item in results" @click="handleResultClick(item)">
        <div class="ay_cell_bd ay_cell_primary">
          <p v-html="item.title"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      required: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: 'Search'
      },
      cancelText: {
        type: String,
        default: 'cancel'
      },
      value: {
        type: String,
        twoWay: true,
        default: ''
      },
      results: {
        type: Array,
        default() {
          return []
        }
      },
      autofocus: Boolean,
      autoFixed: {
        type: Boolean,
        default: true
      },
      top: {
        type: String,
        default: '0px'
      },
      listHeight: {
        type: String,
        default: '0px'
      }
    },
    methods: {
      clear() {
        this.value = ''
        this.isFocus = true
        this.isFixed = false
        this.setFocus()
      },
      cancel(e) {
        e.stopPropagation()
        this.value = ''
        this.isCancel = true
        this.isFixed = false
        this.$emit('on-cancel')
        this.isResult = false
      },
      handleResultClick(item) {
        this.$emit('result-click', item)
      },
      touch() {
        document.querySelector('#search_input').focus()
        this.isCancel = false
        this.isResult = true
        if (this.autoFixed) {
          this.isFixed = true
        }
      },
      setFocus() {
        this.$els.input.focus()
      }
    },
    data() {
      return {
        isCancel: true,
        isFocus: false,
        isFixed: false,
        isResult: false
      }
    },
    ready() {
      this.autofocus && this.$els.input.focus()
    },
    watch: {
      isFixed(val) {
        if (val === true) {
          this.setFocus()
          this.isFocus = true
        }
      },
      value(val) {
        this.$emit('on-change', this.value)
      }
    }
  }
</script>

<style lang="less">
  @import '../../styles/ayui/icon/ayui_icon_font';
  @import '../../styles/ayui/widget/ayui_searchbar/ayui_searchbar';

  .ay-search-fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
  }

  .ay-search-box {
    width: 100%;
  }

  .ay_cells.ay-search_show {
    margin-top: 0;
    overflow-y: auto;
  }

  .ay-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  .ay-search-box .ay_cells:after {
    display: none;
  }
</style>
