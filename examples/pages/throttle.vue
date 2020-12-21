<template>
  <div>
    节流
    <div>

    </div>
    <vx-input v-model="key" ref="inp" />
    <vx-button ref="btn">搜索</vx-button>
  </div>
</template>
<script>
import {_throttle3,_throttle,_throttle2,_throttle4} from 'lib/utils'
import { throttle } from "underscore";

export default {
  data(){
    return {
      key: ''
    }
  },
  mounted(){
    const inp = this.$refs.inp.$el
    const btn = this.$refs.btn.$el
    console.log(inp)
    const that = this
    const op = {
      leading:false, // 禁用首次执行
      trailing:true
    }
    // 节流 
    inp.addEventListener('input',_throttle3(that.searchInp,2000,op)) 
    btn.addEventListener('click',_throttle(that.searchInp,1000)) 
  },
  methods: {
    /**
     * ajax
     */
  searchInp() {
    // ajax
    console.log(this.key)
  }
  }
}
</script>
