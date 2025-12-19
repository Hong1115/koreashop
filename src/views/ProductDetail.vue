<template>
  <div class="product-detail-page">
    <div class="detail-container">

      <!-- 左側: 商品放大圖 -->
      <div class="product-image-area">
        <!-- 圖片來源使用靜態匯入的 pt1.jpg -->
        <img :src="productImage" alt="Covernat帽T C刺繡" class="product-main-image">
      </div>

      <!-- 右側: 商品資訊及購買控制項 -->
      <div class="product-info-area">
        
        <!-- 商品名稱 -->
        <h1 class="product-name">Covernat帽T C刺繡 (黑色)</h1>
        <div class="product-divider"></div>
        
        <!-- 尺寸選擇 -->
        <div class="selection-group">
          <label class="selection-label" for="size-select">尺寸</label>
          <div class="size-options">
            <button 
              v-for="size in sizes" 
              :key="size" 
              @click="selectedSize = size"
              :class="['size-btn', { 'is-active': selectedSize === size }]"
              :disabled="size === 'XL'"
            >
              {{ size }}
            </button>
            <span class="size-note">(XL 缺貨)</span>
          </div>
        </div>

        <!-- 數量選擇 -->
        <div class="selection-group quantity-group">
          <label class="selection-label" for="quantity-input">數量</label>
          <div class="quantity-control">
            <button @click="decrementQuantity" :disabled="quantity <= 1" class="qty-btn">-</button>
            <input type="number" id="quantity-input" v-model.number="quantity" min="1" max="99" class="qty-input">
            <button @click="incrementQuantity" class="qty-btn">+</button>
          </div>
        </div>
        
        <!-- 價格顯示 -->
        <div class="product-price">
          <span class="price-label">價格:</span>
          <span class="price-amount">NT$1,680</span>
        </div>
        
        <!-- 加入購物車按鈕 -->
        <button @click="addToCart" class="add-to-cart-btn">
          加入購物車
        </button>

        <!-- 訊息彈窗 (取代 alert) -->
        <div v-if="message" :class="['message-box', message.type]">
          {{ message.text }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// 匯入 pt1.jpg 圖片
import Pt1Image from '../assets/images/pt1.jpg'; 

export default {
  name: 'ProductDetail',
  data() {
    return {
      productImage: Pt1Image,
      sizes: ['S', 'M', 'L', 'XL'],
      selectedSize: 'M', // 預設尺寸
      quantity: 1, // 預設數量
      price: 1680,
      message: null, // 用於顯示訊息（取代 alert）
    };
  },
  methods: {
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
      // 模擬加入購物車的邏輯
      if (!this.selectedSize) {
        this.showMessage('請選擇一個尺寸。', 'error');
        return;
      }

      if (this.selectedSize === 'XL') {
        this.showMessage('XL 尺寸目前缺貨，請選擇其他尺寸。', 'error');
        return;
      }

      this.showMessage(`已將 ${this.quantity} 件 ${this.selectedSize} 尺寸的帽 T 加入購物車！`, 'success');
      
      // 這裡應該接著發送 API 請求到後端或更新 Firestore 購物車資料
      console.log({
        product: 'Covernat帽T C刺繡 (黑色)',
        size: this.selectedSize,
        quantity: this.quantity,
        price: this.price,
      });

      // 重置數量
      this.quantity = 1;
    },
    showMessage(text, type) {
      this.message = { text, type };
      setTimeout(() => {
        this.message = null; // 3 秒後自動清除訊息
      }, 3000);
    }
  }
}
</script>

<style scoped lang="scss">
// 使用與 App.vue 相同的內容最大寬度
$content-width: 1200px; 
$primary-color: #655345;
$accent-color: #b70000;

.product-detail-page {
  padding: 0px 30px;
  max-width: $content-width;
  margin: 0 auto;
}

.detail-container {
  display: flex;
  gap: 60px; // 圖片和資訊之間的間距
  
  // 響應式佈局：當螢幕小於 1024px 時，改為垂直堆疊
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
}

// =======================================================
// 左側：商品圖片區
// =======================================================
.product-image-area {
  flex: 1 1 55%; // 圖片區佔 55%
  max-width: 53%;

  @media (max-width: 1024px) {
    max-width: 100%; // 在小螢幕上佔滿寬度
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

// =======================================================
// 右側：商品資訊區
// =======================================================
.product-info-area {
  flex: 1 1 40%; // 資訊區佔 40%
  max-width: 40%;
  display: flex;
  flex-direction: column;
  gap: 25px; // 欄位間距

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

// 選擇群組 (尺寸、數量)
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

// 尺寸按鈕
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


// 數量控制項
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
  // 隱藏 Chrome/Firefox 的數字輸入箭頭
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}


// 價格顯示
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

// 加入購物車按鈕
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

// 訊息彈窗樣式
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
  color: #38a169;
  border: 1px solid #9ae6b4;
}

.message-box.error {
  background-color: #fff5f5;
  color: #e53e3e;
  border: 1px solid #fed7d7;
}
</style>