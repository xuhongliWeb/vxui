import Hello from '../packages/hello'
import Button from '../packages/button'
const install = function(Vue) {
  if (install.installed) return
  Vue.component(Hello.name, Hello)
  Vue.component(Button.name, Button)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Hello,
  Button
}
