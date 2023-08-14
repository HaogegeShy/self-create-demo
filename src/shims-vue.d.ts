// declare module '*.vue' {
//     import Vue from 'vue';
//     export default Vue;
// }
/**
 * 上面的导出是vue格式，如果想导出为component格式，可以使用下面的导出
 */
// declare module '*.vue' {
//     import {ComponentOptions} from 'vue'
//     const componentOptions: ComponentOptions
//     export default componentOptions
// }

declare module "*.vue" {
    import { DefineComponent } from "vue"
    const Component: DefineComponent<{}, {}, any>
    export default Component
}
