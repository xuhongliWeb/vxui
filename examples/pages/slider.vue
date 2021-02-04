<template>
  <div class="hello">
    <van-row type="flex">
      <h3>基本用法</h3>
      <vx-slider ></vx-slider>
    </van-row>
    <van-row type="flex">
      <h3>基本配置</h3>
      <vx-slider  :max="90" step="5"></vx-slider>
    </van-row>
    <van-row type="flex">
      <h3>自定义初始值</h3>
      <vx-slider v-model="value1"></vx-slider>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      value1:10,
      msg: 'Welcome dddddddddto Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  width: 100%;
}
</style>
