<template>
  <div class="page-header">
    <div class="page-header__top">
      <h1 class="page-header__logo">
        <a href="#">Vui.js</a>
      </h1>
      <ul class="page-header__navs">
        <li class="page-header__item">
          <a href="/" class="page-header__link">组件</a>
        </li>
        <li class="page-header__item">
          <a href="https://github.com/Brickies/vui" class="page-header__github" target="_blank"></a>
        </li>
        <li class="page-header__item">
          <span class="page-header__link"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // version: window._global.version,
      scrollTop: 0
    }
  },

  mounted() {
    const _this = this
    let timer
    window.addEventListener('scroll', () => {
      clearTimeout(timer)
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      timer = setTimeout(() => {
        _this.scrollTop = scrollTop
      }, 500)
    })
  }
}
</script>

<style lang="scss">
.page-header {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  .page-header__top {
    overflow: hidden;
    height: 60px;
    background-color: #fbfbfb;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    .page-header__logo {
      float: left;
      & > a {
        display: block;
        /* width: 78px; */
        height: 40px;
        line-height: 40px;
        background-image: url(https://raw.githubusercontent.com/xuqiang521/vui/master/src/assets/logo.png);
        background-size: contain;
        background-repeat: no-repeat;
        margin: 10px 0 0 20px;
        padding-left: 45px;
        font-size: 25px;
        font-family: monospace;
        color: #2c3e50;
      }
    }
    .page-header__navs {
      float: right;
      .page-header__item {
        float: left;
        height: 50px;
        .page-header__link {
          display: block;
          line-height: 60px;
          color: #333;
          font-size: 16px;
          margin: 0 20px;
        }
      }
    }
  }
}
</style>