<template>
  <div class="tshirt-list-page">
    <!-- 頁面標題 -->
    <h1 class="page-title">T恤系列</h1>
    
    <!-- 商品網格 -->
    <div class="product-grid-container">
      <div class="product-grid">
        <router-link 
          v-for="product in tshirtProducts" 
          :key="product.id" 
          :to="`/product/${product.slug}`"
          class="product-card-link"
        >
          <div class="product-card">
            <div class="product-image-wrapper">
              <img :src="product.image" :alt="product.name" class="product-image">
            </div>
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-color">{{ product.color }}</div>
              <div class="product-price">NT${{ product.price.toLocaleString() }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 如果沒有商品 -->
    <div v-if="tshirtProducts.length === 0" class="no-products">
      <p>目前沒有T恤商品</p>
      <router-link to="/" class="back-home-btn">回到首頁</router-link>
    </div>
  </div>
</template>

<script>
import { getProductsByCategory } from '@/data/productData';

export default {
  name: 'TshirtList',
  data() {
    return {
      tshirtProducts: []
    };
  },
  mounted() {
    // 載入T恤分類的商品
    this.tshirtProducts = getProductsByCategory('tshirt');
  }
}
</script>

<style scoped lang="scss">
$content-width: 1300px;

.tshirt-list-page {
  max-width: $content-width;
  margin: 0 auto;
  padding: 40px 35px;
  min-height: calc(100vh - 200px);
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #686869;
  text-align: center;
  margin-bottom: 50px;
}

.product-grid-container {
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

.product-card {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.product-info {
  width: 100%;
  padding: 10px;
  text-align: left;
}

.product-name,
.product-color {
  font-size: 18px;
  font-weight: normal;
  color: #686869;
  line-height: 1.5;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #b70000;
  margin-top: 5px;
}

.no-products {
  text-align: center;
  padding: 80px 20px;
  
  p {
    font-size: 20px;
    color: #686869;
    margin-bottom: 30px;
  }
}

.back-home-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #655345;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: darken(#655345, 8%);
  }
}
</style>