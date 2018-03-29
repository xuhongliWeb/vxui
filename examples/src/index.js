import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './DocsApp'
import navConfig from './nav.config.json'
import routes from './router.config'
import Vxui from 'src/index.js'
import isMobile from './is-mobile.js'
import 'packages/vxui-css/src/index.scss'
import '../assets/docs.scss'

const isProduction = process.env.NODE_ENV === 'production'
console.log(isProduction, 'isProduction')

Vue.use(Vxui)
Vue.use(VueRouter)

const routesConfig = routes(navConfig)
routesConfig.push({
  path: '/',
  redirect: '/component/hello'
})
routesConfig.push({
  path: '/component',
  redirect: '/component/hello'
})

const router = new VueRouter({
  base: isProduction ? '/vxui/' : __dirname,
  routes: routesConfig
})
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    window.scrollTo(0, 0)
  }

  const pathname = isProduction ? '/vxui/mobile' : '/mobile.html'
  if (isMobile) {
    window.location.replace(pathname)
    console.log(pathname, 'pathname')
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
