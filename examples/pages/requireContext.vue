<template>
  <div>
    requireContext
  </div>
</template>
<script>
import { after } from 'lib/utils'
const path = require('path')
export default {
  data () {
    return {
      t: 0
    }
  },
  mounted () {
    this._load()
  },
  methods: {
    _load () {
      try
      {
        let context = require.context('../src/components', false, /\.vue$/) // 找到src components下面的组件不遍历子目录
        console.log(context.keys(), 'context.keys()');

        context.keys().forEach((key) => {
          console.log(key, '文件名'); // ./Simulator.vue 带./的
          let component = context(key) // 循环获取组件实例
          console.log(component, 'component'); // request为components文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
          // 注册组件就行了
          // Vue.component(component)
        })

      } catch (error)
      {
        console.log(error);
      }
    }
  }
}
</script>