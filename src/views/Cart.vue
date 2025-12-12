<template>

  <div id="app">
    <header class="top-header">
      <div class="header-text">WHOLESALE GOODS FROM SEOUL</div>
    </header>
  </div>

  <nav class="navbar">
    <div class="nav-container">
       <!-- 🌟 關鍵修改：使用 router-link 包裹 Logo，點擊後回到首頁 (/) 🌟 -->
        <router-link to="/" class="logo-link">
          <div class="logo">K•<span>CORE</span></div>
        </router-link>
      <!-- 這裡應有導航連結，但目前只有 logo 和 auth-page 內容 -->
    </div>
  </nav>    

  <div class="cart-page">
    <h1 class="page-heading">我的購物車</h1>

    <div class="cart-container">
      
      <!-- 購物車商品列表 (Cart Items) -->
      <div class="cart-items">
        <!-- 購物車為空時的提示 -->
        <div v-if="cartItems.length === 0" class="empty-cart-message">
          <p>您的購物車是空的，快去逛逛最新商品吧！</p>
          <!-- 這裡使用 router-link 模擬導航，以符合專案使用 Vue Router 的設定 -->
          <router-link to="/" class="go-shopping-btn">繼續購物</router-link>
        </div>

        <!-- 循環顯示購物車內的商品 -->
        <div v-for="item in cartItems" :key="item.id" class="cart-item-card">
          <img :src="item.image" :alt="item.name" class="item-image">
          
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-sku">SKU: {{ item.sku }}</p>
            <p class="item-price">單價: NT$ {{ item.price.toLocaleString() }}</p>

            <!-- 數量調整器 -->
            <div class="quantity-control">
              <button @click="updateQuantity(item.id, -1)" :disabled="item.quantity <= 1">-</button>
              <input type="number" v-model.number="item.quantity" @change="checkQuantity(item)" min="1">
              <button @click="updateQuantity(item.id, 1)">+</button>
            </div>
          </div>
          
          <div class="item-actions">
            <!-- 總金額 -->
            <p class="item-subtotal">NT $ {{ (item.price * item.quantity).toLocaleString() }}</p>
            <!-- 移除按鈕 -->
            <button @click="removeItem(item.id)" class="remove-btn">
              <i class="fas fa-trash-alt"></i> 移除
            </button>
          </div>
        </div>
      </div>

      <!-- 訂單總結 (Order Summary) -->
      <div v-if="cartItems.length > 0" class="order-summary">
        <h2 class="summary-title">訂單總結</h2>
        
        <div class="summary-line">
          <span>商品總金額:</span>
          <span class="value">NT$ {{ totalItemsPrice.toLocaleString() }}</span>
        </div>

        <div class="summary-line">
          <span>運費:</span>
          <span class="value">NT$ {{ shippingFee.toLocaleString() }}</span>
        </div>

        <div class="summary-separator"></div>

        <div class="summary-line total-line">
          <span>應付總金額:</span>
          <span class="total-value">NT$ {{ grandTotal.toLocaleString() }}</span>
        </div>
        
        <!-- 結帳按鈕 -->
        <button class="checkout-btn" @click="handleCheckout">前往結帳</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      // 模擬購物車數據
      shippingFee: 60, // 假設固定運費
      cartItems: [
        {
          id: 1,
          name: '首爾夏季新款 T-Shirt #1',
          sku: 'ST1001-WH-M',
          price: 700,
          quantity: 1,
          image: 'https://placehold.co/120x160/fafafa/333?text=T-Shirt'
        },
        {
          id: 2,
          name: '韓系高腰牛仔褲 (深藍)',
          sku: 'JP2005-DB-L',
          price: 1200,
          quantity: 1,
          image: 'https://placehold.co/120x160/fafafa/333?text=Jeans'
        },
        {
          id: 3,
          name: '時尚皮革斜背包 (黑)',
          sku: 'BG3008-BK',
          price: 1500,
          quantity: 1,
          image: 'https://placehold.co/120x160/fafafa/333?text=Bag'
        }
      ]
    };
  },
  computed: {
    // 計算所有商品的總金額 (不含運費)
    totalItemsPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    // 計算最終應付總金額 (商品總金額 + 運費)
    grandTotal() {
      if (this.cartItems.length === 0) {
        return 0;
      }
      return this.totalItemsPrice + this.shippingFee;
    }
  },
  methods: {
    // 調整商品數量
    updateQuantity(itemId, change) {
      const item = this.cartItems.find(i => i.id === itemId);
      if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1) {
          item.quantity = newQuantity;
        }
      }
    },
    // 檢查輸入框的數量，確保至少為 1
    checkQuantity(item) {
      if (item.quantity < 1 || !item.quantity) {
        item.quantity = 1;
      }
    },
    // 從購物車中移除商品
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter(i => i.id !== itemId);
    },
    // 處理結帳邏輯 (已將 alert() 替換為 console.log)
    handleCheckout() {
      console.log(`[Checkout Event] 總金額 NT$ ${this.grandTotal.toLocaleString()}。結帳功能待實作！`);
      // 實際應用中會導向結帳頁面
      // this.$router.push('/checkout');
    }
  }
}
</script>

<style scoped lang="scss">
// 引入 Font Awesome 圖標
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");

// 主容器
.cart-page {
  max-width: 1200px;
  margin:  auto;
  padding: 0px 0px;
  background-color: #fafafa;
}

.page-heading {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.cart-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  
}

// =======================================================
// 1. 購物車商品列表
// =======================================================
.cart-items {
  flex: 3; // 佔 70% 寬度
  width: 100%;
}

.empty-cart-message {
  text-align: center;
  padding: 80px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  p {
    font-size: 18px;
    color: #686869;
    margin-bottom: 20px;
  }
}

.go-shopping-btn {
  display: inline-block;
  background-color: #a29680;
  color: #fff;
  padding: 12px 30px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken(#a29680, 8%);
  }
}

.cart-item-card {
  display: flex;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-items: center;
  gap: 20px;
  
}

.item-image {
  width: 120px;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex-grow: 1;
  text-align: left;
}

.item-name {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

.item-sku, .item-price {
  font-size: 20px;
  color: #686869;
  margin-bottom: 5px;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
  min-width: 150px; // 確保總計和按鈕有足夠空間
}

.item-subtotal {
  font-size: 20px;
  font-weight: bold;
  color: #d9534f; // 主題紅色
}

// 數量控制器樣式
.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 10px;
  
  button {
    background-color: #eee;
    border: 1px solid #ddd;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.2s;
    
    &:hover:not(:disabled) {
      background-color: #ddd;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  
  input[type="number"] {
    width: 50px;
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
    margin: 0 5px;
    -moz-appearance: textfield; // 隱藏 Firefox 上的箭頭
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none; // 隱藏 Chrome/Safari 上的箭頭
      margin: 0;
    }
  }
}

// 移除按鈕
.remove-btn {
  background-color: transparent;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
}

// =======================================================
// 2. 訂單總結
// =======================================================
.order-summary {
  flex: 1; // 佔 30% 寬度
  width: 120%;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky; // 讓總結區塊在滾動時固定
  top: 20px; // 距離頂部導航欄的距離
  
}

.summary-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 20px;
  
  .value {
    font-weight: 500;
    color: #333;
  }
}

.summary-separator {
  border-top: 1px dashed #ddd;
  margin: 20px 0;
}

.total-line {
  font-size: 20px;
  font-weight: bold;
  color: #000;
  
  .total-value {
    color: #d9534f; // 主色強調總金額
  }
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #655345; // 主題紅色
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: darken(#d9534f, 8%);
  }
}
</style>