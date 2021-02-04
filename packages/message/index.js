import Message from './message'

export default {
  // Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
  install(Vue, Options) {
    console.log(Vue, 'vue构造器')
    console.log(Options, 'Options')
    console.log(Message, 'Message')
    let instance = null // 全局的实例
    let index = 0 // 给每个实例一个索引 互补影响
    // vue.extend()方法其实是vue的一个构造器  使用Vue 构造器创建一个子类。参数是一个包含组件选项的对象

    const constructor = Vue.extend(Message)
    console.log(constructor, 'constructor')
    // 生成实列
    function generateInstance(options) {
      // propsData // 全局props 接收
      let instance = new constructor({
        propsData: options
      }).$mount(document.createElement('div'))

      if (typeof options.onClose === 'function')
        instance.onClose = options.onClose

      let id = 'message' + index++
      instance.id = id

      // 触发 组件内定义的事件
      instance.$once('messageClose', function() {
        const curInstance = this
        typeof curInstance.onClose === 'function' && curInstance.onClose()
      })
      return instance
    }
    Vue.prototype.$message = (options = {}) => {
      instance && instance.$destroy() // 调用前先销毁-并不会销毁DOM 清理它与其它实例的连接，解绑它的全部指令及事件监听器。
      instance = generateInstance(options)
    }
    Vue.prototype.$closeMessage = () => {
      instance && instance.$destroy()
    }
  }
}
