<template>
  <div class="product-detail-page">
    <!-- 如果商品不存在,顯示錯誤訊息 -->
    <div v-if="!product" class="product-not-found">
      <h2>找不到該商品</h2>
      <p>商品可能已下架或不存在</p>
      <router-link to="/" class="back-home-btn">回到首頁</router-link>
    </div>

    <!-- 如果商品存在,顯示商品詳情 -->
    <div v-else class="detail-container">

      <!-- 左側: 商品放大圖 -->
      <div class="product-image-area">
        <img :src="product.image" :alt="product.name" class="product-main-image">
      </div>

      <!-- 右側: 商品資訊及購買控制項 -->
      <div class="product-info-area">
        
        <!-- 商品名稱 -->
        <h1 class="product-name">{{ product.name }} ({{ product.color }})</h1>
        <div class="product-divider"></div>
        
        <!-- 尺寸選擇 -->
        <div class="selection-group">
          <label class="selection-label">尺寸</label>
          <div class="size-options">
            <button 
              v-for="size in product.sizes" 
              :key="size" 
              @click="selectedSize = size"
              :class="['size-btn', { 'is-active': selectedSize === size }]"
              :disabled="product.unavailableSizes.includes(size)"
            >
              {{ size }}
            </button>
            <span v-if="product.unavailableSizes.length > 0" class="size-note">
              ({{ product.unavailableSizes.join(', ') }} 缺貨)
            </span>
          </div>
        </div>

        <!-- 數量選擇 -->
        <div class="selection-group quantity-group">
          <label class="selection-label">數量</label>
          <div class="quantity-control">
            <button @click="decrementQuantity" :disabled="quantity <= 1" class="qty-btn">-</button>
            <input type="number" v-model.number="quantity" min="1" max="99" class="qty-input">
            <button @click="incrementQuantity" class="qty-btn">+</button>
          </div>
        </div>
        
        <!-- 價格顯示 -->
        <div class="product-price">
          <span class="price-label">價格:</span>
          <span class="price-amount">NT${{ product.price.toLocaleString() }}</span>
        </div>
        
        <!-- 加入購物車按鈕 -->
        <button @click="addToCart" class="add-to-cart-btn">
          加入購物車
        </button>

        <!-- 訊息彈窗 -->
        <div v-if="message" :class="['message-box', message.type]">
          {{ message.text }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getProductById } from '@/data/productData'; // 引入商品資料庫
import { addToCart as addToCartUtil } from '@/utils/cart';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null, // 當前商品資料
      selectedSize: '', // 選擇的尺寸
      quantity: 1, // 數量
      message: null // 通知訊息
    };
  },
  methods: {
    // 載入商品資料
    loadProduct() {
      const productId = this.$route.params.id; // 從路由獲取商品 ID
      this.product = getProductById(productId);
      
      // 如果商品存在,設定預設尺寸
      if (this.product) {
        // 過濾掉缺貨尺寸,選擇第一個可用尺寸
        const availableSizes = this.product.sizes.filter(
          size => !this.product.unavailableSizes.includes(size)
        );
        this.selectedSize = availableSizes[0] || this.product.sizes[0];
      }
    },
    
    incrementQuantity() {
      if (this.quantity < 99) {
        this.quantity++;
      }
    },
    
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    
    addToCart() {
      // 檢查是否選擇尺寸
      if (!this.selectedSize) {
        this.showMessage('請選擇一個尺寸。', 'error');
        return;
      }

      // 檢查是否選擇缺貨尺寸
      if (this.product.unavailableSizes.includes(this.selectedSize)) {
        this.showMessage(`${this.selectedSize} 尺寸目前缺貨,請選擇其他尺寸。`, 'error');
        return;
      }

      // 準備商品資料
      const cartProduct = {
        id: this.product.id,
        name: `${this.product.name} (${this.product.color})`,
        sku: `${this.product.sku}-${this.selectedSize}`,
        size: this.selectedSize,
        price: this.product.price,
        quantity: this.quantity,
        image: this.product.image
      };

      // 加入購物車
      addToCartUtil(cartProduct);

      // 顯示成功訊息
      this.showMessage(
        `已將 ${this.quantity} 件 ${this.selectedSize} 尺寸的商品加入購物車!`, 
        'success'
      );

      // 重置數量
      this.quantity = 1;
    },
    
    showMessage(text, type) {
      this.message = { text, type };
      setTimeout(() => {
        this.message = null;
      }, 3000);
    }
  },
  
  // 當元件載入時,讀取商品資料
  mounted() {
    this.loadProduct();
  },
  
  // 監聽路由變化,當切換商品時重新載入
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
        this.quantity = 1; // 重置數量
        this.message = null; // 清除訊息
      }
    }
  }
}
</script>

<style scoped lang="scss">
$content-width: 1200px;
$primary-color: #655345;
$accent-color: #b70000;

.product-detail-page {
  padding: 0px 30px;
  max-width: $content-width;
  margin: 0 auto;
}

// 商品不存在時的樣式
.product-not-found {
  text-align: center;
  padding: 100px 20px;
  
  h2 {
    font-size: 32px;
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
  }
}

.back-home-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: $primary-color;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: darken($primary-color, 8%);
  }
}

.detail-container {
  display: flex;
  gap: 60px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
}

.product-image-area {
  flex: 1 1 55%;
  max-width: 53%;

  @media (max-width: 1024px) {
    max-width: 100%;
    margin-bottom: 20px;
  }
}

.product-main-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.product-info-area {
  flex: 1 1 40%;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
}

.product-name {
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.product-divider {
  height: 2px;
  background-color: #ddd;
  margin: -10px 0;
}

.selection-group {
  display: flex;
  flex-direction: column;
}

.selection-label {
  font-size: 24px;
  font-weight: bold;
  color: $primary-color;
  margin-bottom: 14px;
}

.size-options {
  display: flex;
  gap: 12px;
  align-items: center;
}

.size-btn {
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: $primary-color;
  }

  &.is-active {
    background-color: $primary-color;
    color: white;
    border-color: $primary-color;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f5f5f5;
    color: #aaa;
    text-decoration: line-through;
  }
}

.size-note {
  font-size: 14px;
  color: $accent-color;
  margin-left: 10px;
}

.quantity-control {
  display: flex;
  width: 120px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.qty-btn {
  background-color: #f7f7f7;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover:not(:disabled) {
    background-color: #eee;
  }
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
}

.qty-input {
  width: 100%;
  text-align: center;
  border: none;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.product-price {
  font-size: 28px;
  font-weight: bold;
  color: $accent-color;
  
  .price-label {
    font-size: 20px;
    font-weight: 500;
    color: #666;
    margin-right: 10px;
  }
}

.add-to-cart-btn {
  padding: 18px 25px;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  
  &:hover {
    background-color: darken($primary-color, 8%);
  }
  &:active {
    transform: translateY(1px);
  }
}

.message-box {
  padding: 15px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
}

.message-box.success {
  background-color: #e6ffed;
  color: #2e6429;
  border: 1px solid #9ae6b4;
}

.message-box.error {
  background-color: #fff5f5;
  color: #e53e3e;
  border: 1px solid #fed7d7;
}
</style>