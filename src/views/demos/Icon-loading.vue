<template>
<div>
  <divider>default usage</divider>
  <span class="ay-loading"></span>
  <group>
    <cell title="Cell Loading"><span class="ay-loading"></span></cell>
    <x-input title="XInput loading" disabled :required="false" :show-clear="false">
      <span class="ay-loading" slot="right"></span>
    </x-input>
  </group>
</div>
</template>

<script>
import { Group, Cell, Divider, XInput } from '../../components'

export default {
  components: {
    Group,
    Cell,
    Divider,
    XInput
  }
}
</script>

<style>
@import '../../styles/loading.less';
</style>