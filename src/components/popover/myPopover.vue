<script lang="ts" setup>
import { computed, type CSSProperties} from 'vue';
// https://blog.csdn.net/weixin_44815800/article/details/131962057
// https://zhuanlan.zhihu.com/p/624535566


interface Props {
    show: boolean,
    customStyle?:CSSProperties
}
const props = withDefaults(defineProps<Props>(), {
    show: false,
    customStyle: () => ({}),
})
const emit = defineEmits(["out"])
const handleClickOut = () => {
    emit("out")
}

// 返回props中传递过来的样式对象
const styles = computed(() => {
  return {
    ...props.customStyle,
  } as CSSProperties;
});
</script>

<template>
    <div class="urlPopover">
        <transition name="url">
            <div class="urlPopover-modal point-blur" v-if="props.show"  @click.self="handleClickOut">
                <div class="urlPopover-inner" :style="styles">
                    <slot></slot>
                    <slot name="footer"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="less" scoped>
.url-enter-active,
.url-leave-active {
    transition: opacity 0.5s;
}

.url-enter-from,
.url-leave-to {
    opacity: 0;
}

.url-leave-from, // 离开前,进入后透明度是1
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

        .inner-out {
            height: 20px;
            width: 100%;
            position: relative;

            div {
                cursor: pointer;
                font-size: 24px;
                position: absolute;
                right: 20px;
                top: 10px;
            }
        }

        .inner-title {
            font-size: 24px;
            font-weight: 500;
            color: #3b2b84;
            line-height: 34px;
        }

        .inner-info {
            width: 180px;
            font-size: 18px;
            font-weight: 400;
            color: #3b2b84;
            line-height: 25px;
            margin-top: 20px;
            text-align: center;
        }
        .inner-input {
            margin-top: 40px;
            display: flex;
            width: 400px;
            gap: 10px;
            .col1 {
                border-radius: 10px;

                width: 150px;
                border: 1px solid #4e52b6;
            }
            .col2 {
                border-radius: 10px;

                width: 250px;
                border: 1px solid #4e52b6;
            }
        }

        .inner-buttonbox {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 30px;
            gap: 60px;
        }

        .inner-button {
            cursor: pointer;
            width: 180px;
            height: 40px;
            border-radius: 20px;
            background-color: #fff;
            border: 1px solid #8b8dc8;
            color: #8b8dc8;
            font-size: 20px;
            font-weight: 500;
            margin-top: 15px;
        }

        .urlSelectBtn {
            background-image: var(--linear-gradient5);
            color: #fff;
            border: none;
        }
    }
}
</style>
