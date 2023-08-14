<script setup lang="ts">
import { computed, ref } from "vue"
import { vOnClickOutside } from "@vueuse/components"

const dateValue = ref("")

const showDateSelect = ref(false)

//点击输入框
const handleClickInput = () => {
    showDateSelect.value = !showDateSelect.value
}

//关闭日期选择
const closeDateSelect = () => {
    showDateSelect.value = false
}

const yearOption = Array.from({ length: 100 }, (v, i) => i + 1950)
const monthOption = Array.from({ length: 12 }, (v, i) => i + 1)

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)

//获取当前月有多少天
const getMonthDays = computed(() => {
    return new Date(year.value, month.value, 0).getDate()
})

//获取当前月的第一天是星期几
const getFirstDayWeek = computed(() => {
    return new Date(year.value, month.value - 1, 1).getDay()
})

console.log(getFirstDayWeek );

//42-(当前月的天数+当前月的第一天是星期几)
const getLastDays = computed(() => {
    return 42 - (getMonthDays.value + getFirstDayWeek.value)
})

//上一个月有多少天
const getLastMonthDays = computed(() => {
    return new Date(year.value, month.value - 1, 0).getDate()
})

// render use 上一个月的天
const lastMonthDay = computed(() => {
    return Array.from({ length: getFirstDayWeek.value }, (v, i) => getLastMonthDays.value - i).reverse()
})

//render use 当前月
const currentMonthDay = computed(() => {
    return Array.from({ length: getMonthDays.value }, (v, i) => i + 1)
})

//render use 下一个月
const nextMonthDay = computed(() => {
    return Array.from({ length: getLastDays.value }, (v, i) => i + 1)
})

//引入day.js
import dayjs from "dayjs"
//获取年月
const getMonthAndYear = () => {
    return {
        year: year.value,
        month: month.value,
    }
}

//点击上一个月
const handleClickLastDay = (i) => {
    dateValue.value = dayjs(`${year.value}-${month.value - 1}-${i}`).format("YYYY-MM-DD")
    closeDateSelect()
   
}

//点击下一个月
const handleClickCurrentDay = (i) => {
    dateValue.value = dayjs(`${year.value}-${month.value}-${i}`).format("YYYY-MM-DD")
    closeDateSelect()
}

const handleClickNextDay = (i) => {
    dateValue.value = dayjs(`${year.value}-${month.value + 1}-${i}`).format("YYYY-MM-DD")
    closeDateSelect()
}
</script>
    
<template>
    <div class="time-box">
        <div class="time-inner" v-on-click-outside.bubble="closeDateSelect">
            <input class="time-input" type="text" v-model="dateValue" @click="handleClickInput" />
            <div v-if="showDateSelect" class="time-select-dropdown">
                <div class="time-select-dropdown-inner">
                    <div class="select-box-select">
                        <select v-model="year">
                            <option value="">请选择年</option>
                            <option v-for="option in yearOption" :value="option">{{ option }}</option>
                        </select>
                        <select v-model="month">
                            <option value="">请选择月</option>
                            <option v-for="option in monthOption" :value="option">{{ option }}</option>
                        </select>
                    </div>

                    <div class="select-day">
                        <div class="week">
                            <span v-for="i in 7">星期{{ i }}</span>
                        </div>
                        <div class="day">
                            <span @click="handleClickLastDay(i)" class="last-month-day" v-for="i in lastMonthDay" :key="i">{{ i }}</span>
                            <span @click="handleClickCurrentDay(i)" class="current-month-day" v-for="i in currentMonthDay" :key="i">{{ i }}</span>
                            <span @click="handleClickNextDay(i)" class="next-month-day" v-for="i in nextMonthDay" :key="i">{{ i }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.time-box {
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e3e3e3;

    .time-inner {
        position: relative;

        .time-input {
            //TODO: input的宽度
            width: 300px;
        }
    }

    .time-select-dropdown {
        width: 100%;
        min-width: 300px;
        height: 300px;
        position: absolute;
        top: 100%;
        left: 0;

        .time-select-dropdown-inner {
            width: 100%;
            height: 210px;
            background-color: #000000;
            border-radius: 12px;
            color: #fff;

            .select-box-select {
                padding-left: 12px;
                display: flex;
                gap: 12px;
            }

            .week {
                display: flex;
                justify-content: space-between;
            }

            .day {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(6, 1fr);

                padding-top: 12px;

                //不可选择
                user-select: none;
                cursor: pointer;

                & > span {
                    width: 100%;
                    height: 24px;
                    text-align: center;
                }

                .last-month-day {
                    color: #999999;
                }

                .current-month-day {
                    color: #fff;
                }

                .next-month-day {
                    color: #999999;
                }
            }
        }
    }
}
</style>
