<template>
  <a href="javascript:;" class="ay_tabbar_item" :class="{'ay_bar_item_on': $parent.index === index}">
    <div class="ay_tabbar_icon" :class="[iconClass || $parent.iconClass, {'ay-reddot': showDot}]">
      <slot name="icon"></slot>
      <sup><badge v-if="badge" :text="badge"></badge></sup>
    </div>
    <p class="ay_tabbar_label">
      <slot name="label"></slot>
    </p>
  </a>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'
import { go } from '../../libs/router'
import Badge from '../badge'

export default {
  components: {
    Badge
  },
  //mixins: [childMixin],
  props: {
    showDot: {
      type: Boolean,
      default: false
    },
    badge: String,
    link: [String, Object],
    iconClass: String
  },
  events: {
    'on-item-click': function () {
      go(this.link, this.$router)
    }
  }
}
</script>
