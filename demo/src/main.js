
import { createApp } from 'vue'
import App from './App.vue'
import '../../dist/style.css'
import Chat from '../../dist/vue-beautiful-chat.es.js'
const app = createApp(App)

app.use(Chat)
app.mount('#app')
