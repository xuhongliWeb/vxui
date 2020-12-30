<template>
  <div :class="[
  'vx__input',
  {
  'have-prefix-icon':prefixIcon,
  'have-suffix-icon':suffixIcon
  }
  ]">
    <textarea
      v-if="type === 'textarea'"
      :disabled="disabled"
      class="input__textarea-inner c-normal c-size-m"
      :value="inputVal"
      v-on="inputListeners"
    />
    <template v-else>
      <span v-if="prefixIcon" class="input__icon" :name="prefixIcon" >
        图标
      </span>
      <slot name="prepend"></slot>
        <input 
        :type="type" 
        :disabled="disabled" 
        v-bind="$attrs" 
        v-on="inputListeners"
        :value="inputVal" 
        :class="['vx__input-field', 
        {
          'have-prepand': havePrepand,
          'have-append': haveAppend
          }]"
         placeholder="请输入..." />  
      <slot name="append"></slot>
        <span v-if="suffixIcon" class="input__icon" :name="suffixIcon" >
        图标
      </span>
    </template>
  </div>
</template>
<script>
/**
 * Vue 提供了一个 $listeners 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。
 */
export default {
  name: 'vxInput',
  props: {
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      defalut: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      defalut: ''
    },
    model: {
      prop: 'value',
      event: 'input' // input
    }
  },
  data() {
    return {
      inputVal: ''
    }
  },
  created() {
    console.log(this.$listeners, 'crated')
  },
  computed: {
    havePrepand() {
      return this.$slots.prepend;
    },
    haveAppend() {
      return this.$slots.append;
    },
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: event => this.$emit('input', event.target.value)
      })
    }
  },
  watch: {
    value: {
      handler: function(n, o) {
        this.inputVal = n
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'packages/vxui-css/src/common/variable.scss';

.vx__input {
  width: 100%;
  display: flex;
  align-items: center;
  &.have-prefix-icon {
    padding-left: 40px;
  }
  &.have-suffix-icon {
    padding-right: 40px;
  }
  &-field {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: $primaryColorTxt;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 1px solid $infoColor;
    resize: none;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }
}
</style>
