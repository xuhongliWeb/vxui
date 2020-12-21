## 测试v-model 
** Hello 组件,Hello 组件 **
###基本用法
```html
<template>
    <div class="hello-page">
        <v-hello message="my component library" @click="handleClick"></v-hello>
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default {
        name:'my-hello',
        data(){
            return {
                msg:'hello'
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
|message | 文本信息   | string | - | hello
### Events
|事件名称|说明|会调参数|
|---------|-------|-----|
|click|点击操作| - |