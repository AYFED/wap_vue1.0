<template>
  <div class="ay-header">
    <div class="ay-header-left">
      <a class="ay-header-back" @click.preventDefault v-show="leftOptions.showBack" :transition="transition"
         @click="onClickBack">{{leftOptions.backText}}</a>
      <div class="left-arrow" @click="onClickBack" v-show="leftOptions.showBack" :transition="transition"></div>
      <slot name="left"></slot>
    </div>
    <h1 class="ay-header-title" @click="$emit('on-click-title')"><span v-show="title"
                                                                       :transition="transition">{{title}}</span>
      <slot></slot>
    </h1>
    <div class="ay-header-right">
      <a class="ay-header-more" @click.preventDefault @click="$emit('on-click-more')" v-if="rightOptions.showMore"></a>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      leftOptions: {
        type: Object,
        default() {
          return {
            showBack: true,
            backText: '',
            preventGoBack: false
          }
        }
      },
      title: String,
      transition: String,
      rightOptions: {
        type: Object,
        default() {
          return {
            showMore: false
          }
        }
      }
    },
    methods: {
      onClickBack() {
        if (this.leftOptions.preventGoBack) {
          this.$dispatch('on-click-back')
        } else {
          this.$dispatch('on-click-hide')
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../styles/variable.less';

  .ay-header {
    position: relative;
    padding: 2px 0;
    box-sizing: border-box;
    background-color: @x-header-background-color;
  }

  .ay-header .ay-header-title, .ay-header h1 {
    margin: 0 88px;
    line-height: 40px;
    text-align: center;
    height: 40px;
    font-size: 18px;
    font-weight: 400;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: @x-header-title-color;
  }

  .ay-header .ay-header-title > span {
    display: inline-block;
  }

  .ay-header .ay-header-left, .ay-header .ay-header-right {
    position: absolute;
    top: 14px;
    display: block;
    font-size: 14px;
    line-height: 21px;
    color: @x-header-text-color;
  }

  .ay-header .ay-header-left a, .ay-header .ay-header-left button, .ay-header .ay-header-right a, .ay-header .ay-header-right button {
    float: left;
    margin-right: 8px;
    color: @x-header-text-color;
  }

  .ay-header .ay-header-left a:active, .ay-header .ay-header-left button:active, .ay-header .ay-header-right a:active, .ay-header .ay-header-right button:active {
    opacity: .5
  }

  .ay-header .ay-header-left {
    left: 18px;
  }

  .ay-header .ay-header-left .ay-header-back {
    padding-left: 16px
  }

  .ay-header .ay-header-left .left-arrow {
    position: absolute;
    width: 30px;
    height: 30px;
    top: -5px;
    left: -5px;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

    &:before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border: 1px solid @x-header-arrow-color;
      border-width: 1px 0 0 1px;
      transform: rotate(315deg);
      top: 8px;
      left: 7px;
    }
  }

  .ay-header .ay-header-right {
    right: 15px
  }

  .ay-header .ay-header-right a, .ay-header .ay-header-right button {
    margin-left: 8px;
    margin-right: 0
  }

  .ay-header .ay-header-right .ay-header-more:after {
    content: "\2022\0020\2022\0020\2022\0020";
    font-size: 16px;
  }

  .ay-header-fade-in-right-enter {
    animation: fadeinR .5s;
  }

  .ay-header-fade-in-left-enter {
    animation: fadeinL .5s;
  }

  @keyframes fadeinR {
    0% {
      opacity: 0;
      transform: translateX(80px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeinL {
    0% {
      opacity: 0;
      transform: translateX(-80px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
