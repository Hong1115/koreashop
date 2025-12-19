<template>
  <div class="home">
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
        <router-link 
          v-for="product in latestProducts" 
          :key="product.id" 
          :to="product.id === 101 ? '/product/pt1' : '#'"
          class="product-card-link"
        >
          <div class="product-card">
            <div class="product-image-wrapper">
              <img :src="product.src" :alt="product.name" class="product-image">
            </div>
            <div class="product-info-latest">
              <div class="product-name-latest">{{ product.name }}</div>
              <div class="product-color-latest">{{ product.color }}</div>
              <div class="product-price-latest">{{ product.price }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import MlbBannerImage from '@/assets/images/mlb-banner.jpg';
import WackyBannerImage from '@/assets/images/wacky-banner.jpg';
import Ex1Image from '@/assets/images/ex1.jpg';
import Ex2Image from '@/assets/images/ex2.jpg';
import Ex3Image from '@/assets/images/ex3.jpg';
import Ex4Image from '@/assets/images/ex4.jpg';
import Pt1Image from '@/assets/images/pt1.jpg';
import Pt2Image from '@/assets/images/pt2.jpg';
import Pt3Image from '@/assets/images/pt3.jpg';
import Pt4Image from '@/assets/images/pt4.jpg';

export default {
  name: 'Home',
  data() {
    return {
      mlbBannerSrc: MlbBannerImage,
      wackyBannerSrc: WackyBannerImage, 
      products: [
        { id: 1, src: Ex1Image, name: 'COVERNAT 衛衣', brand: 'COVERNAT', category: '衛衣' },
        { id: 2, src: Ex2Image, name: '黑色熊圖案 T恤', brand: 'WACKY WILLY', category: 'T恤' },
        { id: 3, src: Ex3Image, name: 'EMIS 藍色棒球帽', brand: 'EMIS', category: '帽子' },
        { id: 4, src: Ex4Image, name: 'GENTLE MONSTER 墨鏡', brand: 'GENTLE MONSTER', category: '其他配件' }
      ],
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

<style lang="scss" scoped>

$content-width: 1300px;

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

.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px); // 增加懸停效果
  }
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

</style>
