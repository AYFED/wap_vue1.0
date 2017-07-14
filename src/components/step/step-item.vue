<template>
<div class="ay-step-item" :class=" { 'ay-step-item-with-tail' : !stepLast} ">
  <div :class="'ay-step-item-tail ' + 'ay-step-item-tail-' + status" v-show="!stepLast" :style="{right: $parent.gutter}"></div>
  <div :class="'ay-step-item-head ' + 'ay-step-item-head-' + status">
    <div class="ay-step-item-head-inner">
      <span v-if="!icon && status!='finish'" class="ay-step-item-icon">{{stepNumber}}</span>
      <span v-else :class="'ay-step-item-icon ' + 'ay-step-item-' + iconName">
        <icon type="success_no_circle" class="ay-step-item-checked"></icon>
      </span>
    </div>
  </div>
  <div :class="'ay-step-item-main ' + 'ay-step-item-main-' + status" :style="{backgroundColor: $parent.backgroundColor, paddingRight: stepLast ? 0 : $parent.gutter}">
    <span class="ay-step-item-title">{{title}}</span>
    <div class="ay-step-item-description">{{description}}</div>
  </div>
</div>
</template>

<script>
import Icon from '../icon'

export default {
  props: {
    title: String,
    description: String,
    stepNumber: {
      type: Number
    },
    stepLast: {
      type: Boolean,
      default: false
    },
    icon: String,
    status: String,
    tailWidth: {
      type: Object
    }
  },
  computed: {
    iconName () {
      return this.icon || 'check'
    }
  },

  components: {
    Icon
  }
}
</script>
