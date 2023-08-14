<template>
    <div>
        <!-- chosen-class 为拖拽时的样式。 -->
        <draggable :list="state.list" :force-fallback="true" chosen-class="chosen" animation="300" @end="onEnd">
            <template #item="{ element }">
                <div class="item">
                    {{ element.name }}
                </div>
            </template>
        </draggable>
    </div>
</template>

<script lang="ts" setup>
import { reactive} from 'vue';
import draggable from 'vuedraggable';

const state = reactive<any>({
    list: [
        {
            id: 1,
            name: '张三',
        },
        {
            id: 2,
            name: '李四',
        },
        {
            id: 3,
            name: '王五',
        },
        {
            id: 3,
            name: '老六',
        },
        {
            id: 3,
            name: '老七',
        },
        {
            id: 3,
            name: '王八',
        }
    ],
});
function onEnd() {
    console.log(state.list);
}
</script>
<style lang="less">
.chosen {
    background: #d5d3d7;
}

.item {
    width: 200px;
    height: 32px;
    line-height: 32px;
    background: #7bb3eb;
    margin-bottom: 10px;
}
</style>
