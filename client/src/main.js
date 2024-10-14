import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'
import '@/assets/main.css'
import axios from "axios";
import i18n from './i18n'
import {createPinia} from "pinia";


axios.defaults.baseURL = process.env.SERVER || "http://localhost:3000/";


createApp(App)
    .use(i18n)
    .use(router)
    .use(createPinia())
    .mount('#app')
