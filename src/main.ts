import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { registerLayouts } from './layouts/register';
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from './plugins/apollo';
// Vuetify
import { vuetify } from './plugins/vuetify'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)
registerLayouts(app);
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
