<template>
  <div>
    <div class="">
      <vx-button type="primary" @click="handleAdd">
        组件
      </vx-button>
      组件：{{currentVal}}
    </div>
  </div>
</template>
<script>
export default {
  name:'vxModel',
  props: {
    value:{
      type: Number
    }
  },
  data() {
    return {
      currentVal:this.value
    }
  },
  mounted() {
  },
  methods: {
    handleAdd(){
      this.currentVal++ 
      this.$emit('input',this.currentVal)
    }
  },
  watch: {
    value:{
      handler: function (n) {
       this.currentVal = n
      },
      immediate: true
    }
  }
}
</script>
