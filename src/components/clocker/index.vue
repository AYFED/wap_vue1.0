<template>
  <div>
    <span v-if="showTimeString">{{timeString}}</span>
    <div class="ay-clocker-tpl"><slot></slot></div>
  </div>
</template>

<script>
const Clocker = require('./clocker')
export default {
  ready () {
    this.slot = this.$el.querySelector('.ay-clocker-tpl')
    this.slotString = this.slot.innerHTML
    if (this.slotString !== '') {
      this.showTimeString = false
    }
    this.render()
  },
  methods: {
    render () {
      if (!this.time) return
      this.clocker = new Clocker(this.time)
      .on('tick', event => {
        this.update(event)
        this.$emit('on-tick', event)
      })
      .on('finish', () => {
        this.timeString = '00:00:00'
        this.$emit('on-finish')
      })
      .start()
    },
    update (event) {
      if (this.showTimeString) {
        this.timeString = event.strftime(this.format)
      } else {
        let string = event.strftime(this.slotString)
        if (string !== this.cacheSlotString) {
          this.slot.innerHTML = this.cacheSlotString = string
        }
      }
    }
  },
  props: {
    time: String,
    format: {
      type: String,
      default: '%D 天 %H 小时 %M 分 %S 秒'
    }
  },
  watch: {
    time () {
      this.clocker.remove()
      this.render()
    }
  },
  data () {
    return {
      showTimeString: true,
      timeString: '',
      slotString: '',
      cacheSlotString: ''
    }
  },
  beforeDestroy () {
    this.clocker.remove()
    this.clocker = null
  }
}
</script>
