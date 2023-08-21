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
        <!-- 原生js实现拖拽排序 -->
        <TransitionGroup name="list" tag="div" class="container">

            <div
            class="item2"
            v-for="(item, i) in drag.list"
            :key="item.id"
            draggable="true"
            @dragstart="dragstart($event, i)"
            @dragenter="dragenter($event, i)"
            @dragend="dragend"
            @dragover="dragover"
            >
            {{ item.name }}
            </div>
        </TransitionGroup>
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
// ---------------------------------------原生js实现拖拽排序---------------------------------------
const drag = reactive({
	list: [
		{ name: 'a', id: 1 },
		{ name: 'b', id: 2 },
		{ name: 'c', id: 3 },
		{ name: 'd', id: 4 },
		{ name: 'e', id: 5 },
	]
})

let dragIndex = 0

function dragstart(e, index) {
	e.stopPropagation()
	dragIndex = index
	setTimeout(() => {
		e.target.classList.add('moveing')
	},0)
}
function dragenter(e, index) {
	e.preventDefault()
	// 拖拽到原位置时不触发
	if (dragIndex !== index) {
		const source = drag.list[dragIndex];
		drag.list.splice(dragIndex, 1);
		drag.list.splice(index, 0, source);

		// 更新节点位置
		dragIndex = index
	}
}
function dragover(e) {
	e.preventDefault()
	e.dataTransfer.dropEffect = 'move'
}
function dragend(e) {
	e.target.classList.remove('moveing')
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
.item2 {
	width: 200px;
	height: 40px;
	line-height: 40px;
	// background-color: #f5f6f8;
	background-color: skyblue;
	text-align: center;
	margin: 10px;
	color: #fff;
	font-size: 18px;
}

.container {
  position: relative;
  padding: 0;
}

.moveing {
	opacity: 0.5;
}

.list-move, /* 对移动中的元素应用的过渡 */
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
}
</style>
