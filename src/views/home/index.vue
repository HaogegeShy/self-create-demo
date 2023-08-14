<script lang="ts" setup>
import { RouterView } from "vue-router"

</script>

<template>
    <div class="home">
        <div>我是首页------ </div>
        <RouterView/>
    </div>
</template>

<style lang="less" scoped>

.home{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>