<template>
  <div class="box">
    <vx-input attr="attr" v-model="inputM" v-on:focus="handleBaseInputFocus" />
     <span class="c-size-s">输入内容为：{{ inputM }}</span>
     <hr>
     <vx-Input type="textarea" ></vx-Input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputM: 11,
      inputN:''
    }
  },
  methods: {
    handleBaseInputFocus(){
      
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
