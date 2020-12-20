import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

//import template vuejs
import App from './App.vue';
import BoxChat from './components/BoxChat.vue';
Vue.use(VueRouter)
const routes = [
  {
        name: 'BoxChat',
        path: '/',
        component: BoxChat
    },
  
];
const router = new VueRouter({ mode: 'history', routes: routes});
new Vue(Vue.util.extend({ router }, App)).$mount('#app');