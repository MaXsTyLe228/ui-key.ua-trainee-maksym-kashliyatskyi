import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import router from "./router/routes";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
