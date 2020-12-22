<template>
  <div class="hello"></div>
</template>

<script>
import { vxPromise } from 'lib/utils'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome dddddddddto Your Vue.js App'
    }
  },
  mounted() {
    this.vPromise()
      .then(res => {
        console.log(res, '我大于5')
      },(err) => {
        console.log(err, 'then-err')
      })
  },
  methods: {
    primise1() {
      try {
        return new Promise((resolve, reject) => {
          let num = Math.random() * (10 + 1)
          if (num > 5) {
            resolve(num)
          } else {
            reject(num)
          }
        })
      } catch (error) {
        console.log(error, '错误')
      }
    },
    /**
     * vxPromise 异步
     */
    vPromise() {
      try {
       return new vxPromise((resolve1, reject) => {
         setTimeout(() => {
          let num = Math.random() * (10 + 1)
          if (num > 5) {
            resolve1(num)
          } else {
            reject(num)
          }
         }, 3000);
        // console.log('我在定时器之后')
        })
      } catch (error) {
        console.log(error)
      }
    },
      /**
     * vxPromise 
     */
    vPromise2() {
      try {
       return new vxPromise((resolve1, reject) => {
          let num = Math.random() * (10 + 1)
          if (num > 5) {
            resolve1(num)
          } else {
            reject(num)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
