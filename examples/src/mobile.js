import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './MobileApp'
import navConfig from './nav.config.json'
import routes from './router.config'
import Vui from 'src/index'
import isMobile from './is-mobile.js'

import 'packages/vxui-css/src/index.scss'
import DemoList from './components/demo-list.vue'

Vue.use(Vui)
Vue.use(VueRouter)
const isProduction = process.env.NODE_ENV === 'production'
const routesConfig = routes(navConfig, true)
routesConfig.push({
  path: '/',
  component: DemoList.default || DemoList
})
const router = new VueRouter({
  mode: 'hash',
  base: isProduction ? '/vxui/' : __dirname,
  routes: routesConfig
})
// const pathname = isProduction ? '/vxui/' : '/'
// window.location.replace(pathname)

router.beforeEach((route, redirect, next) => {
  console.log(route.path, 'path')
  if (route.path !== '/') {
    window.scrollTo(0, 0)
  }
  const pathname = isProduction ? '/vxui/' : '/'
  if (!isMobile) {
    window.location.replace(pathname)
    return
  }
  document.title = route.meta.title || document.title
  next()
})

new Vue({
  // eslint-disable-line
  render: h => h(App),
  router
}).$mount('#app-container')
