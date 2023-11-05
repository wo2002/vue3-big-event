//对pinia 进行单独管理

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import pinia from './stores'
const app = createApp(App)

app.use(pinia)
app.use(router)

// console.log(a)
app.mount('#app')
