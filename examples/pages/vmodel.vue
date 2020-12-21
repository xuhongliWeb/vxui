<template>
  <div>
    <div class="box">
      <vx-model v-model="model"></vx-model>
      <p>
          page: {{model}}
      </p>
    </div>
    <hr>
    <div class="box">
       <vx-model2 v-model="model2"></vx-model2>
      <p>
          page: {{model2}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: 0,
      model2:0
    }
  },
  methods: {

  }
}
</script>
