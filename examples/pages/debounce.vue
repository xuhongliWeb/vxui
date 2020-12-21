<template>
  <div>
    防抖
    <div>

    </div>
    <vx-input v-model="key" ref="inp" />
    <vx-button ref="btn">搜索</vx-button>
  </div>
</template>
<script>
import {_debounce4} from 'lib/utils'
import { debounce } from "underscore";

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
    // 防抖 
    inp.addEventListener('input',debounce(that.searchInp,2000,true)) 
    btn.addEventListener('click',_debounce4(that.searchInp,1000,true)) 
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
