<!-- index.vue -->
<template>
    <div>
        <el-button  @click="open">调用</el-button>
    </div>
</template>

<script lang="ts" setup>
    import { myMsgBox } from '@/components/popover/myMsgBox';
    function open() {
        myMsgBox('我是文本', '我是标题', {
            showIcon:true,
            type:'success',
        }).then((data)=>{
            console.log('then中获取值',data);
        }).catch(()=>{
            console.log('catch就是关闭弹窗');
        })
    }
   
</script>

