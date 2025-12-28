<template>
  <div class="orders-page">
    <h1 class="page-heading">我的訂單</h1>

    <!-- 如果沒有訂單 -->
    <div v-if="orders.length === 0" class="empty-orders">
      <p>您目前還沒有訂單</p>
      <router-link to="/" class="go-shopping-btn">開始購物</router-link>
    </div>

    <!-- 訂單列表 -->
    <div v-else class="orders-container">
      <div v-for="order in orders" :key="order.id" class="order-card">
        
        <!-- 訂單標題 -->
        <div class="order-header">
          <div class="order-info">
            <span class="order-number">訂單編號: {{ order.orderNumber }}</span>
            <span class="order-date">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="order-header-right">
            <span class="order-total-label">訂單金額:</span>
            <span class="order-total-amount">NT$ {{ order.payment.total.toLocaleString() }}</span>
            <span class="order-status" :class="`status-${order.status}`">
              {{ getStatusText(order.status) }}
            </span>
          </div>
        </div>

        <!-- 訂單內容區 -->
        <div class="order-content">
          
          <!-- 左側:商品列表 -->
          <div class="order-items-section">
            <h3 class="section-title">訂購商品</h3>
            <div class="order-items">
              <div v-for="item in order.items" :key="`${item.id}-${item.size}`" class="order-item">
                <img :src="item.image" :alt="item.name" class="item-image">
                <div class="item-details">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-specs">尺寸: {{ item.size }} | 數量: {{ item.quantity }}</div>
                </div>
                <div class="item-price">NT$ {{ (item.price * item.quantity).toLocaleString() }}</div>
              </div>
            </div>
          </div>

          <!-- 右側:訂單資訊 -->
          <div class="order-info-section">
            <h3 class="section-title">訂單資訊</h3>
            <div class="order-summary">
              <div class="summary-row">
                <span>收件人:</span>
                <span>{{ order.customer.name }}</span>
              </div>
              <div class="summary-row">
                <span>聯絡電話:</span>
                <span>{{ order.customer.phone }}</span>
              </div>
              <div class="summary-row">
                <span>收件地址:</span>
                <span>{{ order.customer.address }}</span>
              </div>
              <div v-if="order.customer.note" class="summary-row">
                <span>備註:</span>
                <span>{{ order.customer.note }}</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row">
                <span>付款方式:</span>
                <span>{{ getPaymentText(order.payment.method) }}</span>
              </div>
              <div class="summary-row">
                <span>配送方式:</span>
                <span>{{ getShippingText(order.shipping.method) }} (NT$ {{ order.shipping.fee }})</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getOrders, getOrderStatusText, getPaymentMethodText, getShippingMethodText } from '@/utils/order';
import { isLoggedIn } from '@/utils/auth';

export default {
  name: 'Orders',
  data() {
    return {
      orders: []
    };
  },
  methods: {
    loadOrders() {
      if (!isLoggedIn()) {
        alert('請先登入才能查看訂單');
        this.$router.push('/login');
        return;
      }
      
      this.orders = getOrders();
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    },
    getStatusText(status) {
      return getOrderStatusText(status);
    },
    getPaymentText(method) {
      return getPaymentMethodText(method);
    },
    getShippingText(method) {
      return getShippingMethodText(method);
    }
  },
  mounted() {
    this.loadOrders();
  }
}
</script>

<style scoped lang="scss">
$content-width: 1600px; // ✅ 增加寬度
$accent-color: #b70000;

.orders-page {
  max-width: $content-width; // ✅ 使用更寬的容器
  margin: 0 auto;
  padding: 20px 0px;
  min-height: calc(100vh - 100px); 
  background-color: #f6f6f6; // 保持與您 App.vue 相同的淺灰色背景
  padding-top: -20px;
}

.page-heading {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

// 空訂單狀態
.empty-orders {
  text-align: center;
  padding: 100px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  p {
    font-size: 20px;
    color: #666;
    margin-bottom: 30px;
  }
}

.go-shopping-btn {
  display: inline-block;
  padding: 14px 35px;
  background-color: #655345;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: darken(#655345, 8%);
  }
}

// 訂單列表
.orders-container {
  display: flex;
  flex-direction: column;
  gap: 30px; // ✅ 增加訂單之間的間距
}

.order-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 35px; // ✅ 增加內距
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%; // ✅ 移除寬度限制
}

// 訂單標題
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px; // ✅ 增加底部間距
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 30px; // ✅ 增加與內容的間距
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 8px; // ✅ 增加間距
}

.order-number {
  font-size: 22px; // ✅ 放大字體
  font-weight: bold;
  color: #333;
}

.order-date {
  font-size: 17px; // ✅ 放大字體
  color: #888;
}

// ✅ 新增:訂單標題右側區域
.order-header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.order-total-label {
  font-size: 18px;
  font-weight: 500;
  color: #666;
}

.order-total-amount {
  font-size: 26px; // ✅ 突出顯示總金額
  font-weight: bold;
  color: $accent-color;
}

.order-status {
  padding: 10px 25px; // ✅ 增加內距
  border-radius: 20px;
  font-size: 17px; // ✅ 放大字體
  font-weight: bold;
  white-space: nowrap;
  
  &.status-pending {
    background-color: #fff3cd;
    color: #856404;
  }
  
  &.status-processing {
    background-color: #d1ecf1;
    color: #0c5460;
  }
  
  &.status-completed {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.status-cancelled {
    background-color: #f8d7da;
    color: #721c24;
  }
}

// ✅ 新增:訂單內容區(左右分欄)
.order-content {
  display: flex;
  gap: 40px; // ✅ 左右欄位間距
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
}

// ✅ 左側:商品列表區
.order-items-section {
  flex: 5; // ✅ 佔 2/3 寬度
  min-width: 0; // ✅ 防止 flex 項目溢出
}

// ✅ 右側:訂單資訊區
.order-info-section {
  flex: 4; // ✅ 佔 1/3 寬度
  min-width: 350px; // ✅ 最小寬度
}

.section-title {
  font-size: 20px; // ✅ 放大字體
  font-weight: bold;
  color: #655345;
  margin-bottom: 20px; // ✅ 增加間距
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}

// 訂單商品
.order-items {
  display: flex;
  flex-direction: column;
  gap: 15px; // ✅ 增加商品之間間距
}

.order-item {
  display: flex;
  gap: 20px;
  padding: 20px; // ✅ 增加內距
  background-color: #fafafa;
  border-radius: 6px;
  align-items: center;
}

.item-image {
  width: 100px; // ✅ 增加圖片大小
  height: 100px; // ✅ 增加圖片大小
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0; // ✅ 防止圖片被壓縮
}

.item-details {
  flex-grow: 1;
  min-width: 0; // ✅ 允許文字換行
}

.item-name {
  font-size: 19px; // ✅ 放大字體
  font-weight: 600;
  color: #333;
  margin-bottom: 8px; // ✅ 增加間距
}

.item-specs {
  font-size: 16px; // ✅ 放大字體
  color: #666;
}

.item-price {
  font-size: 20px; // ✅ 放大字體
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  margin-left: 20px; // ✅ 增加左邊距
}

// 訂單摘要
.order-summary {
  background-color: #f9f9f9;
  padding: 25px; // ✅ 增加內距
  border-radius: 6px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0; // ✅ 增加上下間距
  font-size: 17px; // ✅ 放大字體
  color: #555;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e8e8e8;
  }
  
  // ✅ 讓長文字可以換行
  span:last-child {
    text-align: right;
    word-break: break-word;
    max-width: 60%;
  }
}

.summary-divider {
  border-top: 2px solid #ddd;
  margin: 20px 0; // ✅ 增加上下間距
}
</style>