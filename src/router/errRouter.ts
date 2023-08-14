import type { RouteRecordRaw } from "vue-router"

export const errRouter: Array<RouteRecordRaw> = [
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/error/404.vue"),
        meta: {
            title: "404",
        },
    },
]