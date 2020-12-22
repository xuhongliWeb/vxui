import Hello from '../packages/hello'
import Button from '../packages/button'
import Input from '../packages/input'
import debounce from '../packages/debounce'
import throttle from '../packages/throttle'
import vmodel from '../packages/vmodel'
import vmodel2 from '../packages/vmodel2'
import vxPromise from '../packages/Promise'

const arr = [Hello, Button, debounce, throttle, Input, vmodel, vmodel2, vxPromise]
const install = function (Vue) {
  if (install.installed) return
  arr.forEach((item) => {
    Vue.component(item.name, item)
  })
  // Vue.component(Hello.name, Hello)
  // Vue.component(Button.name, Button)
  // Vue.component(Button.name, Button)
  // Vue.component(throttle.name, Buttthrottleon)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Hello,
  Button
}
