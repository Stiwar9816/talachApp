import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { registerLayouts } from './layouts/register'
// Vuetify
import { vuetify } from './plugins/vuetify'

const app = createApp(App)
registerLayouts(app)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')