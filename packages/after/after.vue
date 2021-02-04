<template>
  <div>
    <h3>{{t}}</h3>
  </div>
</template>
<script>
const fs = require('fs')

import { after, after2 } from 'lib/utils'
export default {
  name: 'vxAfter',
  data() {
    return {
      t: 0,
      obj: {}
    }
  },
  mounted() {
    // 保存变量  返回的函数保存起来 ！！必须
    const t1 = after(3, () => {
      this.t = 3
    })
    console.log(t1)
    t1()
    t1()
    t1()
    // this.read()
    this.read2()
  },
  methods: {
    /**
     * 模拟异步
     * 并发
     */
    read() {
      const print = after(3, obj => {
        // 并发的解决
        console.log(this.obj, 'after-obj')
      })
      setTimeout(() => {
        this.obj.age = '5年'
        print() // 这里调用
      }, 1000)
      setTimeout(() => {
        this.obj.job = '前端'
        print() // 这里调用
      }, 2000)
      setTimeout(() => {
        this.obj.name = 'XX'
        print() // 这里调用
      }, 3000)
      // 需求是想要等到 全部内容拿到之后在打印结果，Promise.all可以实现，用计数器这个也可以解决
      console.log(this.obj, 'obj')
      console.log('我在最后')
    },
    read2() {
      const print = after2(3, obj => {
        // 并发的解决
        console.log(obj, 'after-obj222回调')
      })
      setTimeout(() => {
        print('age', '5年') // 这里调用
      }, 1000)
      setTimeout(() => {
        print('job', '前端') // 这里调用
      }, 2000)
      setTimeout(() => {
        print('name', 'xx') // 这里调用
      }, 3000)
      // 需求是想要等到 全部内容拿到之后在打印结果，Promise.all可以实现，用计数器这个也可以解决
      console.log(this.obj, 'obj')
      console.log('我在最后')
    }
  }
}
</script>