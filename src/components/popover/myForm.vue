<!-- myForm.vue -->
<!-- 里面的可以都换成自己的 -->
<template>
    <myPopover :show="dialogVisible" @out="handleClickCancel">
        <el-form label-width="100px" ref="formRef" :model="formData" :rules="formRules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" />
            </el-form-item>
        </el-form>
        <span>
            <el-button @click="handleClickCancel">取消</el-button>
            <el-button type="primary" @click="submitForm"> 确认 </el-button>
        </span>
    </myPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import myPopover from './myPopover.vue';

// 定义props
const {
    title,
    text,
    options
} = defineProps({
    title: {
        type: String,
        default: '标题',
    },
    text: {
        type: String,
        default: '文本',
    },
    options: {
        type: Object,
        default: {
            type: 'success',
            showIcon: true,
        }
    }
});
// 定义emits
const emit = defineEmits(['submit', 'closed']);

// 定义表单数据
let dialogVisible = ref(false);
let formData = ref({
    username: '',
    password: '',
});
let formRef = ref();
let formRules = ref({
    username: [{
        required: true,
        message: '请输入账号',
        trigger: 'blur',
    },],
    password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur',
    },],
});

// 重置表单
function resetForm() {
    formData.value = {
        username: '',
        password: '',
    };
}

// 点击确定
function submitForm() {
    formRef.value.validate((valid) => {
        if (valid) {
            dialogVisible.value = false;
            emit('submit', JSON.parse(JSON.stringify(formData.value)));
        }
    });
}

// 点击取消
const handleClickCancel = () => {
    dialogVisible.value = false;
    emit('closed');
}

defineExpose({
    showDialog: () => {
        resetForm();
        dialogVisible.value = true;
    },
    hideDialog: () => {
        dialogVisible.value = false;
    },
});
</script>
<style lang="less" scoped>
.url-enter-active,
.url-leave-active {
    transition: opacity 0.5s;
}

.url-enter-from,
.url-leave-to {
    opacity: 0;
}

.url-leave-from,
// 离开前,进入后透明度是1
.url-enter-to {
    opacity: 1;
}

.urlPopover-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: radial-gradient(transparent 1px, #e685dc1f 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    -webkit-backdrop-filter: saturate(50%) blur(4px);

    .urlPopover-inner {
        width: 559px;
        height: 280px;
        border-radius: 20px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: var(--main-shadow-glass);
    }
}
</style>
