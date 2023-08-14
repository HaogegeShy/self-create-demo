<script lang="ts" setup></script>

<template>
    <teleport to="body">
        <slot name="index1"></slot>
        <slot name="index2"></slot>
        <slot name="index3"></slot>
        <slot></slot>
    </teleport>
</template>

<style lang="less" scoped></style>