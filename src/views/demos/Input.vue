<template>
  <div>

    <group title="Default">
      <x-input title="message" placeholder="I'm placeholder"></x-input>
    </group>

    <group title="不显示清除按钮">
      <x-input title="message" placeholder="I'm placeholder" :show-clear="false" autocapitalize="characters"></x-input>
    </group>

    <group title="set is-type=china-name">
      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
    </group>

    <group title="set keyboard=number and is-type=china-mobile">
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>

    <group title="set is-type=email">
      <x-input title="邮箱" name="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
    </group>

    <group title="set min=2 and max=5">
      <x-input title="2-5个字符" placeholder="" :min="2" :max="5"></x-input>
    </group>

    <group title="确认输入">
      <x-input title="请输入6位数字" type="text" placeholder="" :value.sync="password" :min="6" :max="6" @on-change="change"></x-input>
      <x-input title="请确认6位数字" type="text" placeholder="" :equal-with="password"></x-input>
    </group>

    <group title="验证码" class="ay_cells_form">
      <x-input title="验证码" class="ay_vcode">
        <img slot="right" src="http://ay.github.io/ay/images/vcode.jpg">
      </x-input>
      <x-input title="发送验证码" class="ay_vcode">
        <x-button slot="right" type="primary">发送验证码</x-button>
      </x-input>
    </group>

    <group title="check if value is valid when required===true">
      <x-input title="message" placeholder="I'm placeholder" v-ref:input></x-input>
      <cell title="get valid value" :value="'$valid value:' + $refs.input.valid"></cell>
    </group>

     <group title="check if value is valid when required===false">
      <x-input title="message" placeholder="I'm placeholder" :required="false" v-ref:input02></x-input>
      <cell title="get valid value" :value="'$valid value:' + $refs.input02.valid"></cell>
    </group>

  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from '../../components'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data () {
    return {
      password: '123465'
    }
  },
  methods: {
    change (val) {
      console.log(val)
    }
  }
}
</script>
<style scoped>
.ay_cell_ft .ay_btn {
  margin-left: 5px;
  vertical-align: middle;
  display: inline-block;
}
</style>
