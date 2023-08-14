import { createApp } from 'vue'
import "./assets/main.css"
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app= createApp(App)


app.use(router)
app.mount('#app')
