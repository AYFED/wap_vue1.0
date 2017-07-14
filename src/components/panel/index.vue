<template>
  <div class="ay_panel ay_panel_access">
    <div class="ay_panel_hd" v-if="header" @click="onClickHeader" v-html="header"></div>
    <div class="ay_panel_bd">
      <!--type==='1'-->
      <a :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)" class="ay_media_box ay_media_appmsg" v-if="type === '1'">
        <div class="ay_media_hd" v-if="item.src">
          <img class="ay_media_appmsg_thumb" :src="item.src" alt="">
        </div>
        <div class="ay_media_bd">
          <h4 class="ay_media_title">{{item.title}}</h4>
          <p class="ay_media_desc">{{item.desc}}</p>
        </div>
      </a>
      <!--type==='2'-->
      <div class="ay_media_box ay_media_text" v-for="item in list" @click.prevent="onItemClick(item)" v-if="type === '2'">
          <h4 class="ay_media_title">{{item.title}}</h4>
          <p class="ay_media_desc">{{item.desc}}</p>
      </div>
      <!--type==='3'-->
      <div class="ay_media_box ay_media_small_appmsg">
          <div class="ay_cells ay_cells_access">
            <a class="ay_cell" :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)" v-if="type === '3'">
              <div class="ay_cell_hd">
                <img :src="item.src" alt="" style="width:20px;margin-right:5px;display:block">
              </div>
              <div class="ay_cell_bd ay_cell_primary">
                <p>{{item.title}}</p>
              </div>
              <span class="ay_cell_ft"></span>
            </a>
          </div>
      </div>
    </div>
    <a class="ay_panel_ft" :href="getUrl(footer.url)" v-if="footer && type !== '3'" @click.prevent="onClickFooter" v-html="footer.title"></a>
  </div>
</template>

<script>
import { go, getUrl } from '../../libs/router'

export default {
  props: {
    header: String,
    footer: Object,
    list: Array,
    type: {
      type: String,
      default: '1'
    }
  },
  methods: {
    getUrl (url) {
      return getUrl(url, this.$router)
    },
    onClickFooter () {
      this.$emit('on-click-footer')
      go(this.footer.url, this.$router)
    },
    onClickHeader () {
      this.$emit('on-click-header')
    },
    onItemClick (item) {
      this.$emit('on-click-item', item)
      go(item.url, this.$router)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_panel/ayui_panel';
@import '../../styles/ayui/widget/ayui_media_box/ayui_media_box';
</style>
