<template>
  <div :class="['vx-doc-simulator', { 'vx-doc-simulator-fixed': isFixed }]">
    <iframe ref="iframe" :src="src" :style="styles" frameborder="0"> </iframe>
  </div>
</template>
<script>
export default {
  name: 'vx-simulator',
  props: {
    src: {
      type: String
    }
  },
  data() {
    return {
      scrollTop: window.scrollY,
      windowHei: window.innerHeight
    }
  },
  computed: {
    isFixed() {
      return this.scrollTop > 60 // 页面滚动距离大于60才固定
    },
    // 框架样式
    // 最小高度640
    styles() {
      const height = Math.min(640, this.windowHei - 90)
      return {
        height: height + 'px'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY
    })

    window.addEventListener('resize', () => {
      this.windowHei = window.innerHeight
    })
  }
}
</script>

<style lang="scss" scoped>
.vx-doc-simulator {
  position: absolute;
  top: 20px;
  right: 20%;
  z-index: 1;
  box-sizing: border-box;
  width: 375px;
  overflow: hidden;
  background: #fafafa;
  box-shadow: 0 8px 12px #ebedf0;
  &-fixed {
    position: fixed;
    top: 20px;
  }
}

iframe {
  display: block;
  width: 100%;
}
</style>
