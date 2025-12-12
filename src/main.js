// src/main.js (修改)

import { createApp } from 'vue';
import AppWrapper from './AppWrapper.vue'; // 🌟 引入新的根組件
import router from './router'; 

createApp(AppWrapper) // 🌟 建立 AppWrapper
  .use(router) 
  .mount('#app');