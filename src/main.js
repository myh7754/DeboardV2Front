import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { setupDevtoolsGuard } from './utils/devtoolsGuard';


// // Vuetify import
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// import '@mdi/font/css/materialdesignicons.css'

// const vuetify = createVuetify({
//   components,
//   directives,
// })

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
// app.use(vuetify);

if (import.meta.env.PROD) {
	setupDevtoolsGuard();
}

app.mount('#app');