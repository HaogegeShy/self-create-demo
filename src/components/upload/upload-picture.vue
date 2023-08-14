<script lang="ts" setup>
import { ref } from "vue"
import uploadIcon from '@/assets/icon/uploadImg.vue'
import { genFileId } from "element-plus"
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus"
import { ElNotification } from 'element-plus'

/* ____________________________________图片上传____________________________________ */

// 派发事件
const emit = defineEmits(["onUpload"])

// 图片上传组件ref
const uploadRef = ref<UploadInstance>()
//上传图片时的钩子
const uploadChange = (file: any, List: any) => {
    // 判断是否超出 3M
    if (file.size > 1048576 * 3) {
        List.pop()
        ElNotification({
            title:"提示",
            message: `您上传的${file.name}文件大于3M，请您重新上传。`,
            duration: 1000,
        })
        return
    }
    // 判断文件类型是否为图片类型
    const isImage = file.raw.type.startsWith("image/")
    if (!isImage) {
        List.pop()
        ElNotification({
            title:"提示",
            message:"只能上传图片类型的文件",
            duration: 1000,
        })

        return
    }
    // 派发出来用于裁剪组件处理的图片
    emit("onUpload", URL.createObjectURL(file.raw))
}
// 用于替换之前一张
const handleExceed: UploadProps["onExceed"] = (files) => {
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
}
</script>

<template>
    <!-- 图片上传组件 -->
    <el-upload
        action="#"
        drag
        ref="uploadRef"
        :auto-upload="false"
        :limit="1"
        :show-file-list="false"
        @change="uploadChange"
        @exceed="handleExceed"
        @remove="() => {}"
        class="upload-com"
        accept="image/*"
    >
        <div class="clickZoom">
            <div class="upload-icon">
                <uploadIcon />
            </div>
            <div class="upload-desc">
                <p>点击上传 / 拖拽到此区域</p>
                <p class="size-limit">图片应小于3M</p>
            </div>
        </div>
    </el-upload>
</template>

<style lang="less" scoped>
// 文件上传组件
.upload-com {
    height: 126px;
    background-color: var(--main-color-white);
    border-radius: 10px;
    :deep(.el-upload--text) {
        width: 100%;
        height: 100%;
        .el-upload-dragger {
            padding: 20px;
            border: 1px dashed transparent;
            &:hover {
                border: 1px dashed var(--main-tip-color);
            }
        }
    }
    .clickZoom {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .upload-icon {
            color: var(--main-title2-color);
            margin-bottom: 14px;
        }
        .upload-desc {
            color: var(--main-title2-color);
            p {
            }
            .size-limit {
                margin-top: 10px;
                font-size: 14px;
            }
        }
    }
}
</style>
