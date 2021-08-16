import { createApp } from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

createApp(App).use(store).use(Vuex).use(router).mount('#app');
