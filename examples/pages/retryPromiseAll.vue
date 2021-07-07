<template>
  <div>
    异步请求通过 Promise.all 处理，怎么让其中失败的所有请求重试。
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
   let A = this._http('A')
   let B = this._http('B')
   let C = this._http('C')
   let D = this._http('D')
   Promise.all([A,B,C,D]).then(res => {
     console.log(res, 'res');
   })
  },
  methods: {
    _http (value,flag) {
      try
      {
        return new Promise((resolve,reject) => {
          setTimeout(() => {
            if(Math.random() < 0.5) { // 请求成功的状态
              console.log(flag?'重新请求成功':'第一次请求成功',value)
              resolve(value)
            }else {
              console.log(flag?'重新请求成功':'第一次请求成功',value)
              resolve(this._http(value,true))
            }
          }, 2000);
        })
      } catch (error)
      {
        console.log(error);
      }
    }
  }
}
</script>