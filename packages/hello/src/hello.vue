<template>
  <div class="v-hello">
      <p class="v-hello_message"> hello {{message}}</p>
  </div>
</template>
<script>
export default {
  name:'vx-hello',
  props:{
      message:String
  }
}
</script>

