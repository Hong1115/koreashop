<template>
  <div class="checkout-page">
    <h1 class="page-heading">結帳付款</h1>

    <div class="checkout-container">
      
      <!-- 左側: 訂單資訊表單 -->
      <div class="checkout-form">
        
        <!-- 收件人資訊 -->
        <section class="form-section">
          <h2 class="section-title">收件人資訊</h2>
          
          <div class="form-group">
            <label for="name" class="form-label">姓名 <span class="required">*</span></label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              class="form-input"
              placeholder="請輸入收件人姓名"
              :class="{ 'error': errors.name }"
            >
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="phone" class="form-label">電話 <span class="required">*</span></label>
            <input 
              type="tel" 
              id="phone" 
              v-model="formData.phone" 
              class="form-input"
              placeholder="請輸入聯絡電話"
              :class="{ 'error': errors.phone }"
            >
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">電子郵件 <span class="required">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              class="form-input"
              placeholder="example@email.com"
              :class="{ 'error': errors.email }"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>
        </section>

        <!-- 配送地址 -->
        <section class="form-section">
          <h2 class="section-title">配送地址</h2>

          <div class="form-group">
            <label for="city" class="form-label">縣市 <span class="required">*</span></label>
            <select 
              id="city" 
              v-model="formData.city" 
              class="form-select"
              :class="{ 'error': errors.city }"
            >
              <option value="">請選擇縣市</option>
              <option value="台北市">台北市</option>
              <option value="新北市">新北市</option>
              <option value="桃園市">桃園市</option>
              <option value="新竹市">新竹市</option>
              <option value="台中市">台中市</option>
              <option value="台南市">台南市</option>
              <option value="高雄市">高雄市</option>
              <option value="基隆市">基隆市</option>
              <option value="苗栗縣">苗栗縣</option>
              <option value="彰化縣">彰化縣</option>
              <option value="雲林縣">雲林縣</option>
              <option value="嘉義縣">嘉義縣</option>
              <option value="屏東縣">屏東縣</option>
              <option value="宜蘭縣">宜蘭縣</option>
              <option value="花蓮縣">花蓮縣</option>
              <option value="台東縣">台東縣</option>
            </select>
            <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
          </div>

          <div class="form-group">
            <label for="district" class="form-label">區域 <span class="required">*</span></label>
            <input 
              type="text" 
              id="district" 
              v-model="formData.district" 
              class="form-input"
              placeholder="例如:中正區"
              :class="{ 'error': errors.district }"
            >
            <span v-if="errors.district" class="error-message">{{ errors.district }}</span>
          </div>

          <div class="form-group">
            <label for="address" class="form-label">詳細地址 <span class="required">*</span></label>
            <input 
              type="text" 
              id="address" 
              v-model="formData.address" 
              class="form-input"
              placeholder="請輸入街道地址"
              :class="{ 'error': errors.address }"
            >
            <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
          </div>

          <div class="form-group">
            <label for="note" class="form-label">備註 (選填)</label>
            <textarea 
              id="note" 
              v-model="formData.note" 
              class="form-textarea"
              placeholder="有任何需要備註的事項請填寫於此"
              rows="3"
            ></textarea>
          </div>
        </section>

        <!-- 付款方式 -->
        <section class="form-section">
          <h2 class="section-title">付款方式</h2>
          <div class="payment-options">
            <label class="payment-option">
              <input 
                type="radio" 
                name="payment" 
                value="cod" 
                v-model="formData.paymentMethod"
              >
              <span class="payment-label">貨到付款</span>
            </label>
          </div>
          <span v-if="errors.paymentMethod" class="error-message">{{ errors.paymentMethod }}</span>
        </section>

        <!-- 配送方式 -->
        <section class="form-section">
          <h2 class="section-title">配送方式</h2>
          
          <div class="shipping-options">
            <label class="shipping-option">
              <input 
                type="radio" 
                name="shipping" 
                value="home_delivery" 
                v-model="formData.shippingMethod"
              >
              <span class="shipping-label">
                <span class="shipping-name">宅配到府</span>
                <span class="shipping-fee">NT$ 60</span>
              </span>
            </label>
          </div>
          <span v-if="errors.shippingMethod" class="error-message">{{ errors.shippingMethod }}</span>
        </section>

      </div>

      <!-- 右側: 訂單摘要 -->
      <div class="order-summary">
        <h2 class="summary-title">訂單摘要</h2>

        <!-- 商品列表 -->
        <div class="summary-items">
          <div v-for="item in cartItems" :key="`${item.id}-${item.size}`" class="summary-item">
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-specs">尺寸: {{ item.size }} | 數量: {{ item.quantity }}</div>
            </div>
            <div class="item-price">NT$ {{ (item.price * item.quantity).toLocaleString() }}</div>
          </div>
        </div>

        <!-- 價格明細 -->
        <div class="summary-divider"></div>
        
        <div class="summary-line">
          <span>商品小計</span>
          <span class="value">NT$ {{ totalItemsPrice.toLocaleString() }}</span>
        </div>

        <div class="summary-line">
          <span>運費</span>
          <span class="value">NT$ {{ shippingFee.toLocaleString() }}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-line total-line">
          <span>應付總金額</span>
          <span class="total-value">NT$ {{ grandTotal.toLocaleString() }}</span>
        </div>

        <!-- 送出訂單按鈕 -->
        <button @click="handleSubmitOrder" class="submit-order-btn">
          確認送出訂單
        </button>

      </div>

    </div>
  </div>
</template>

<script>
import { getCart, clearCart } from '@/utils/cart'; // ✅ 確保有引入 clearCart
import { isLoggedIn, getCurrentUser } from '@/utils/auth'; 
import { createOrder } from '@/utils/order'; 

export default {
  name: 'Checkout',
  data() {
    return {
      cartItems: [],
      shippingFee: 60,
      formData: {
        name: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        address: '',
        note: '',
        paymentMethod: 'credit_card',
        shippingMethod: 'home_delivery'
      },
      errors: {}
    };
  },
  computed: {
    totalItemsPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    grandTotal() {
      return this.totalItemsPrice + this.shippingFee;
    }
  },
  methods: {
    loadCart() {
      // ✅ 檢查是否登入
      if (!isLoggedIn()) {
        alert('請先登入才能結帳');
        this.$router.push('/login');
        return;
      }
      
      this.cartItems = getCart();
      if (this.cartItems.length === 0) {
        this.$router.push('/cart');
      }
    },
    validateForm() {
      this.errors = {};
      
      if (!this.formData.name.trim()) {
        this.errors.name = '請輸入收件人姓名';
      }
      
      if (!this.formData.phone.trim()) {
        this.errors.phone = '請輸入聯絡電話';
      } else if (!/^09\d{8}$/.test(this.formData.phone.replace(/\s|-/g, ''))) {
        this.errors.phone = '請輸入正確的手機號碼格式';
      }
      
      if (!this.formData.email.trim()) {
        this.errors.email = '請輸入電子郵件';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        this.errors.email = '請輸入正確的電子郵件格式';
      }
      
      if (!this.formData.city) {
        this.errors.city = '請選擇縣市';
      }
      
      if (!this.formData.district.trim()) {
        this.errors.district = '請輸入區域';
      }
      
      if (!this.formData.address.trim()) {
        this.errors.address = '請輸入詳細地址';
      }
      
      if (!this.formData.paymentMethod) {
        this.errors.paymentMethod = '請選擇付款方式';
      }
      
      if (!this.formData.shippingMethod) {
        this.errors.shippingMethod = '請選擇配送方式';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    handleSubmitOrder() {
      if (!this.validateForm()) {
        alert('請填寫所有必填欄位');
        return;
      }

      // 準備訂單資料
      const orderData = {
        customer: {
          name: this.formData.name,
          phone: this.formData.phone,
          email: this.formData.email,
          address: `${this.formData.city}${this.formData.district}${this.formData.address}`,
          note: this.formData.note
        },
        items: this.cartItems,
        payment: {
          method: this.formData.paymentMethod,
          total: this.grandTotal
        },
        shipping: {
          method: this.formData.shippingMethod,
          fee: this.shippingFee
        }
      };

      // 創建訂單
      const newOrder = createOrder(orderData);
      
      console.log('訂單已創建:', newOrder);
      
      // 顯示成功訊息
      alert(`訂單送出成功!\n訂單編號: ${newOrder.orderNumber}\n訂單金額: NT$ ${this.grandTotal.toLocaleString()}\n\n我們會盡快為您處理訂單。`);
      
      // 清空購物車
      clearCart();
      
      // 導向訂單頁面
      this.$router.push('/orders');
    }
  },
  mounted() {
    this.loadCart();
  }
}
</script>

<style scoped lang="scss">
$content-width: 1600px;
$primary-color: #655345;
$accent-color: #b70000;

.checkout-page {
  max-width: $content-width;
  margin: 0 auto;
  padding: 20px 30px;
  min-height: calc(100vh - 100px);
  background-color: #f6f6f6;
}

.page-heading {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.checkout-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  justify-content: center; 
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
}

// ================================================
// 左側: 訂單資訊表單
// ================================================
.checkout-form {
  width: 700px; 
  flex-shrink: 0; // ✅ 防止被壓縮
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  top: 10px;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
}

.form-section {
  margin-bottom: 45px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  color: $primary-color;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #eee;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  font-size: 19px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

.required {
  color: $accent-color;
  font-size: 19px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 16px 18px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
  
  &.error {
    border-color: $accent-color;
  }
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
}

.error-message {
  display: block;
  color: $accent-color;
  font-size: 16px;
  margin-top: 6px;
  font-weight: 500;
}

// 付款方式
.payment-options,
.shipping-options {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.payment-option,
.shipping-option {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: $primary-color;
    background-color: #f9f9f9;
  }
  
  input[type="radio"] {
    margin-right: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
  }
  
  input[type="radio"]:checked + .payment-label,
  input[type="radio"]:checked + .shipping-label {
    font-weight: bold;
    color: $primary-color;
  }
}

.payment-label {
  font-size: 19px;
  color: #333;
}

.shipping-label {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 19px;
  color: #333;
}

.shipping-name {
  font-weight: 500;
}

.shipping-fee {
  color: #666;
  font-weight: 600;
}

// ================================================
// 右側: 訂單摘要
// ================================================
.order-summary {
  width: 450px; 
  flex-shrink: 0; // ✅ 防止被壓縮
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0px;
  
  @media (max-width: 1024px) {
    width: 100%;
    position: static;
  }
}

.summary-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.summary-items {
  margin-bottom: 25px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.item-info {
  flex-grow: 1;
  padding-right: 15px;
}

.item-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.item-specs {
  font-size: 16px;
  color: #888;
}

.item-price {
  font-size: 19px;
  font-weight: 700;
  color: #333;
  white-space: nowrap;
}

.summary-divider {
  border-top: 1px solid #d0d0d0;
  margin: 25px 0;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  font-size: 19px;
  color: #555;
  
  .value {
    font-weight: 600;
    color: #333;
  }
}

.total-line {
  font-size: 26px;
  font-weight: bold;
  color: #000;
  margin-top: 12px;
  padding-top: 5px;
  
  .total-value {
    color: $accent-color;
    font-size: 28px;
  }
}

.submit-order-btn {
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  background-color: $primary-color;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  
  &:hover {
    background-color: darken($primary-color, 8%);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

</style>