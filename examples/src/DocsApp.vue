<template>
  <div class="app">
    <page-header></page-header>
    <div class="main-content">
      <div class="page-container clearfix">
        <side-nav :data="navConfig['zh-CN']" base="/component"></side-nav>
        <Simulator :key="$route.fullPath" :src="href"/>
        <div class="page-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
import navConfig from './nav.config.json'
import PageHeader from './components/page-header'
import SideNav from './components/side-nav'
import Simulator from './components/Simulator'

export default {
  name: 'App',
  components: { PageHeader, SideNav,Simulator },
  data () {
    return {
      navConfig: navConfig,
      
      href:location.origin+'/mobile.html'+location.hash
      // http://localhost:8081/mobile.html#/component/button
    }
  }
}
</script>
