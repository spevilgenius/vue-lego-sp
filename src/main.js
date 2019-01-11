/* eslint-disable */
import 'es6-promise/auto'
import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import LegoBootstrap from './legobootstrap'
import App from './components/App.vue'
import routes from './routes/routes'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(LegoBootstrap)
Vue.use(axios)
Vue.config.productionTip = false

const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

new Vue ({
  el: '#legoapp',
  render: h => h(App),
  router
})
