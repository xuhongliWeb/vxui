## Input
** Input 组件,Input 组件 **
###基本用法
```html
<template>
    <div class="Input-page">
      <vx-Input  @click="handleClick"></vx-Input>
      <vx-Input type="textarea" @click="handleClick"></vx-Input>
    </div>
</template>
<script>
    export default {
        name:'my-Input',
        data(){
            return {
              msg:'Input'
            }
        },
        methods:{
            handleClick(){
                this.msg = msg
            }
        }
    }
</script>
```
### Attributes
参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | ---
`type` | 类型 | String | text，textarea 和其他 原生 input 的 type 值 | text
`prefix-icon` | 输入框头部图标 | String | - | -
`suffix-icon` | 输入框尾部图标 | String | - | -
### Events
|事件名称|说明|会调参数|
--- | --- | --- | 
`change` | 在 Input 值改变时触发 | event