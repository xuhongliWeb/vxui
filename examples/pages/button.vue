<template>
  <div class="">
    <vx-button></vx-button>
    <vx-button type="primary"></vx-button>
    <vx-button type="info"></vx-button>
    <vx-button type="success"></vx-button>
    <vx-button type="warning"></vx-button>
    <vx-button type="dange"></vx-button>
    <hr>
    <vx-button type="info" round></vx-button>
    <vx-button type="success" round></vx-button>
    <vx-button type="warning" round></vx-button>
    <vx-button type="dange" round></vx-button>
    <hr>
    <vx-button type="warning" icon="icon"></vx-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'bbbbbbbbbbbbbbbbbbbb'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button{
    margin: 5px 0
  }
</style>