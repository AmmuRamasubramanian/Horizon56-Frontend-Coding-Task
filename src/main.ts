import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import "./assets/styles/main.scss"
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)
app.use(createPinia())
app.use(MotionPlugin)
app.mount('#app')
