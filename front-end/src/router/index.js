import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Register from '../components/Register';
import Login from '../components/Login.vue';
import Forum from '../components/Forum.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path:'/login', component: Login },
  { path:'/profil/:id', name:'Profil', component: () => import(/* webpackChunkName: "profil" */ '../views/Profil.vue')},
  { path:'/forum', component: Forum },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
