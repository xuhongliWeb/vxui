<template>
  <div class="vx-demo">
    <van-row type="flex">
      <h3>基本用法</h3>
      <vx-inputNumber v-model="value"> </vx-inputNumber>
    </van-row>
    <van-row type="flex">
      <h3>最大最小限制</h3>
      <vx-inputNumber v-model="value2" :min="1" :max="20"> </vx-inputNumber>
    </van-row>
    <van-row type="flex">
      <h3>间隔</h3>
      <vx-inputNumber v-model="value3" :step="5" :min="1" :max="20"> </vx-inputNumber>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      value:0,
      value2:0,
      value3:0,
      msg: 'Welcome dddddddddto Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
