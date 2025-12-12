<template>
  <div id="app">
    <header class="top-header">
      <div class="header-text">WHOLESALE GOODS FROM SEOUL</div>
    </header>

    <nav class="navbar">
      <div class="nav-container">
         <!-- 🌟 關鍵修改：使用 router-link 包裹 Logo，點擊後回到首頁 (/) 🌟 -->
        <router-link to="/" class="logo-link">
          <div class="logo">K•<span>CORE</span></div>
        </router-link>
      <!-- 這裡應有導航連結，但目前只有 logo 和 auth-page 內容 -->

        <div class="nav-links">
          <a href="#" class="nav-item">新品上架</a>
          <a href="#" class="nav-item">衛衣</a>
          <a href="#" class="nav-item">T恤</a>
          <a href="#" class="nav-item">帽子</a>
          <a href="#" class="nav-item">其他配件</a>
        </div>

        <div class="auth-cart-links">
          <router-link to="/login" class="auth-link">登入</router-link>
          <router-link to="/cart" class="auth-link">購物車</router-link>
        </div>

      </div>
    </nav>

    <div class="banner-full-width"> 
        <img :src="mlbBannerSrc" alt="MLB's Signature Style With KARINA" class="banner-image">
    </div>

    <div class="wacky-banner-container">
      <img :src="wackyBannerSrc" alt="Wacky Willy Brand" class="wacky-banner-image">
    </div>

    <div class="product-grid-container">
      <div class="product-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <div class="product-image-wrapper">
            <img :src="product.src" :alt="product.name" class="product-image">
          </div>
            <div class="product-category">{{ product.category }}</div>
          </div>
      </div>
    </div> 
    <div class="section-title">最新商品</div>

    <div class="product-grid-container latest-product-grid">
      <div class="product-grid">
        <div class="product-card" v-for="product in latestProducts" :key="product.id">
          <div class="product-image-wrapper">
            <img :src="product.src" :alt="product.name" class="product-image">
          </div>

          <div class="product-info-latest">
            <div class="product-name-latest">{{ product.name }}</div>
            <div class="product-color-latest">{{ product.color }}</div>
            <div class="product-price-latest">{{ product.price }}</div>
          </div>

          </div>
      </div>
    </div>

    <footer class="main-footer">
    <div class="footer-divider"></div>
    <div class="footer-container">
      
      <div class="footer-column policy-links">
        <a href="#" class="footer-title">- 購買須知 -</a>
        <a href="#" class="footer-item">退換貨政策</a>
      </div>

      <div class="footer-column contact-info">
        <a href="#" class="footer-title">- 聯絡我們 -</a>
        <div class="contact-item">Instagram / korea_go1115</div>
        <div class="contact-item">客服Line / @koreago1115</div>
        <div class="contact-item">電郵 / koreago1115@gmail.com</div>
      </div>

      <div class="footer-column company-info">
        <div class="company-name">潮流韓貨代購有限公司</div>
        <div class="company-tax">統編: 26319746</div>
      </div>

    </div>
  </footer>

  </div>
</template>

<script>
// 假設您的圖片路徑是 'src/assets/images/mlb-banner.jpg'
import MlbBannerImage from './assets/images/mlb-banner.jpg';

// 🌟 [新增] 匯入 Wacky Willy 圖片
import WackyBannerImage from './assets/images/wacky-banner.jpg';

// 🌟 [新增] 匯入四張商品圖片
import Ex1Image from './assets/images/ex1.jpg'; // 確保您已將圖片命名為 Ex1Image 等
import Ex2Image from './assets/images/ex2.jpg';
import Ex3Image from './assets/images/ex3.jpg';
import Ex4Image from './assets/images/ex4.jpg';

// 🌟 [新增] 匯入最新商品圖片
import Pt1Image from './assets/images/pt1.jpg'; //
import Pt2Image from './assets/images/pt2.jpg'; //
import Pt3Image from './assets/images/pt3.jpg'; //
import Pt4Image from './assets/images/pt4.jpg'; //

export default {
  name: 'App',
  data() {
    return {
      mlbBannerSrc: MlbBannerImage,
      // 🌟 關鍵修正：在這裡加上逗號
      wackyBannerSrc: WackyBannerImage, 
      // 🌟 [新增] 定義商品圖片路徑
      products: [
        { id: 1, src: Ex1Image, name: 'COVERNAT 衛衣', brand: 'COVERNAT', category: '衛衣' },
        { id: 2, src: Ex2Image, name: '黑色熊圖案 T恤', brand: 'WACKY WILLY', category: 'T恤' },
        { id: 3, src: Ex3Image, name: 'EMIS 藍色棒球帽', brand: 'EMIS', category: '帽子' },
        { id: 4, src: Ex4Image, name: 'GENTLE MONSTER 墨鏡', brand: 'GENTLE MONSTER', category: '其他配件' }
      ],
      // 🌟 [新增] 定義最新商品圖片路徑
      latestProducts: [
        { id: 101, src: Pt1Image, name: 'Covernat帽T C刺繡', color: '黑色', price: 'NT$1680' }, 
        { id: 102, src: Pt2Image, name: 'Covernat帽T 字母刺繡', color: '灰色', price: 'NT$1480' },
        { id: 103, src: Pt3Image, name: 'Covernat衛衣 品牌LOGO', color: '黑色', price: 'NT$1080' }, 
        { id: 104, src: Pt4Image, name: 'MLB棒球帽 紐約洋基隊', color: '深灰色', price: 'NT$1280' }
      ]
    };
  }
}
</script>

<style lang="scss">
// =======================================================
// 全域樣式重置 (Reset)
// =======================================================
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif; 
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // 🌟 關鍵修正：將網頁的背景色設為 #fafafa 淺灰色
  background-color: #fafafa;
}

$content-width: 1300px;


// =======================================================
// 1. 頂部黑條樣式
// =======================================================
.top-header {
  background-color: #a29680;
  color: #fff;
  text-align: center;
  padding: 18px 0; 
  font-size: 18px;
  font-weight: 500; 
  letter-spacing: 2px;
}

// =======================================================
// 2.  (Header/Navbar)
// =======================================================
.navbar {
  background-color: #fafafa;
  padding: 30px 0; 
}

.nav-container {
  max-width: $content-width;
  margin: 0 auto;
  display: flex;
  // 🌟 關鍵修正：讓 Logo 靠左，並讓其他所有空間可以被導航連結使用
  // 使用 space-between 保持 Logo 和導航連結在最左和最右，
  // 然後使用 margin-left: auto; margin-right: auto; 來置中導航連結
  // (雖然在這種結構下不容易實現「完美置中」，但這是最接近的簡單方法)
  justify-content: space-between; 
  align-items: center;
  padding: 0 30px;
}

.logo-link {
  // 🌟 關鍵修正：將文字裝飾設為 none，移除底線
  text-decoration: none; 
  cursor: pointer; 
}

.logo {
  font-size: 45px;
  font-weight: 700; 
  // 確保 logo 文本沒有底線 (雙重保險)
  text-decoration: none; 
  color: #000;
  letter-spacing: 1px;

  span {
    // 🌟 關鍵修正：將 'Go' 變成較淺的灰色
    color: #655345; 
  }
}

// ----------------------------------------------------
// 🌟 核心修正：讓導航連結在 Logo 右側的空間中置中
// ----------------------------------------------------
.nav-links {
  display: flex;
  // 1. 佔據 Logo 右側所有空間
  flex-grow: 1; 
  // 2. 在這個佔滿的空間內，將連結水平置中
  justify-content: center;
  
  // 為了避免列表連結跑到 Logo 的下方，我們給 Logo 預留一點空間，
  // 讓置中效果從 Logo 左邊開始計算
  padding-right: 80px; 
}

.auth-cart-links {
  // 讓登入和購物車並排顯示
  display: flex;
  gap: 18px; // 兩個連結之間的間隔

  // 讓此區塊保持在導航列的最右側
  margin-left: auto;
}

.auth-link {
  font-size: 18px;
  font-weight: bold; // 加粗
  color: #655345; // 醒目的紅色字體
  text-decoration: none; // 移除底線
  white-space: nowrap; // 防止在空間不足時換行
}

.nav-item {
  color: #686869;
  text-decoration: none;
  padding: 0 30px; 
  font-size: 20px;
  font-weight: normal; 
  line-height: 1; 
  transition: color 0.3s;
}

// ----------------------------------------------------
// (以下樣式不變)

// =======================================================
// 3. 內容區塊樣式 (Banner 全寬放大)
// =======================================================

.content-container {
  display: flex;
  max-width: $content-width;
  // 🌟 關鍵修正：確保與 Navbar 之間沒有多餘的垂直距離，與下方 Wacky Banner 有距離
  margin: 0 auto 30px auto; 
  padding: 0 20px;
}

.banner-full-width {
  // 🌟 關鍵修正：讓 Banner 區塊佔據整個內容寬度
  max-width: $content-width;
  margin: 0 auto; // 居中
  padding: 0 0px; // 保持左右邊距與 Navbar 對齊
  overflow: hidden;
}

.banner-image {
  // 圖片佔據父容器 100% 寬度
  width: 100%;
  height: auto;
  display: block; 
}

.goods-right {
  flex: 1; 
  background-color: transparent;
}

// =======================================================
// 4. 🌟 新增 Wacky Willy Banner 樣式
// =======================================================
.wacky-banner-container {
  max-width: $content-width; // 與其他內容區塊保持相同最大寬度
  margin: 130px auto 30px auto; // 🌟 調整wacky與mlb上下間距
  padding: 0 0px; // 左右內邊距與其他區塊對齊
  overflow: hidden;
}

.wacky-banner-image {
  width: 100%; // 🌟 調整wacky比例
  display: block; // 移除圖片底部的預設空白
  height: auto;
}

// =======================================================
// 5. 🌟 [新增] 商品列表樣式 (Product Grid)
// =======================================================
.product-grid-container {
  max-width: $content-width; // 與 Header 內容保持相同最大寬度
  margin: 120px auto 50px auto; // 與上方 Wacky Banner 保持間距，下方預留更多空間
  padding: 0 35px; // 左右內邊距與其他區塊對齊
  display: flex;
  justify-content: center; // 確保整個網格居中 (如果網格寬度小於 max-width)
}

.product-grid {
  display: grid;
  // 🌟 關鍵：創建四欄佈局，每欄佔用可用空間的 1/4
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px; // 商品卡片之間的間距
  width: 100%; // 讓網格佔滿父容器寬度
}

.product-card {
  background-color: #fff; // 🌟 關鍵：商品卡片背景色為白色，在 #fafafa 頁面背景上凸顯
  padding: 10px; // 內邊距讓圖片與邊框有距離
  border-radius: 4px; // 邊角可選圓潤一點
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); // 增加輕微陰影，增加層次感
  // 確保卡片內容垂直居中 (如果需要的話)
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image-wrapper {
  width: 100%; // 圖片容器佔滿卡片寬度
  aspect-ratio: 1 / 1; // 保持正方形比例 (常見於商品圖)
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.product-image {
  // 讓圖片在容器內盡可能放大，但不裁切 (可根據實際圖片效果調整)
  width: 100%; 
  height: 100%;
  object-fit: contain; // 🌟 關鍵：保持圖片完整，縮放至容器內
  display: block; 
}

// 🌟 [新增] 商品類別文字樣式
.product-category {
  margin-top: -30px; // 與圖片的間距
  font-size: 20px; // 字體大小
  font-weight: bold; // 粗體
  color: #686869; // 字體顏色 (黑色)
  text-align: center; // 文字置中
}

// 🌟 [新增] 最新商品標題樣式
.section-title {
  max-width: $content-width; // 標題寬度與內容區塊一致
  margin: 80px auto 30px auto; // 上方與商品網格間距 50px，下方與下一個區塊間距 30px
  padding: 0 35px; // 左右內邊距
  font-size: 32px; // 字體大小
  font-weight: bold; // 粗體
  color: #686869; // 黑色字體
  text-align: center; // 文字置中
}

// 🌟 [新增] 針對最新商品列表的樣式，調整底部間距
.latest-product-grid {
    margin: 30px auto 30px auto; // 底部間距可以留大一點，為 Footer 做準備
}

// =======================================================
// 6. 🌟 [新增] 最新商品資訊樣式 (Product Info Latest)
// =======================================================

.product-info-latest {
  width: 100%; // 讓文字資訊佔滿卡片寬度
  padding: 10px; // 上方與圖片間隔
  text-align: left; // 文字靠左對齊
}

.product-name-latest,
.product-color-latest {
  font-size: 18px; 
  font-weight: normal; 
  color: #686869;
  line-height: 1.5;
}

.product-price-latest {
  font-size: 18px; 
  font-weight: bold; // 價格加粗
  color: #b70000; // 🌟 價格使用顯眼的紅色
  margin-top: 5px;
}

// ... (所有原有的樣式放在這裡)
// ...

// =======================================================
// 7. 🌟 [新增] 頁尾 Footer 樣式
// =======================================================
.main-footer {
  background-color: #fafafa; // 假設頁尾背景為淺灰色
  padding-top: 50px; // 頁尾頂部與內容的間距
  padding-bottom: 30px; // 頁尾底部間距
}

.footer-divider {
  max-width: $content-width;
  margin: 0 auto 50px auto; // 讓分隔線與內容對齊
  height: 2px;
  background-color: #a6aa87; // 淺灰色的分隔線
}

.footer-container {
  max-width: $content-width;
  margin: 0 auto;
  display: flex;
  // 🌟 關鍵：將三個欄位平均分散在 $content-width 內
  justify-content: space-around; 
  align-items: flex-start;
  padding: 0 30px;
  line-height: 2; // 行高增加，讓文字不擁擠
  text-align: center; // 預設文字置中
}

.footer-column {
  flex-basis: 33.33%; // 每個欄位佔據約三分之一寬度
  display: flex;
  flex-direction: column;
  align-items: center; // 內容置中
}

// ----------------------------------------------------
// 🌟 調整特定欄位對齊方式以符合 ooo.jpg 樣式
// ----------------------------------------------------

.policy-links,
.contact-info {
  align-items: center; // 購買須知和聯絡我們欄位置中
}



// ----------------------------------------------------
// 🌟 文字樣式
// ----------------------------------------------------

.footer-title {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-decoration: none; // 移除標題的底線
  margin-bottom: 1px;
}

.footer-item,
.contact-item,
.company-name,
.company-tax {
  font-size: 16px;
  color: #333; // 使用深灰色
  text-decoration: none;
}

.footer-item {
  transition: color 0.3s;
  &:hover {
    color: #b70000; // 導覽連結 hover 效果
  }
}

</style>