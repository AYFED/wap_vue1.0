<template>
  <div class="ay_cell ay_cell_switch">
    <div class="ay_cell_hd ay_cell_primary">
      <label class="ay_label" :style="labelStyle" v-html="title"></label>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="ay_cell_ft" @touchStart="mstart" @touchMove="moving">
      <input class="ay_switch" type="checkbox" :disabled="disabled" v-model="value"/>
    </div>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc'

export default {
  components: {
    InlineDesc
  },
  computed: {
    labelStyle () {
      let isHTML = /<\/?[^>]*>/.test(this.title)
      let width = Math.min(isHTML ? 5 : (this.title.length + 1), 14) + 'em'
      return {
        width
      }
    }
  },
  data () {
      return {
          startx: 0,
          moveEndx: 0,
          flag:false,
      }
  },
  methods:{
      mstart:function(e){
          var u = navigator.userAgent;
          if(u.indexOf('iPhone')>-1){
              e.preventDefault()
          }
          this.startx = e.changedTouches[0].pageX
      },
      moving:function(e){
          if(!this.disabled){
              var u = navigator.userAgent;
              if(u.indexOf('iPhone')>-1){
                  e.preventDefault()
              }
              this.moveEndx = e.changedTouches[0].pageX
              if((this.moveEndx - this.startx)>0){
                  if(!this.value){
                      this.value = true
                  }
              }else if((this.moveEndx - this.startx)<0){
                  if(this.value){
                      this.value = false
                  }
              }
          }
      }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    },
    inlineDesc: String
  },
  watch: {
    value (newVal) {
      this.$emit('on-change', newVal)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_form/ayui_form_common';
@import '../../styles/ayui/widget/ayui_cell/ayui_switch';

.ay_cell_switch .ay_cell_ft {
  font-size: 0;
  height: 44px;
}
</style>
