import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import CSS (v4 style)
import './index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
