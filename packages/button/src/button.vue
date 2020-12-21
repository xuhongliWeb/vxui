<template>
  <component :is="tag" class="vx-button" :class="[type ? 'vx-button-'+type : '',{'is-round':round},{'is-disabled': disabled}]" @click="event => !disabled && $emit('click',event)">
     <i :class="icon" v-if="icon"></i>
     <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'vx-button',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'default'
    },
    round:Boolean,
    icon:{
        type:String,
        default:''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'packages/vxui-css/src/common/variable.scss';

.vx-button {
  display: inline-block;
  line-height: 1;
  padding: 12px 20px;
  outline: 0;
  white-space: nowrap;
  border: 1px solid #dcdfe6;
  background: #fff;
  color: $infoColor;
  font-size: 12px;
  border-radius: 4px;
  transition: all .5s ease;
  &:active{
      transform: scale(.2)
  }
  &.is-round{
      border-radius: 20px;
  }
  &.is-disabled {
    border-color:#ccc;
    background-color: #ccc;
  }
}
.vx-button-primary{
    color: #fff;
    background-color: $primaryColor;
    border-color: $primaryColor
}
.vx-button-info{
    color: #fff;
    background-color: $infoColor;
    border-color: $infoColor
}
.vx-button-success{
    color: #fff;
    background-color: $successColor;
    border-color: $successColor
}
.vx-button-warning{
    color: #fff;
    background-color: $warningColor;
    border-color: $warningColor
}
.vx-button-dange{
    color: #fff;
    background-color: $dangerColor;
    border-color: $dangerColor
}
</style>
