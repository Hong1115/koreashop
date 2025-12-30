// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // 首頁內容 (原 App.vue)
import Login from '../views/Login.vue'; // 登入頁面
import Cart from '@/views/Cart.vue'; // 進入購物車頁面
import ProductDetail from '@/views/ProductDetail.vue'; // 匯入商品詳情頁
import HoodieList from '@/views/HoodieList.vue'; 
import TshirtList from '@/views/TshirtList.vue'; 
import HatList from '@/views/HatList.vue'; 
import OtherList from '@/views/OtherList.vue'; 
import AllProductsList from '@/views/AllProductsList.vue'; 
import Checkout from '@/views/Checkout.vue'; 
import Orders from '@/views/Orders.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // Home.vue 現在是首頁
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path: '/register',
    name: 'Register',
    // 使用 Login 組件，並在組件內用參數來切換顯示
    component: Login 
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart, // 確保這裡指向 Cart.vue
  },

  {
    path: '/product/:id', // 商品頁面的路徑
    name: 'ProductDetail',
    component: ProductDetail
  },

  // ✅ 新增衛衣列表
  {
    path: '/category/hoodie',
    name: 'HoodieList',
    component: HoodieList
   },
  // ✅ 新增 T恤列表
  {
    path: '/category/tshirt',
    name: 'TshirtList',
    component: TshirtList
  },
  // ✅ 新增帽子列表
  {
    path: '/category/hat',
    name: 'HatList',
    component: HatList
  },
  // ✅ 新增其他配件列表
  {
    path: '/category/other',
    name: 'OtherList',
    component: OtherList
  },
  // ✅ 新增全部商品列表
  {
    path: '/products/all',
    name: 'AllProductsList',
    component: AllProductsList
  },
  // ✅ 新增結帳頁面
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  // ✅ 新增訂單頁面
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;