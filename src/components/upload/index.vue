<script lang="ts" setup>
import { computed, ref } from "vue"
// 图片上传组件
import uploadPicture from "./upload-picture.vue"
import { ElNotification } from 'element-plus'
import plusIcon from "@/assets/other/plus-icon.vue"
import {
  Delete
} from '@element-plus/icons-vue'
const avatar = ref(null)
// 用于裁剪组件处理的图片
const imgToPreview = ref<string>("")

// 图片上传完成
const onUploadImg = (img) => {
    imgToPreview.value = img
    changeCropperVisiable()
}

// 控制裁剪组件的显示
const showCropper = ref<boolean>(false)
const changeCropperVisiable = () => {
    showCropper.value = !showCropper.value
}

const uploadImgAfterCrop = (img) => {
    imgList.value?.push(
        {   
            id: Date.now(),
            url: img,
            selected: false,
        }
    )
    changeCropperVisiable()
}
// 获取图片列表
interface IimgList {
    url: string
    selected: boolean
    id: number
}
const imgList =ref<IimgList[]>([])
// 保存之前选中过的item
const beforeSelectItem = ref<any>()

// 选择一个图片
const selectImg = (index:number, isHandler = false) => {
    beforeSelectItem.value = imgList.value![index]
    // 其他的照片都设置为未选中
    imgList.value!.forEach((item) => {
        item.selected = false
    })
    imgList.value[index].selected = true

    if (isHandler) {
        ElNotification.success({
            title: "提示",
            message: "选择照片成功",
            duration: 1000,
        })
    }
}

// 预览图片列表
const previewImgList = computed(() => {
    return imgList.value?.map((item) => item.url)
})

// 删除图片
const delImg = (id) => {
    imgList.value = imgList.value?.filter((item) => item.id !== id)
    ElNotification.success({
        title: "提示",
        message: "删除成功！",
        duration: 1000,
    })
}
</script>

<template>
    <div>
        <!-- 图片上传组件 -->
        <uploadPicture @onUpload="onUploadImg" />

        <!-- 图片裁剪组件 -->
        <cropPicture v-model:visible="showCropper" :img="imgToPreview" @confirm="uploadImgAfterCrop"
            @back="changeCropperVisiable" @close="changeCropperVisiable" />

        <!-- 头像展示列表 -->
        <div class="img-list" v-if="imgList?.length">
            <div class="img-list-box" :class="{ 'img-selected': item.selected }" v-for="(item, index) in imgList"
                :key="index">
                <!-- <img :src="item.url" alt="头像" @click.self="selectImg(index, true)" /> -->
                <img :src="item.url" @click.self="selectImg(index, true)" alt="头像"/>
                <div class="mask">
                    <div class="mask-container">
                        <div class="plus flex-center">
                            <plusIcon />
                            <el-image :preview-src-list="previewImgList" preview-teleported :src="item.url" />
                        </div>
                        <el-button @click="delImg(item.id)" type="danger" :icon="Delete" circle />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-list {
    display: flex;
    gap: 8px;
    padding: 18px 15px 17px;
    border: 1px solid var(--main-color-white);
    border-radius: var(--radius-xm);
    margin-top: 8px;

    .img-list-box {
        width: 20%;
        border-radius: var(--radius-ss);
        overflow: hidden;
        position: relative;
        max-width: 164px;
        cursor: pointer;
        border: 2px solid transparent;

        img {
            width: 100%;
            vertical-align: middle;
        }

        .mask {
            position: absolute;
            right: -30px;
            bottom: 0px;
            width: 30px;
            display: block;
            transition: all 0.2s ease;

            .mask-container {
                width: 100%;
                height: 100%;

                .plus {
                    width: 24px;
                    height: 24px;
                    border-radius: var(--radius-ss);
                    background-color: rgba(184, 184, 184, 0.4);
                    color: var(--main-color-white);
                    backdrop-filter: blur(10px);
                    cursor: pointer;
                    margin-bottom: 4px;
                    transition: width 0.3s ease;

                    &:hover {
                        background-color: var(--main-color-white);
                        color: var(--main-title2-color);
                    }

                    svg {
                        width: 90%;
                        height: 90%;
                    }

                    .slide-box {
                        width: 0;
                        position: absolute;
                        height: 100%;
                        transition: width 0.2s ease;
                        background-color: var(--main-title-color);
                        font-size: 12px;
                        // 文字不换行
                        white-space: nowrap;
                        color: var(--main-color-white);
                        line-height: 24px;

                        right: 24px;
                        border-radius: var(--radius-xs) 0 0 var(--radius-xs);
                        overflow: hidden;
                    }
                }

                .plus {
                    overflow: hidden;

                    :deep(.el-image) {
                        width: 28px;
                        height: 28px;
                        position: absolute;
                        opacity: 0;
                    }
                }
            }
        }

        &:hover {
            .mask {
                right: 0px;
            }
        }
    }

    .img-selected {
        border: 2px solid pink;
    }
}</style>