<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import sticky from './sticky'

  export default {
    ready() {
      sticky(this.$el, {
        scrollBox: this.scrollBox,
        offset: this.offset,
        checkStickySupport: typeof this.checkStickySupport === 'undefined' ? true : this.checkStickySupport
      })
    },
    props: ['scrollBox', 'offset', 'checkStickySupport']
  }
</script>

<style>
  .ay-sticky {
    width: 100%;
    position: sticky;
    top: 0;
  }

  .ay-relative {
    z-index: 8;
    background: rgb(255, 255, 255);
    position: relative;
  }

  .ay-fixed {
    width: 100%;
    position: fixed;
    top: 0;
  }
</style>

