<template>
  <div>
     <vx-button type="primary" @click="handleAdd">
        组件
      </vx-button>
      组件：{{currentVal}}
  </div>
</template>
<script>
export default {
  name:'vxModel2',
  props: {
    number: {
      type: Number
    },
  },
  model: {
    prop: 'number',
    event: 'message'
  },
  data() {
    return {
      currentVal: this.number
    }
  },
  methods: {
    handleAdd(){
      this.currentVal++ 
      this.$emit('message',this.currentVal)
    }
  },
  watch: {
    number: {
      handler: function (n) {
        this.number = n
      },
      immediate: true
    }
  }
}
</script>