<template>
	<div class="ay-step">
    <slot></slot>
	</div>
</template>

<script>
export default {
  props: {
    current: Number,
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    gutter: {
      type: String,
      default: '10px'
    }
  },
  ready () {
    this._mapPropsToChildComponent()
  },
  watch: {
    current () {
      this._mapPropsToChildComponent()
    }
  },
  methods: {
    _mapPropsToChildComponent () {
      const _this = this
      const len = this.$children.length - 1
      this.$children.forEach((child, index) => {
        child.stepNumber = (index + 1).toString()
        child.stepLast = index === len

        if (index === _this.current) {
          child.status = 'process'
        } else if (index < _this.current) {
          child.status = 'finish'
        } else {
          child.status = 'wait'
        }
      })
    }
  }
}
</script>

<style lang="less">
.ay-step {
  display: flex;
}
.ay-step-item {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.ay-step-item-with-tail {
  flex: 1;
}

.ay-step-item-tail {
  height: 1px;
  position: absolute;
  left: 0;
  top: 10px;
  padding: 0 0;
  transition: all 0.4s ease 0s;
}

.ay-step-item-tail-finish {
  background: #09bb07 none repeat scroll 0 0;
}

.ay-step-item-tail-process, .ay-step-item-tail-wait {
  background: #CCC none repeat scroll 0 0;
}

.ay-step-item-checked::before {
  font-size: 15px;
  transform: translateY(-10%);
}

.ay-step-item-title {
  font-size: 0.8rem;
}

.ay-step-item-head {
  position: relative;
  display: inline-block;
  margin-right: -4px;

  .ay-step-item-head-inner {
    width: 20px;
    height: 20px;
    border-radius: 99px;
    text-align: center;
    font-size: 0.9rem;
    transition: all 0.4s ease 0s;
    background: #fff none repeat scroll 0 0;

    .ay-step-item-icon{
      position: absolute;
      top: 0;
      left: 7px;
      font-size: .7rem;
    }
  }
}

.ay-step-item-head-finish .ay-step-item-head-inner{
  border: 1px solid #09bb07;
  color: #09bb07;
}

.ay-step-item-head-process .ay-step-item-head-inner{
  border: 1px solid #09bb07;
  color: #FFF;
  background: #09bb07 none repeat scroll 0 0;
}

.ay-step-item-head-wait .ay-step-item-head-inner {
  border: 1px solid #888;
  color: #888;
}

.ay-step-item-main {
  display: inline-block;
  position: relative;
  vertical-align: top;
  color: #888;
  padding-left: 5px;
  font-size:.6rem;
}

.ay-step-item-main-process {
  font-weight: bold;
  color: #666;
}
</style>
