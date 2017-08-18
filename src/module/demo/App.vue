<template>
  <div style="height:100%;">
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box>
      <!--header slot-->
      <div class="ay-demo-header-box" slot="header">
        <x-header :left-options="leftOptions" :transition="headerTransition" :title="title" @on-click-title="scrollTop"></x-header>
      </div>
      <!--default slot-->
      <router-view
      :transition="'ay-pop-' + (direction === 'forward' ? 'in' : 'out')"
      ></router-view>

      <!--bottom slot-->
      <tabbar class="ay-demo-tabbar" icon-class="ay-center" v-show="!isTabbarDemo" slot="bottom">
        <tabbar-item v-link="{path:'/demo.html'}" :selected="route.path === '/demo.html'">
          <span class="demo-icon-22 ay-demo-tabbar-icon-home" slot="icon">&#xe639;</span>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item v-link="{path:'/demo.html/demo'}" :selected="isDemo" badge="9">
          <span class="demo-icon-22" slot="icon">&#xe633;</span>
          <span slot="label"><span v-if="componentName" class="ay-demo-tabbar-component">{{componentName}}</span><span v-else>示例</span></span>
        </tabbar-item>
        <tabbar-item v-link="{path:'/demo.html/project/donate'}" :selected="route.path === '/project/donate'" show-dot>
          <span class="demo-icon-22" slot="icon">&#xe630;</span>
          <span slot="label">更新</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
(function (root) {
  var docEl = document.documentElement
  var timer = null
  var width
  var last

  function changeRem () {
    width = docEl.getBoundingClientRect().width
    if (last === width) { return }
    last = width
    root.rem = (width / 640) * 40
    if (/ZTE U930_TD/.test(navigator.userAgent)) {
      root.rem = root.rem * 1.13
    }
    docEl.style.fontSize = root.rem + 'px'
  }

  changeRem()
  root.addEventListener('resize', function () {
    clearTimeout(timer)
    timer = setTimeout(changeRem, 300)
  })

  root.addEventListener('orientationchange', function () {
    clearTimeout(timer)
    timer = setTimeout(changeRem, 300)
  })
})(window, undefined)

import store from '../../vuex/store'
import { Tabbar, TabbarItem, Loading, ViewBox, XHeader } from '../../components'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Loading,
    ViewBox,
    XHeader
  },
  store: store,
  vuex: {
    getters: {
      route: (state) => state.route,
      isLoading: (state) => state.isLoading,
      direction: (state) => state.direction
    }
  },
  data () {
    return {
      routerTransition: {
        forward: 'slideRL',
        back: 'slideLR'
      }
    }
  },
  methods: {
    scrollTop () {
      this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
    }
  },
  events: {
    'on-click-back' () {
      window.history.back()
    }
  },
  computed: {
    leftOptions () {
      return {
        showBack: true,
        preventGoBack: true
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'ay-header-fade-in-right' : 'ay-header-fade-in-left'
    },
    componentName () {
      const parts = this.route.path.split('/')
      if (/component/.test(this.route.path) && parts[parts.length-1]) return parts[parts.length-1]
    },
    isDemo () {
      console.log(this.route.path)
      if(this.route.path==='/demo.html') return false
      return /component|demo/.test(this.route.path)
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    },
    title () {
      if (this.route.path === '/demo.html') return '首页'
      if (this.route.path === '/project/donate') return '更新'
      if (this.route.path === '/demo.html/demo') return '示例'
      return this.componentName ? `${this.componentName}` : '示例/其他'
    }
  }
}
</script>

<style lang="less">
@import '../../styles/index.less';
@import '../../styles/ayui/base/reset';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  background-color: #fbf9fe;
}

::-webkit-scrollbar{
  display: none;
}
/* v-r-transition, default is {forward: 'forward', back: 'back'}*/
.forward-enter, .forward-leave {
  transform: translate3d(-100%, 0, 0);
}
.back-enter, .back-leave {
  transform: translate3d(100%, 0, 0);
}
.demo-icon-22 {
  font-family: 'ay-demo';
  font-size: 22px;
  color: #888;
}
.ay_tabbar.ay-demo-tabbar {
  position: fixed;
  backdrop-filter: blur(10px);
  background-color: transparent;
  background: rgba(247, 247, 250, 1);
}
.ay-demo-tabbar .ay_bar_item_on .demo-icon-22 {
  color: #E94709;
}
.ay-demo-tabbar .ay_tabbar_item.ay_bar_item_on .ay_tabbar_label {
  color: #E94709;
}
.ay-demo-tabbar .ay_tabbar_item.ay_bar_item_on .ay-demo-tabbar-icon-home {
  color: #E94709;
}
.demo-icon-22:before {
  content: attr(icon);
}
.ay-demo-tabbar-component {
  background-color: #E94709;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.ay_tabbar_icon + .ay_tabbar_label {
  margin-top: 0!important;
}
.ay-demo-header-box {
  z-index: 100;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.ay_tab_bd {
  padding-top: 44px;
}

/**
* vue-router transition
*/
.ay-pop-out-transition,
.ay-pop-in-transition {
  width: 100%;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.ay-pop-out-enter,
.ay-pop-out-leave,
.ay-pop-in-enter,
.ay-pop-in-leave {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.ay-pop-out-enter {
  animation-name: popInLeft;
}
.ay-pop-out-leave {
  animation-name: popOutRight;
}
.ay-pop-in-enter {
  -webkit-perspective: 1000px;//透视属性
  animation-name: popInRight;
}
.ay-pop-in-leave {
  animation-name: popOutLeft;
}
@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
