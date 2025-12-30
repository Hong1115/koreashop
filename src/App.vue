<template>
  <div id="app">
    <!-- 1. 固定顯示的標頭 -->
    <Header />

    <!-- 2. 路由視窗：根據網址變換內容 (Home, Login, Cart 等) -->
    <router-view />

    <!-- 3. 固定顯示的頁尾 -->
    <Footer />
  </div>
</template>

<script>
// 匯入Header、Footer
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">

// 放全域樣式的地方
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif; 
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f6f6f6; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 讓內容區塊自動撐開，確保 Footer 永遠在最下面
router-view {
  flex: 1;
}

</style>