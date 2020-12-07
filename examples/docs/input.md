## Input
** Input 组件,Input 组件 **
###基本用法
```html
<template>
    <div class="Input-page">
        <v-Input message="my component library" @click="handleClick"></v-Input>
        <p>{{msg}}</p>
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
|参数     |说明      | 类型   | 可选值   | 默认值   |
|---------|--------|--------|--------|--------|
|message | 文本信息   | string | - | Input
### Events
|事件名称|说明|会调参数|
|---------|-------|-----|
|click|点击操作| - |