<template>
  <transition name="fade">
    <div
      :class="['message', `message-${type}`]"
      v-if="visible"
      :style="positionTop"
    >
      <van-icon :name="type" />
      <p class="message-content" v-html="content"></p>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'vxMessage',
  props: {
    type: {
      type: String,
      defalut: 'info-o'
    },
    content: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      defalut: 2000
    },
    verticalOffset: { type: Number, default: 32 }
  },
  data() {
    return {
      visible: true,
      timer: null
    }
  },

  watch: {
    visible(newValue) {
      if (!newValue) {
        console.log('watah')
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  computed: {
    positionTop() {
      return {
        top: this.verticalOffset + 'px'
      }
    }
  },
  mounted() {
    console.log(this.$el, '$el')
    document.body.appendChild(this.$el)
    this.startTimer()
   },
  destroyed() {
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close()
          this.$emit('messageClose')
        }, this.duration)
      }
    },
    destroyElement() {
      this.$destroy()
    },
    close() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border-radius:10px;
  box-shadow: 0 2px 10px 0 hsla(0, 0%, 73%, 0.2);
  background-color: #fff;
  user-select: none;
  &-content {
    margin-top: 10px;
  }
}
</style>
