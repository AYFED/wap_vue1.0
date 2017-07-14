<template>
    <div class="ay-x-input ay-cell" :class="{'ay-cell_warn': !valid}">
        <div class="ay-cell__hd">
            <div :style="labelStyles" v-if="hasRestrictedLabel">
                <slot name="restricted-label"></slot>
            </div>
            <slot name="label">
                <label class="ay-label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
                <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
            </slot>
        </div>
        <div class="ay-cell__bd ay-cell__primary">
            <input
                    v-if="!type || type === 'text'"
                    class="ay-input"
                    :maxlength="max"
                    :autocomplete="autocomplete"
                    :autocapitalize="autocapitalize"
                    :autocorrect="autocorrect"
                    :spellcheck="spellcheck"
                    :style="inputStyle"
                    type="text"
                    :name="name"
                    :pattern="pattern"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    v-model="value"
                    @focus="focusHandler"
                    @blur="blur"
                    v-el:input/>
            <input
                    v-if="type === 'number'"
                    class="ay-input"
                    :maxlength="max"
                    :autocomplete="autocomplete"
                    :autocapitalize="autocapitalize"
                    :autocorrect="autocorrect"
                    :spellcheck="spellcheck"
                    :style="inputStyle"
                    type="number"
                    :name="name"
                    :pattern="pattern"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    v-model="value"
                    @focus="focusHandler"
                    @blur="blur"
                    v-el:input/>
            <input
                    v-if="type === 'email'"
                    class="ay-input"
                    :maxlength="max"
                    :autocomplete="autocomplete"
                    :autocapitalize="autocapitalize"
                    :autocorrect="autocorrect"
                    :spellcheck="spellcheck"
                    :style="inputStyle"
                    type="email"
                    :name="name"
                    :pattern="pattern"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    v-model="value"
                    @focus="focusHandler"
                    @blur="blur"
                    v-el:input/>
            <input
                    v-if="type === 'password'"
                    class="ay-input"
                    :maxlength="max"
                    :autocomplete="autocomplete"
                    :autocapitalize="autocapitalize"
                    :autocorrect="autocorrect"
                    :spellcheck="spellcheck"
                    :style="inputStyle"
                    type="password"
                    :name="name"
                    :pattern="pattern"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    v-model="value"
                    @focus="focusHandler"
                    @blur="blur"
                    v-el:input/>
            <input
                    v-if="type === 'tel'"
                    class="ay-input"
                    :maxlength="max"
                    :autocomplete="autocomplete"
                    :autocapitalize="autocapitalize"
                    :autocorrect="autocorrect"
                    :spellcheck="spellcheck"
                    :style="inputStyle"
                    type="tel"
                    :name="name"
                    :pattern="pattern"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    v-model="value"
                    @focus="focusHandler"
                    @blur="blur"
                    v-el:input/>
        </div>
        <div class="ay-cell__ft">
            <icon type="clear" v-show="!equalWith && showClear && value && !readonly && !disabled" @click.native="clear"></icon>

            <icon class="ay-input-icon" type="warn" :title="!valid ? firstError : ''" v-show="!novalidate && !equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"></icon>
            <icon class="ay-input-icon" type="warn" v-if="!novalidate && hasLengthEqual && dirty && equalWith && !valid"></icon>
            <icon type="success" v-show="!novalidate && equalWith && equalWith === value && valid"></icon>

            <icon type="success" class="ay-input-icon" v-show="novalidate && iconType === 'success'"></icon>
            <icon type="warn" class="ay-input-icon" v-show="novalidate && iconType === 'error'"></icon>

            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import Base from '../../libs/base'
import Icon from '../icon'
import InlineDesc from '../inline-desc'

import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

import Debounce from '../../tools/debounce'


const validators = {
  'email': {
    fn: isEmail,
    msg: '邮箱格式'
  },
  'china-mobile': {
    fn (str) {
      return isMobilePhone(str, 'zh-CN')
    },
    msg: '手机号码'
  },
  'china-name': {
    fn (str) {
      return str.length >= 2 && str.length <= 10
    },
    msg: '中文姓名'
  }
}
export default {
  created () {
    this.value = this.value || ''
    if (!this.title && !this.placeholder && !this.value) {
      console.warn('no title and no placeholder?')
    }
    if (this.required && !this.value) {
      this.valid = false
    }
    this.handleChangeEvent = true
    if (this.debounce) {
      this._debounce = Debounce(() => {
        this.$emit('on-change', this.value)
      }, this.debounce)
    }
  },
  ready () {
     if (this.$slots && this.$slots['restricted-label']) {
      this.hasRestrictedLabel = true
    }
  },
  beforeDestroy () {
    if (this._debounce) {
      this._debounce.cancel()
    }
  },
  mixins: [Base],
  components: {
    Icon,
    InlineDesc
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    keyboard: String,
    inlineDesc: String,
    isType: [String, Function],
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    equalWith: String,
    textAlign: String,
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    novalidate: {
      type: Boolean,
      default: false
    },
    iconType: String,
    debounce: Number
  },
  computed: {
    labelStyles () {
      return {
        width: this.$parent.labelWidth || (this.labelWidth + 'em'),
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      }
    },
    pattern () {
      if (this.keyboard === 'number' || this.isType === 'china-mobile') {
        return '[0-9]*'
      }
    },
    labelWidth () {
      return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
    },
    hasErrors () {
      return Object.keys(this.errors).length > 0
    },
    inputStyle () {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        }
      }
    }
  },
  methods: {
    clear () {
      this.value = ''
      this.$els.input.focus()
    },
    focus () {
      this.$els.input.focus()
    },
    focusHandler () {
      this.$emit('on-focus', this.value)
    },
    blur () {
      this.setTouched()
      this.validate()
      this.$emit('on-blur', this.value)
    },
    getError () {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
    },
    validate () {
      if (typeof this.equalWith !== 'undefined') {
        this.validateEqual()
        return
      }
      this.errors = {}
      if (!this.value && !this.required) {
        this.valid = true
        return
      }
      if (!this.value && this.required) {
        this.valid = false
        this.errors.required = '必填哦'
        this.getError()
        return
      }
      if (typeof this.isType === 'string') {
        const validator = validators[this.isType]
        if (validator) {
          this.valid = validator[ 'fn' ](this.value)
          if (!this.valid) {
            this.errors.format = validator[ 'msg' ] + '格式不对哦~'
            return
          } else {
            delete this.errors.format
          }
        }
      }
      if (typeof this.isType === 'function') {
        const validStatus = this.isType(this.value)
        this.valid = validStatus.valid
        if (!this.valid) {
          this.errors.format = validStatus.msg
          this.forceShowError = true
          if (!this.firstError) {
            this.getError()
          }
          return
        } else {
          delete this.errors.format
        }
      }
      if (this.min) {
        if (this.value.length < this.min) {
          this.errors.min = `最少应该输入${this.min}个字符哦`
          this.valid = false
          if (!this.firstError) {
            this.getError()
          }
          return
        } else {
          delete this.errors.min
        }
      }
      if (this.max) {
        if (this.value.length > this.max) {
          this.errors.max = `最多可以输入${this.max}个字符哦`
          this.valid = false
          this.forceShowError = true
          return
        } else {
          this.forceShowError = false
          delete this.errors.max
        }
      }
      this.valid = true
    },
    validateEqual () {
      if (!this.equalWith && this.value) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      }
      let willCheck = this.dirty || this.value.length >= this.equalWith.length
      // 只在长度符合时显示正确与否
      if (willCheck && this.value !== this.equalWith) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      } else {
        if (!this.value && this.required) {
          this.valid = false
        } else {
          this.valid = true
          delete this.errors.equal
        }
      }
    }
  },
  data () {
    let data = {
      hasRestrictedLabel: false,
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      valid: true,
    }
    return data
  },
  watch: {
    valid () {
      this.getError()
    },
    value (val) {
      this.value = val
    },
    equalWith (newVal) {
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
    },
    value (newVal) {
      if (!this.equalWith && newVal) {
        this.validateEqual()
      }
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
      this.$emit('input', newVal)
      if (this._debounce) {
        this._debounce()
      } else {
        this.$emit('on-change', newVal)
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/ayui/widget/ayui_cell/ayui_access';
@import '../../styles/ayui/widget/ayui_cell/ayui_cell_global';
@import '../../styles/ayui/widget/ayui_cell/ayui_form/ayui_form_common';
@import '../../styles/ayui/widget/ayui_cell/ayui_form/ayui_vcode';

.ay-input-icon.ay-input-icon {
    font-size: 21px;
}
.ay-input-icon.ay-icon-warn:before, .ay-input-icon.ay-icon-success:before {
    font-size: 21px;
}
.ay-x-input .ay-icon {
    padding-left: 5px;
}
.ay-x-input.ay-cell_vcode {
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
}
.ay-x-input{
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;

    .ay-cell__bd {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }

    .ay-cell__ft {
        text-align: right;
        color: #999999;
    }

    .ay-input{
        width: 100%;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        height: 1.41176471em;
        line-height: 1.41176471;
    }
}
</style>
