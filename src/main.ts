import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import './assets/main.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
const vuetify = createVuetify({
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi
            },
        },
        components: {
            VCalendar,
        },
        ssr: true,
    }
);
app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
