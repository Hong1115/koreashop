// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue'; // 您的首頁內容 (原 App.vue)
import Login from '../views/Login.vue'; // 登入頁面
import Cart from '@/views/Cart.vue'; // 進入購物車頁面

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App // 您的 App.vue 現在是首頁
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 雖然您沒有明確要求註冊頁面，但作為登入畫面的連結，我們也先定義一個路由
  {
    path: '/register',
    name: 'Register',
    // 這裡我們直接使用 Login 組件，並在組件內用參數來切換顯示 (這是常見的偷懶做法)
    component: Login 
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart, // 確保這裡指向您的 Cart.vue
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;