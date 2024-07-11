import { createApp } from 'vue'
import { createPinia } from "pinia"
import './style.css'
import App from "./App.vue"
import router from "./router";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const pinia = createPinia()
const app = createApp(App)

app.component("infinite-loading", InfiniteLoading);
app.use(pinia)
app.use(router)
app.mount('#app')
