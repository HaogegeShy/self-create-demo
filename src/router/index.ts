import {createRouter,createWebHistory} from "vue-router"
import { errRouter } from "@/router/errRouter"


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/",
            redirect: "/home",
        },
        {
            path:"/home",
            name:"home",
            component:()=>import("@/views/home/index.vue"),
            children:[
               {
                    path:"dataPiker",
                    name:"dataPiker",
                    component:()=>import("@/components/DatePiker.vue")
               },{
                    path:"hello",
                    name:"hello",
                    component:()=>import("@/components/HelloWorld.vue")
               },{
                    path:"upload",
                    name:"upload",
                    component:()=>import("@/components/upload/index.vue")
               },{
                    path:"drag",
                    name:"drag",
                    component:()=>import("@/components/drag.vue")
               }
            ]
        },{
            path:"/other",
            name:"other",
            component:()=>import("@/views/other/index.vue"),
        },
        
        ...errRouter
    ]
})



export default router