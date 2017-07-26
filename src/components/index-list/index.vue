<template>
  <div class="ay-indexlist">
    <ul class="ay-indexlist-content" v-el:content :style="{ 'height': currentHeight + 'px'}">
      <div class="search-content" slothtml="haschild">
        <div class="title-block currentcity" v-if="city" v-show="show" navtitle="定位">
          {{locationtitle}}: <span>{{city}}</span>
        </div>
        <div class="title-block" navtitle="历史" v-show="history.length">
          {{historytitle}}:
        </div>
        <ul class="hotcity" v-if="history">
          <li class="hotlist" v-for="item in history">
            <a class="checker" @click="handleResultClick(item)"
               :class="{ 'active': city==item.CityName}">{{item.CityName}}</a>
          </li>
        </ul>
        <div class="title-block" v-if="hotcity" navtitle="热门">
          {{hottitle}}:
        </div>
        <ul class="hotcity" v-if="hotcity">
          <li class="hotlist" v-for="item in hotcity">
            <a class="checker" @click="handleResultClick(item)"
               :class="{ 'active': city==item.CityName}">{{item.CityName}}</a>
          </li>
        </ul>
        <slot name="citys"></slot>
      </div>
      <slot></slot>
    </ul>

    <div class="ay-indexlist-nav" @touchstart="handleTouchStart" v-el:nav>
      <ul class="ay-indexlist-navlist">
        <li class="ay-indexlist-navitem" v-for="section in sections" track-by="$index">{{section.initial}}</li>
      </ul>
    </div>
    <div class="mint-indexlist-indicator" v-if="showIndicator" v-show="moving">{{ currentIndicator }}</div>
  </div>
</template>

<style lang="less">
  .hotcity {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
    .hotlist {
      display: block;
      float: left;
      margin-bottom: (15rem/20);
      box-sizing: border-box;
      font-size: (14rem/20);
      border-radius: 100px;
      width: 32%;
      margin-right: 2%;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.2;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    .checker {
      padding: .3rem 0;
      border: 1px solid #999999;
      display: block;
      border-radius: 100px;
      color: #333333;
    }
    .active {
      border: 1px solid #FF5523;
      color: #FF5523;
    }
  }

  .page-indexlist-wrapper {
    position: relative;
    overflow: hidden;
  }

  .ay-indexlist-content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
  }

  .ay-indexlist {
    .ay_cell {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .ay_cells_title {
    padding-top: .2rem;
    padding-bottom: .2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #888;
    background: #F5F5F5;
    font-size: 0.7rem;
    margin: 0;
  }

  .ay-indexlist {
    width: 100%;
    /*position: relative;*/
    /*overflow: hidden;*/

    .ay-content {
      margin: 0;
      padding: 0;
    }

    .ay-indexlist-nav {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin: 0;
      background-color: #fff;
      /*border-left: solid 1px #ddd;*/
      text-align: center;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ay-indexlist-navlist {
      padding: 0;
      margin: 0;
      list-style: none;
      max-height: 100%;
      display: flex;
      flex-direction: column;
    }

    .ay-indexlist-navitem {
      padding: 0 6px;
      font-size: 12px;
      user-select: none;
      -webkit-touch-callout: none;
      color: #999999;
      line-height: 1.4;
    }

    /*    .ay-indexlist-indicator {
            position: absolute;
            size: 50px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            line-height: 50px;
            background-color: rgba(0, 0, 0, .7);
            border-radius: 5px;
            color: #fff;
            font-size: 22px;
        }*/
    .mint-indexlist-indicator {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 50px;
      background-color: rgba(0, 0, 0, .7);
      border-radius: 5px;
      color: #fff;
      font-size: 22px;
    }
  }

</style>

<script>
  var infoSave = {}
  export default {
    props: {
      city: String,

      show: {
        type: Boolean,
        default: false
      },
      height: Number,
      locationtitle: String,
      historytitle: String,
      hottitle: String,
      showIndicator: {
        type: Boolean,
        default: true
      },
      hotcity: {
        type: Array,
        default() {
          return []
        }
      },
      history: {
        type: Array,
        default() {
          return []
        }
      },
      sections: {
        type: Array,
        default: true
      }
    },
    data() {
      return {
        navWidth: 0,
        indicatorTime: null,
        moving: false,
        firstSection: null,
        currentIndicator: '',
        currentHeight: this.height
      }
    },
    watch: {
      sections() {
        this.init()
      }
    },
    methods: {
      init() {
        this.$nextTick(() => {
          this.navWidth = this.$els.nav.clientWidth
        })
        let listItems = this.$els.content.children
        if (listItems.length > 0) {
          this.firstSection = listItems[0]
        }
      },
      handleResultClick(item) {
        this.$emit('select-item', item)
      },
      handleTouchStart(e) {
        if (e.target.tagName !== 'LI') {
          return;
        }
        this.scrollList(e.changedTouches[0].clientY)
        if (this.indicatorTime) {
          clearTimeout(this.indicatorTime)
        }
        this.moving = true
        window.addEventListener('touchmove', this.handleTouchMove)
        window.addEventListener('touchend', this.handleTouchEnd)
      },
      handleTouchMove(e) {
        e.preventDefault()
        this.scrollList(e.changedTouches[0].clientY)
      },
      handleTouchEnd() {
        this.indicatorTime = setTimeout(() => {
          this.moving = false
          this.currentIndicator = ''
        }, 500)
        window.removeEventListener('touchmove', this.handleTouchMove)
        window.removeEventListener('touchend', this.handleTouchEnd)
      },
      scrollList(y) {
        let currentItem = document.elementFromPoint(document.body.clientWidth - 10, y)
        if (!currentItem || !currentItem.classList.contains('ay-indexlist-navitem')) {
          return
        }
        this.currentIndicator = currentItem.innerText
        let targets = this.sections.filter(section => section.initial === currentItem.innerText)
        let targetDOM
        if (targets.length > 0) {
          let _scrollMargin = 0
          targetDOM = (infoSave[targets[0].initial]).children.length > 0 ? (infoSave[targets[0].initial]).children[0] : infoSave[targets[0].initial]
          if ((infoSave[targets[0].initial]).children.length > 0) {
            _scrollMargin = 44
          }
          this.$els.content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top - _scrollMargin
        }
      }
    },
    ready() {
      if (!this.$els.cell) {
        setTimeout(() => {
          let items = this.$els.content.children
          for (let p = 0, q = items.length; p < q; p++) {
            if (items[p].getAttribute('slothtml') !== undefined) {
              // slot的html没有子集的情况
              if (items[p].getAttribute('slothtml') === 'haschild') {

                for (let c = 0, d = items[p].children.length; c < d; c++) {
                  if (items[p].children[c].getAttribute('navtitle')) {
                    infoSave[items[p].children[c].getAttribute('navtitle')] = items[p].children[c]
                  }
                }
              } else {
                //slot的html需要用到子集的情况
                if (items[p].getAttribute('navtitle')) {
                  infoSave[items[p].getAttribute('navtitle')] = items[p]
                }
              }
            } else {
              infoSave[items[p].children[0].innerText] = items[p].children[1]
            }
          }
          if (!this.currentHeight) {
            this.currentHeight = document.documentElement.clientHeight - this.$els.content.getBoundingClientRect().top
          }
          this.init()
        }, 500)
      }
    }
  }
</script>
