import Vue from 'vue'
import App from './App.vue'
import Chat from '../../dist/vue-beautiful-chat.umd.min.js'

Vue.use(Chat)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: (h) => h(App)
})
