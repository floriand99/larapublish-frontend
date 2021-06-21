import Vue from 'vue'
import App from './App.vue'
// import './assets/tailwind.css'
import store from './store'
import router from './router'
import VueFileAgent from 'vue-file-agent';
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueFileAgent);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common["Accept"] = `application/json`;
axios.defaults.headers.common["Content-type"] = `application/json`;

let jwtToken = localStorage.getItem('token')
if(jwtToken)
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
