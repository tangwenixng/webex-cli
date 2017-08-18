import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import axios from 'axios'
import router from './router/index.js'
import qs from 'qs'
import moment from 'moment'


Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.prototype.$moment = moment

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
