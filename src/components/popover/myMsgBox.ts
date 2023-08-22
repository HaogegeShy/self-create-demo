/* myMsgBox.js */
// import ElementPlus from "element-plus"
import myForm from "./myForm.vue"
import { h, ref, createApp, render } from "vue"

export function myMsgBox(text: string, title: string, options: object) {
    return new Promise((resolve, reject) => {
        // 保存组件实例
        let myFormRef = ref()
        // 创建容器
        const mountNode = document.createElement("div")
        // 将容器插入到body内
        document.body.appendChild(mountNode)
        debugger
        const vnode = h(myForm, {
            ref: myFormRef,
            // 参数
            title: title,
            text: text,
            // 配置项
            options: options,
            // 事件
            onSubmit: (data) => {
                resolve(data)
                render(null, mountNode)
            },
            onClosed: () => {
                reject()
                render(null, mountNode)
            },
        })
        // 2. render 渲染组件到body中
        render(vnode, mountNode)
        // 创建节点
        // const app = createApp({
        //     render() {
        //         // 这里使用了h()函数,等价于<myForm :title="title" :text="text" :options="options" @submit="..." @onClosed="..."></myForm>
        //         return h(myForm, {
        //             ref: myFormRef,
        //             // 参数
        //             title: title,
        //             text: text,
        //             // 配置项
        //             options: options,
        //             // 事件
        //             onSubmit: (data) => {
        //                 setTimeout(() => {
        //                     mountNode.remove()
        //                 }, 500)
        //                 resolve(data)
        //             },
        //             onClosed: () => {
        //                 // 这里将容器给清除掉( 至于是否还存在其他内存泄漏，就不太清楚了 )
        //                 setTimeout(() => {
        //                     mountNode.remove()
        //                 }, 500)
        //                 reject()
        //             },
        //         })
        //     },
        // })
        // 由于内部使用了el-dialog所以必须挂载否则解析错误
        // app.use(ElementPlus)
        // 挂载容器，instance就是容器的实例
        // let instance = app.mount(mountNode)
        // 打开弹窗
        // myFormRef.value.showDialog()
    })
}
