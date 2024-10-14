import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'
import '@/assets/main.css'
import axios from "axios";
import i18n from './i18n'
import {createPinia} from "pinia";


axios.defaults.baseURL = process.env.VUE_APP_SERVER;
// const axiosInstance = axios.create({
//     baseURL: process.env.VUE_APP_SERVER,
// });

// createApp(App)
//     .use(i18n)
//     .use(router)
//     .use(createPinia())
//     .mount('#app')

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(createPinia());
app.mount('#app');
app.config.globalProperties.$baseUrl = process.env.VUE_APP_SERVER;
