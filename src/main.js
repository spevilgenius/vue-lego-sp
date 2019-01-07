/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import LegoBootstrap from './legobootstrap'
import App from './components/App.vue'
import routes from './routes/routes'
import 'es6-promise/auto'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

import './polyfill'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(LegoBootstrap)
Vue.use(axios)
Vue.config.productionTip = false

const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// preload the ArcGIS API
// const options = {
// url: 'https://js.arcgis.com/4.10/'
// }
// loadScript(options)

new Vue ({
  el: '#legoapp',
  render: h => h(App),
  router
})
