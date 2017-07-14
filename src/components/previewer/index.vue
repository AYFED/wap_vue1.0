<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp ay-previewer" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
           It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>
      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides.
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <button class="pswp__button pswp__button--share" title="Share"></button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
            <button class="pswp__button pswp__button--del" @click="del"></button>
            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'

export default {
  methods: {
    init (index) {
      let options = Object.assign({
        history: false,
        shareEl: false,
        tapToClose: true,
        index: index
      }, this.options)
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.list, options)
      this.photoswipe.init()
    },
    show (index) {
      this.init(index)
    },
    close () {
      this.photoswipe.close()
    },
    del(event) {
      this.list.splice(this.photoswipe.getCurrentIndex(),1)
      this.close()
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';

.pswp__button--del{
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAAXNSR0IArs4c6QAAAohJREFUeAHtmr0uBFEUxy1CJCoNkYiCViXxDOh8JBTCC1Cqx6vovIDCI2iIRlAQnUJFJMTH+h/2yhg7OztZ566P30n+5s69Z86Z89szdyS7HR0YBCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAJtIlBpU96m0lar1XE5zkoDORdca363Uqlc5KwznUdAcOekO6nIbuRgHwLWLAEBW5Qei8im1u81nm42fkw/9y1ChVuOROqsI1vLzvdpbk3qlsxOpZ230dc/K5oaq03f67gtPUnVBtLS+7q2lk07+fWW6rSyw2NdMJQHQGsj0nnZoME/L+6vmw8FlTweyn+wqFj5jEpnUmkriv0d6+Ex/I5YjWLYFmGP7UtG2Tk7f5YupT09wva4NzT5XIrshJxmpGHJtp0iyeXNx44YBCAAgXYRsL0qmtlbKCTT3vkvctv/oJgjgR8DWM2dWIfXLMnWrPkkLNq47HrWP9b5jwEcq+DYeQDsTBzAAHYm4ByeDgawMwHn8HQwgJ0JOIengwHsTMA5PB0MYGcCzuHpYAA7E3AOTwcD2JmAc3g6GMDOBJzD08HOgP/FN7vG0L7PCyxjfqNNBwfqTsfYgK9CHWqowh/2Bd9Wj5lcH/fQatxmro8N+DB1UwupsfdwPpUgfQ+p6T8wVCetS8FuNViT+r1Ks9jSqmS5gm145asXN/ZLrks3sS9N1ruZCHMHyjGll5z9RDaKRd0iaoUtq7KjKNV9TmI5l2LC/Zw+4pme1R4pkU6kB8nLLLbl2JJ6I5ZIKghAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCLRG4BV/R3NovvAt6AAAAABJRU5ErkJggg==) no-repeat !important;
  background-size: 100% !important;
}
</style>
