<template>
  <div class="mobile-container" ref="container">
    <div class="mobile-content" ref="demo">
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  computed: {
    visible() {
      return ['/'].indexOf(this.$route.path) < 0
    }
  },

  data() {
    return {
      isFooterFixed: false,
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      const toPath = to.path.split('/').length
      const fromPath = from.path.split('/').length
      this.transitionName = fromPath < toPath ? 'page-left' : 'page-right'
      console.log(this.transitionName,'this.transitionName')
    }
  },

  mounted() {
    this.computeFooterFixed()
  },

  methods: {
    computeFooterFixed() {
      if (this.$refs.container) {
        const demoSize = this.$refs.demo.getBoundingClientRect()
        const containerSize = this.$refs.container.getBoundingClientRect()
        if (demoSize.height < containerSize.height - 54) {
          this.isFooterFixed = true
          return
        }
      }
      this.isFooterFixed = false
    }
  }
}
</script>

<style lang="scss">
.page-right-enter-active,
.page-left-enter-active,
.page-left-leave-active,
.page-right-leave-active {
  will-change: transform;
  transition: all .2s;
  position: absolute
}
.page-left-enter,.page-left-leave-to,.page-right-enter,.page-right-leave-to{
  opacity: 0;
}
.page-left-enter{
  transform: translate3d(100%,0,0)
}
.page-left-leave-to{
  transform: translate3d(-100%,0,0)
}
.page-right-enter {
  transform: translate3d(-100%, 0, 0);
}
.page-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.mobile-container {
  height: 100%;
  overflow: auto;
  background: #f8f8f8;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.page-back {
  display: inline-block;
  position: absolute;
  top: 12px;
  left: 10px;
  width: 40px;
  height: 40px;
  text-align: center;
  color: #333;
  transform: rotate(180deg);

  i {
    font-size: 24px;
    line-height: 40px;
  }
}

.demo-title {
  font-size: 16px;
  display: block;
  line-height: 1;
  padding: 20px 15px 0;
}

.demo-sub-title {
  font-size: 14px;
  font-weight: normal;
  color: #999;
  padding: 30px 5px 10px;
}

.footer {
  margin-top: 30px;
  width: 100%;
  padding: 10px 0 20px;
  background: #f8f8f8;

  &.footer-fixed {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
