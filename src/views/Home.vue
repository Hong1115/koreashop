<template>
  <div class="home">
    <div class="banner-full-width"> 
        <img :src="mlbBannerSrc" alt="MLB's Signature Style With KARINA" class="banner-image">
    </div>

    <div class="wacky-banner-container">
      <img :src="wackyBannerSrc" alt="Wacky Willy Brand" class="wacky-banner-image">
    </div>

    <!-- ✅ 修改:將商品卡片改為可點擊的連結 -->
    <div class="product-grid-container">
      <div class="product-grid">
        <!-- ✅ 如果有 link 就使用 router-link,否則用 div -->
        <component 
          :is="product.link ? 'router-link' : 'div'"
          v-for="product in products" 
          :key="product.id"
          :to="product.link || undefined"
          :class="['product-card-wrapper', { 'clickable': product.link }]"
        >
          <div class="product-card">
            <div class="product-image-wrapper">
              <img :src="product.src" :alt="product.name" class="product-image">
            </div>
            <div class="product-category">{{ product.category }}</div>
          </div>
        </component>
      </div>
    </div> 
    
    <div class="section-title">最新商品</div>

    <div class="product-grid-container latest-product-grid">
      <div class="product-grid">
        <router-link 
          v-for="product in latestProducts" 
          :key="product.id" 
          :to="`/product/${product.slug}`"
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
        { 
          id: 1, 
          src: Ex1Image, 
          name: 'COVERNAT 長袖', 
          brand: 'COVERNAT', 
          category: '長袖',
          link: '/category/hoodie' // ✅ 加入長袖連結
        },
        { 
          id: 2, 
          src: Ex2Image, 
          name: '黑色熊圖案 T恤', 
          brand: 'WACKY WILLY', 
          category: 'T恤',
          link: '/category/tshirt' // ✅ 加入 T恤連結
        },
        { 
          id: 3, 
          src: Ex3Image, 
          name: 'EMIS 藍色棒球帽', 
          brand: 'EMIS', 
          category: '帽子',
          link: '/category/hat' // ✅ 加入帽子連結
        },
        { 
          id: 4, 
          src: Ex4Image, 
          name: 'GENTLE MONSTER 墨鏡', 
          brand: 'GENTLE MONSTER', 
          category: '其他配件',
          link: '/category/other' // ✅ 加入其他配件連結
        }
      ],
      latestProducts: [
        { id: 101, slug: 'pt1', src: Pt1Image, name: 'Covernat帽T C刺繡', color: '黑色', price: 'NT$1680' }, 
        { id: 102, slug: 'pt2', src: Pt2Image, name: 'Covernat帽T 字母刺繡', color: '灰色', price: 'NT$1480' },
        { id: 103, slug: 'pt3', src: Pt3Image, name: 'Covernat衛衣 品牌LOGO', color: '黑色', price: 'NT$1080' }, 
        { id: 104, slug: 'pt4', src: Pt4Image, name: 'MLB棒球帽 紐約洋基隊', color: '深灰色', price: 'NT$1280' }
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
  margin: 0 auto 30px auto; 
  padding: 0 20px;
}

.banner-full-width {
  max-width: $content-width;
  margin: 0 auto;
  padding: 0 0px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block; 
}

.goods-right {
  flex: 1; 
  background-color: transparent;
}

.wacky-banner-container {
  max-width: $content-width;
  margin: 130px auto 30px auto;
  padding: 0 0px;
  overflow: hidden;
}

.wacky-banner-image {
  width: 100%;
  display: block;
  height: auto;
}

.product-grid-container {
  max-width: $content-width;
  margin: 120px auto 50px auto;
  padding: 0 35px;
  display: flex;
  justify-content: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  width: 100%;
}

// ✅ 新增:卡片包裝器樣式
.product-card-wrapper {
  text-decoration: none;
  color: inherit;
  display: block;
  
  // ✅ 只有可點擊的卡片才有懸停效果
  &.clickable {
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-5px);
      
      .product-card {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.product-card {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
}

.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
}

.product-image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.product-image {
  width: 100%; 
  height: 100%;
  object-fit: contain;
  display: block; 
}

.product-category {
  margin-top: -30px;
  font-size: 20px;
  font-weight: bold;
  color: #686869;
  text-align: center;
}

.section-title {
  max-width: $content-width;
  margin: 80px auto 30px auto;
  padding: 0 35px;
  font-size: 32px;
  font-weight: bold;
  color: #686869;
  text-align: center;
}

.latest-product-grid {
    margin: 30px auto 30px auto;
}

.product-info-latest {
  width: 100%;
  padding: 10px;
  text-align: left;
}

.product-name-latest,
.product-color-latest {
  font-size: 20px; 
  font-weight: normal; 
  color: #39393aff;
  line-height: 1.5;
}

.product-price-latest {
  font-size: 18px; 
  font-weight: bold;
  color: #b70000;
  margin-top: 5px;
}

</style>