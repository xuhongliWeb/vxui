<template>
  <div class="hello">
    <van-row type="flex">
      <vx-button @click.stop="handleClick()">点击打开</vx-button>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome dddddddddto Your Vue.js App'
    }
  },
  methods: {
    handleClick(type = 'info', text = 'text', verticalOffset = 32) {
      const content =
        text !== 'html' ? '提示内容' : `<p style="color: red;">提示内容</p>`
      this.$message({
        type,
        content,
        duration:2000,
        verticalOffset,
        onClose() {
          console.log('close')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
