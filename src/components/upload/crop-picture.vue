<script lang="ts" setup>
import teleportToBody from "./teleport-tobody.vue"
import uploadIcon from '@/assets/icon/uploadImg.vue'
//点击外部
import { vOnClickOutside } from "@vueuse/components"
// 图片裁剪
import "vue-cropper/dist/index.css"
import { VueCropper } from "vue-cropper"
import { ref } from "vue"

const Props = defineProps({
    // 用于裁剪的图片
    img: {
        type: String,
        default: "",
    },
    visible: {
        type: Boolean,
        default: false,
    },
})

// 描述
const description = [
    {
        title: "简历照片上传原则：",
        content: ["1. 民企/国企推荐放照片，外企不建议上传照片； ", "2. 中文简历推荐放照片，英文简历不建议上传照片； ", "3. 推荐使用证件照/职业照，不建议上传生活照。"],
    },
    {
        title: "照片上传格式建议：",
        content: [
            "1. 剪裁：头部上方空一定距离，下面要露到肩膀左右，不要剪裁成大头照；",
            "2. 底色：白色、蓝色或灰色，红色一般不推荐； ",
            "3. 发型：长发盘起来；短发梳好，尽可能不要遮挡脸部，避免头发凌乱； ",
            "4. 表情：微笑即可，不要特别严肃也不要大笑；",
            "5. 着装：申请严肃的行业（如金融）建议西装（男生配领带；女生不必）；互联网行业建议深色衬衫或T恤。",
        ],
    },
]
// 示例照片
const exampleImg = [
    new URL("@/assets/other/example-img.png", import.meta.url).href,
    new URL("@/assets/other/example-img.png", import.meta.url).href,
    new URL("@/assets/other/example-img.png", import.meta.url).href,
]

// 派发事件
const emit = defineEmits(["confirm", "close", "back", "update:visible"])

// 用于预览的图片
const imgToPreview1 = ref<any>(null)

// 图片裁剪的ref
const cropper = ref<any>(null)
// 图裁剪组件选项
const cropperOption = ref({
    outputSize: 1,
    outputType: "webp", //裁剪生成图片的格式
    full: false, //是否输出原图比例的截图
    canMove: true, //上传图片是否可以移动
    canMoveBox: false, //截图框能否拖动
    fixedBox: false, //固定截图框大小
    original: true, //上传图片按照原始宽高
    autoCrop: true, //是否默认生成截图框
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: 300, //默认生成截图框宽度
    autoCropHeight: 420, //默认生成截图框高度
    centerBox: false, //截图框是否被限制在图片里面
    high: true, //是否按照设备的dpr 输出等比例图片
    maxImgSize: 2000, //限制图片最大宽度和高度
    fixed: true, //是否开启截图框宽高固定比例
    fixedNumber: [5, 7], //截图框的宽高比例
    mode: "100%", //图片默认渲染方式
})

// 图片实时预览事件
const realTime = () => {
    // 没上传过图片就返回
    if (!Props.img) {
        return
    }
    cropper.value.getCropBlob((data: any) => {
        // 生成预览的图片
        imgToPreview1.value = URL.createObjectURL(data)
    })
}

// 图片移动回调函数
const imgMoving = () => {}
// 截图框移动回调函数
const cropMoving = () => {}
// 图片加载的回调
const imgLoad = () => {}

// 确认
const confirm = () => {
    // 没上传过图片就返回
    if (!Props.img) {
        return
    }
    // cropper.value.getCropBlob(async (data: any) => {
    //     // 转换成filea
    //     const webpData = BlobToFile(data, +new Date() + ".webp")
    //     // 派发事件
    //     console.log(data);
        
    //     emit("confirm", webpData)
    // })

    //获得图片的二进制数据
    cropper.value.getCropData(async (data: any) => {
       
        // 派发事件
        emit("confirm", data)
    })
}
// 点击关闭
const closeFn = () => {
    emit("update:visible", false)
}
// 点击返回
const backFn = () => {
    emit("update:visible", false)
}

// Blob转file
const BlobToFile = (blob, fileName?) => {
    const file = new File([blob], fileName, { type: blob.type })
    return file
}

// slider的值
const sliderValue = ref(50)
const tempValue = ref(0)

// slider的拖动事件
const sliderChange = (val: number) => {
    //如果这一次的数值比上一次大，则放大图片，反之缩小图片
    if (val > tempValue.value) {
        cropper.value.changeScale(2)
    } else {
        cropper.value.changeScale(-2)
    }
    tempValue.value = val
}
</script>

<template>
    <teleportToBody>
        <div class="Popover-modal point-blur" v-show="visible">
            <div class="crop-picture glass-bg" v-on-click-outside="closeFn">
                <div class="crop-picture-hd">
                    <div class="icon"><uploadIcon /></div>
                    <div class="title">裁剪图片</div>
                    <div class="close no-select" @click="closeFn">×</div>
                </div>
                <!-- 图片裁剪组件 -->
                <div class="vue-cropper">
                    <div class="cropper-container">
                        <VueCropper
                            ref="cropper"
                            :img="Props.img"
                            :output-size="cropperOption.outputSize"
                            :output-type="cropperOption.outputType"
                            :info="true"
                            :full="cropperOption.full"
                            :fixed="cropperOption.fixed"
                            :fixed-number="cropperOption.fixedNumber"
                            :can-move="cropperOption.canMove"
                            :can-move-box="cropperOption.canMoveBox"
                            :fixed-box="cropperOption.fixedBox"
                            :original="cropperOption.original"
                            :auto-crop="cropperOption.autoCrop"
                            :auto-crop-width="cropperOption.autoCropWidth"
                            :auto-crop-height="cropperOption.autoCropHeight"
                            :center-box="cropperOption.centerBox"
                            :high="cropperOption.high"
                            :max-img-size="cropperOption.maxImgSize"
                            :mode="cropperOption.mode"
                            @real-time="realTime"
                            @img-load="imgLoad"
                            @crop-moving="cropMoving"
                            @img-moving="imgMoving"
                            class="cropper"
                        >
                        </VueCropper>
                        <div class="changeSizeBox">
                            <div
                                class="reduce"
                                @click="
                                    () => {
                                        cropper.changeScale(-2)
                                    }
                                "
                            >
                                -
                            </div>
                            <el-slider :class="'slider'" @input="sliderChange" v-model="sliderValue" :show-tooltip="false" />
                            <div
                                class="add"
                                @click="
                                    () => {
                                        cropper.changeScale(2)
                                    }
                                "
                            >
                                +
                            </div>
                        </div>
                        <div class="operator">
                            <button @click="backFn">重新上传</button>
                            <button @click="confirm">确定</button>
                        </div>
                    </div>

                    <div class="preview-container">
                        <div class="hd">
                            <div class="preview-title">效果预览</div>
                        </div>
                        <div class="bd">
                            <div class="preview">
                                <div class="preview-img1">
                                    <img :src="imgToPreview1" alt="" />
                                </div>
                            </div>
                            <div class="desc">
                                <div class="desc-list" v-for="(item, index) in description" :key="index">
                                    <div class="title">{{ item.title }}</div>
                                    <p class="content" v-for="(iten, index) in item.content" :key="index">{{ iten }}</p>
                                </div>
                            </div>
                            <div class="example">
                                <div class="title">示例照片</div>
                                <div class="example-img-list">
                                    <img v-for="(img, index) in exampleImg" :src="img" alt="" :key="index" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleportToBody>
</template>

<style lang="less" scoped>
.Popover-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.crop-picture {
    width: 863px;
    background-color: #fbf4ff;
    border: 1px solid var(--main-color-white);
    overflow: hidden;
    box-shadow: var(--main-shadow-item);
    .crop-picture-hd {
        height: 76px;
        background-color: rgba(255, 255, 255, 0.4);
        display: flex;
        align-items: center;
        font-size: 24px;
        color: var(--main-title2-color);
        padding: 0 20px 0 34px;
        .icon {
            margin-right: 17px;
        }
        .close {
            margin-left: auto;
            cursor: pointer;
            font-size: 30px;
            color: var(--main-content-color);
        }
    }
    .vue-cropper {
        display: flex;
        padding: 12px;
        gap: 40px;
        .cropper-container {
            width: 396px;
            padding: 48px;
            padding-bottom: 16px;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: var(--radius-md);
            .cropper {
                width: 300px;
                height: 420px;
            }
            .changeSizeBox {
                display: flex;
                align-items: center;
                margin-bottom: 40px;
                margin-top: 16px;
                gap: 16px;
                .reduce,
                .add {
                    font-size: 24px;
                    color: var(--main-title2-color);
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                :deep(.el-slider) {
                    .el-slider__runway {
                        .el-slider__bar {
                            background-color: var(--main-title-color);
                        }
                        .el-slider__button {
                            border: 0px;
                            box-shadow: var(--main-shadow-item);
                        }
                    }
                }
            }
            .operator {
                display: flex;
                justify-content: space-between;
            }
        }
        .preview-container {
            color: var(--main-title2-color);
            .hd {
                margin-bottom: 10px;
                margin-top: 7px;
                .preview-title {
                    font-size: 16px;
                    font-weight: 600;
                }
            }
            .bd {
                .preview {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 45px;
                    .preview-img1 {
                        width: 100px;
                        height: 140px;
                        border: 1px solid var(--main-color-white);
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .desc {
                    .desc-list {
                        margin-bottom: 12px;
                        .title {
                            font-size: 10px;
                            margin-bottom: 8px;
                            font-weight: bold;
                        }
                        .content {
                            font-size: 8px;
                            line-height: 20px;
                        }
                    }
                }
                .example {
                    .title {
                        font-size: 12px;
                        margin-bottom: 8px;
                        font-weight: bold;
                    }
                    .example-img-list {
                        display: flex;
                        gap: 8px;
                        img {
                            width: 87px;
                        }
                    }
                }
            }
        }
    }
}

:deep(.vue-cropper) {
    .crop-info {
        display: none;
    }
    .cropper-view-box {
        outline: 1px solid var(--main-title2-color);
    }
    .crop-line {
        display: none;
    }
    .crop-point {
        display: none;
    }
}
</style>
