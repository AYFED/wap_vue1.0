<template>
  <div class="ay-actionsheet">
    <div class="ay_mask_transition" :class="{'ay_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}"
         @touchMove.prevent="" @click="show=false"></div>
    <div class="ay_actionsheet" :class="{'ay_actionsheet_toggle': show}" @touchMove.prevent="">
      <div class="ay_actionsheet_menu">
        <div class="ay_actionsheet_cell" :class="{'ay-active':menusNum==$index}" v-for="(key, text) in menus"
             @click="emitEvent('on-click-menu', key)" v-html="text">
        </div>
        <div class="ay-actionsheet-gap" v-if="showCancel"></div>
        <div class="ay_actionsheet_cell ay-actionsheet-cancel" @click="emitEvent('on-click-menu', 'cancel')"
             v-if="showCancel">{{cancelText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    ready() {
      this.$tabbar = document.querySelector('.ay_tabbar')
    },
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      },
      showCancel: Boolean,
      cancelText: {
        type: String,
        default: 'cancel'
      },
      menus: {
        type: Object,
        default: {}
      },
      menusNum: {
        type: String,
        default: '0'
      }
    },
    methods: {
      emitEvent(event, menu) {
        if (event === 'on-click-menu' && !/.noop/.test(menu)) {
          this.$emit(event, menu)
          this.$emit(`${event}-${menu}`)
          this.menusNum = menu
          this.show = false
        }
      },
      fixIos(zIndex) {
        if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
          this.$tabbar.style.zIndex = zIndex
        }
      }
    },
    watch: {
      show(val) {
        if (val) {
          this.fixIos(-1)
        } else {
          setTimeout(() => {
            this.fixIos(100)
          }, 200)
        }
      }
    },
    beforeDestroy() {
      this.fixIos(100)
    }
  }
</script>

<style lang="less">
  @import '../../styles/ayui/widget/ayui_tips/ayui_mask';
  @import '../../styles/ayui/widget/ayui_tips/ayui_actionsheet';

  .ay-actionsheet-gap {
    height: 8px;
    width: 100%;
    background-color: #eee;
  }

  .ay-actionsheet-cancel:before {
    border-top: none;
  }
</style>
